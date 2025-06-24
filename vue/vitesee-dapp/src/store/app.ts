import { defineStore } from 'pinia'
import { store } from '~/modules/pinia'

interface AppState {
  refreshIndex: number // trigger route refresh
  resizeIndex: number //  trigger window resize
  isMobile: boolean //  is mobile device ratio
}

const isH5Width = () => window.innerWidth <= 768

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    refreshIndex: 0,
    resizeIndex: 0,
    isMobile: isH5Width()
  }),
  getters: {},
  actions: {
    setIsMobile() {
      this.isMobile = isH5Width()
      this.resizeIndex++
    },
    triggerRefresh() {
      this.refreshIndex++
    }
  },
})

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
