import {
  PiniaPlugin,
  PiniaPluginContext,
  SubscriptionCallbackMutation,
  StateTree
} from 'pinia'

import jsCookies from 'js-cookie'

/**
 * Storage类型
 */
export interface Storage {
  getItem: (key: string) => any
  setItem: (key: string, value: any) => void
  removeItem: (key: string) => void
}

type Cookies = typeof jsCookies
/**
 * 配置类型
 */
export interface Options {
  /**
   * 存储类型，默认为 `window.localStorage`
   */
  storage?: Storage | Cookies
  /**
   * 存储的key值，默认为 `pinia`
   */
  key?: string
  /**
   * 是否开启日志，默认为 `false`
   */
  logger?: boolean
}

/**
 * 打印日志
 * @param mutationId
 * @param mutation
 * @param state
 */
function logGroup(
  mutationId: string,
  mutation: SubscriptionCallbackMutation<any>,
  state: StateTree
) {
  const group = console.groupCollapsed || console.group
  try {
    group(mutationId, new Date().toLocaleString())
    console.log('mutation', mutation)
    console.log('state', state)
    console.groupEnd()
  } catch (e) {
    console.log('—— log end ——')
  }
}

/**
 * @params  option
 * @default options = { storage: window.localStorage, key: 'pinia', logger: false }
 */
export function createPersistedState(options?: Options): PiniaPlugin {
  const storage = options?.storage || (window && window.localStorage)
  const key = options?.key || 'pinia'
  const logger = options?.logger || false

  // 获取state的值
  const getState = (key: string, storage: Options['storage']) => {
    const value = (storage as Storage).getItem
      ? (storage as Storage).getItem(key)
      : (storage as Cookies).get(key)
    try {
      return typeof value === 'string'
        ? JSON.parse(value)
        : typeof value === 'object'
        ? value
        : undefined
    } catch (err) {}

    return undefined
  }

  // 设置state的值
  const setState = (
    key: string,
    state: StateTree,
    storage: Options['storage']
  ) => {
    return (storage as Storage).setItem
      ? (storage as Storage).setItem(key, JSON.stringify(state))
      : (storage as Cookies).set(key, JSON.stringify(state))
  }

  return (Context: PiniaPluginContext) => {
    const store: PiniaPluginContext['store'] = Context.store

    // 初始化时获取数据，如果有的话，把原来的pinia的state替换掉
    const tempKey = `${key}-${store.$id}`
    const data = getState(tempKey, storage)
    data && store.$patch(data)

    // $subscribe()一个 store的方法来观察 state 和它的变化，类似于 Vuex 的subscribe 方法
    store.$subscribe(
      (mutation: SubscriptionCallbackMutation<any>, state: StateTree) => {
        // 记录日志
        logger && logGroup(mutation.storeId, mutation, state)
        const tempKey = `${key}-${mutation.storeId}`
        setState(tempKey, state, storage)
      }
    )
  }
}
