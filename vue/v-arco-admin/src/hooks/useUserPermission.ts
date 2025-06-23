import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { usePermissionStore } from '@/store'

export function useUserPermission() {
  const permissionStore = usePermissionStore()
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        route.meta?.ignoreAuth ||
        !route.meta?.access ||
        route.meta?.access === '*' ||
        permissionStore.permissions.includes(route.meta?.access || '')
      )
    }
  }
}
