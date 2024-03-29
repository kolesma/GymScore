import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({user: null, loaded: false}),
  actions: {
    setUser(user) {
      this.user = user
      this.loaded = true
    }
  }
})
