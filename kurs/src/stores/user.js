import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
