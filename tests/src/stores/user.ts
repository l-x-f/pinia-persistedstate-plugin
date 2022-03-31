import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    data: 100
  }),
  actions: {
    increment() {
      this.data++
    }
  }
})
