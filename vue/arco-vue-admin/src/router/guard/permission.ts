import type { LocationQueryRaw, Router } from 'vue-router'
import {
  BASE_HOME_PATH,
  LOGIN_PATH,
  NOT_FOUND_NAME,
  ROOT_PATH,
  WHITE_LIST
} from '@/router/constants'
import { useAppStore } from '@/store'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { useUserStoreWithOut } from '@/store/modules/user'

export function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore()
    const userStore = useUserStoreWithOut()
    const permissionStore = usePermissionStoreWithOut()

    //  login-token
    if (userStore.isLogin) {
      !userStore.id && (await userStore.info())
      permissionStore.permissions.length === 0 && (await permissionStore.buildRoutes())

      if (to.path === ROOT_PATH || to.path === BASE_HOME_PATH) {
        next()
        return
      }
    }
    // white
    if (WHITE_LIST.some((el) => el.name === to.name)) {
      if (to.path === LOGIN_PATH && userStore.isLogin) {
        next({
          path: BASE_HOME_PATH,
          replace: true
        })
        return
      }
      next()
      return
    }
    // Un Login
    if (!userStore.isLogin) {
      if (to.meta?.ignoreAuth) {
        next()
        return
      }
      next({
        path: LOGIN_PATH,
        replace: true,
        query: {
          ...(to.query as LocationQueryRaw)
        }
      })
      return
    }
    // permission
    const userPermission = useUserPermission()
    const permissionsAllow = userPermission.accessRouter(to)

    if (appStore.serverMenu) {
      if (permissionsAllow) {
        next()
      } else {
        next({ name: NOT_FOUND_NAME })
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (permissionsAllow) {
        next()
      } else {
        next(BASE_HOME_PATH)
      }
    }
  })
}
