import { defineStore } from 'pinia'
import { usePermissionStore } from '../modules/permission'
import { useTabsStore } from '../modules/tabs'
import store from '../index'
import type { UserLoginType } from '@/api/libs/types'
import { AuthApi } from '@/api/admin'
import router from '@/router'
import { LOGIN_PATH } from '@/router/constants'
import { removeRouteListener } from '@/utils/route-listener'
import { userToken } from '@/utils/storage'
import { BS64Code } from '@/utils/base64'

interface UserState {
  id?: string | number
  nickname?: string
  email?: string
  createdAt?: string
  avatar?: string
  token?: string
  roles?: any[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    id: '',
    nickname: '',
    email: '',
    createdAt: '',
    avatar: '',
    token: '',
    roles: []
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
    isLogin(): boolean {
      return !!userToken.value
    },
    getAvatarUrl(state: UserState): string {
      if (state?.email) {
        try {
          const _base64Str = BS64Code.encode(state?.email).slice(0, -1)
          // return `https://api.multiavatar.com/${_base64Str}.png`
          return `https://api.dicebear.com/6.x/lorelei/svg?seed=${_base64Str}`
        } catch {
          return ''
        }
      }
      return ''
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token || ''
      userToken.value = token
    },
    setUserInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    resetInfo() {
      this.setToken('')
      this.$reset()
    },
    // user info
    async info() {
      const userInfo = await AuthApi.atCurrent()
      this.setUserInfo(userInfo)
    },
    // login
    async login(params: UserLoginType) {
      const data = await AuthApi.login(params)
      if (data?.code !== 0) throw new Error(data.msg || 'Login Failed')
      const token = data?.data?.token
      // save token
      this.setToken(token || '')
      if (!this.token) return null
      const userInfo = await AuthApi.atCurrent()
      this.setUserInfo(userInfo)
      // router
      const permissionStore = usePermissionStore()
      await permissionStore.buildRoutes()
      return userInfo
    },
    // logout
    async logout() {
      if (this.token) await AuthApi.logout()
      this.resetInfo()
      const tabsStore = useTabsStore()
      tabsStore.resetTabList()
      const permissionStore = usePermissionStore()
      permissionStore.clearMenuList()
      removeRouteListener()
      router.push(LOGIN_PATH)
    }
  }
})

export const useUserStoreWithOut = () => {
  return useUserStore(store)
}
