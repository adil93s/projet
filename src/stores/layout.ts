import { defineStore } from 'pinia'

export const useLayout = defineStore('layout', {
  state: () => ({
    isSidebarOpen: true
  }),
  actions: {
    setIsSidebarOpen(isOpen: boolean) {
      this.isSidebarOpen = isOpen
    }
  }
})
