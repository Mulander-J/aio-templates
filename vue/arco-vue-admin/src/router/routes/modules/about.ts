import type { AppRouteRecordRaw } from '../types'
import { LAYOUT } from '@/router/constants'

const about: AppRouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    icon: 'icon-info-circle',
    title: 'About',
    // hideChildrenInMenu: true,
    order: 100000
  },
  children: [
    // {
    //   path: 'welcome',
    //   name: 'Welcome',
    //   component: () => import('@/views/about/Welcome.vue'),
    //   meta: { title: 'Welcome', hideInMenu: true }
    // },
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/about/index.md'),
      meta: {
        title: 'Welcome',
        icon: 'info-info-circle',
        hideInMenu: true
      }
    }
  ]
}
export default about
