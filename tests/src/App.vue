<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import { useUserStore } from './stores/user'

const counterStore = useCounterStore()
const userStore = useUserStore()

const add = () => {
  counterStore.counter++
}
const add1 = () => {
  counterStore.$patch({
    counter: counterStore.counter + 1
  })
}
const add2 = () => {
  counterStore.increment()
}

const addUser = () => {
  userStore.data++
}
const addUser1 = () => {
  userStore.$patch({
    data: userStore.data + 1
  })
}
const addUser2 = () => {
  userStore.increment()
}
</script>

<template>
  <div>
    {{ counterStore.counter }}
    <button @click="add">add</button>
    <button @click="add1">add1</button>
    <button @click="add2">add2</button>
  </div>

  <div style="margin: 100px">
    {{ userStore.data }}

    <button @click="addUser">add</button>
    <button @click="addUser1">addUser1</button>
    <button @click="addUser2">addUser</button>
  </div>
</template>
