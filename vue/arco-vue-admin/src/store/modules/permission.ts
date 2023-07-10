import { defineStore } from 'pinia'
import store from '../index'
import { PermissionApi } from '@/api/admin'
import { useAppStore } from '@/store'
import { eachTree } from '@/utils/tree'

interface PermissionState {
  permissions: string[]
  isFetched: boolean
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    permissions: [],
    isFetched: false
  }),
  // getters: {
  //   getPermList(state: PermissionState): string[] {
  //     return state.permissions
  //   }
  // },
  actions: {
    setPerrmission(list: string[]) {
      this.permissions = list
      this.isFetched = true
    },
    async buildRoutes() {
      if (this.isFetched) return
      const appStore = useAppStore()
      let permissionKeys: string[] = []
      if (appStore.serverMenu) {
        const data: any = await PermissionApi.atCurrent()
        eachTree(data || [], (ele: any) => {
          ele?.key && permissionKeys.push(ele.key)
        })
      } else {
        permissionKeys = []
      }
      this.setPerrmission(permissionKeys)
    },
    clearMenuList() {
      this.permissions = []
      this.isFetched = false
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}
