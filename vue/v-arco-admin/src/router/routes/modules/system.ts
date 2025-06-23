import type { AppRouteRecordRaw } from '../types'
import { LAYOUT } from '@/router/constants'

const system: AppRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  meta: {
    title: 'Admin Center',
    icon: 'carbon:user-settings',
    order: 99
  },
  children: [
    {
      path: 'admin',
      name: 'AdminUser',
      component: () => import('@/views/system/adminUser/index.vue'),
      meta: {
        title: 'Admin User',
        order: 1,
        access: 'adminUserManagement'
      }
    },
    {
      path: 'role',
      name: 'RoleManagement',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: 'Role',
        order: 2,
        access: 'roleManagement'
      }
    },
    {
      path: 'menu',
      name: 'MenuManagement',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        title: 'Permission',
        order: 3,
        access: 'permissionRead'
      }
    },
    {
      path: 'user',
      name: 'UserCenter',
      component: () => import('@/views/system/UserCenter.vue'),
      meta: {
        title: 'User Center',
        order: 1,
        hideInMenu: true
      }
    }
  ]
}

export default system
