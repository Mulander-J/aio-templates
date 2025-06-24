import type { RouteRecordRaw } from 'vue-router'
import useAuth from '~/hooks/useAuth'

const App_BaseUrl = '/app'

/* App routes */
export const AppRoutes: RouteRecordRaw[] = [
  {
    path: 'components',
    name: 'AppComponents',
    meta: { title: 'Components', icon: 'nav-app-a2' },
    component: () => import('../pages/appPage/Components.vue'),
  },
  {
    path: 'wagmi',
    name: 'UseWagmi',
    meta: { title: 'UseWagmi', icon: 'nav-app-a1' },
    children: [
      {
        path: '',
        name: 'Launch',
        meta: { title: 'Launch', isHide: true },
        component: () => import('../pages/appPage/Launch.vue'),
        beforeEnter: (to: any) => {
          const { userInfo } = useAuth()
          if (userInfo.value)
            return `${App_BaseUrl}/wagmi/actions`
        },
      },
      {
        path: 'actions',
        name: 'WagmiAction',
        meta: { title: 'Action' },
        component: () => import('../pages/appPage/Wagmi.vue'),
        beforeEnter: (to: any) => {
          const { userInfo } = useAuth()
          if (!userInfo.value)
            return `${App_BaseUrl}/wagmi/?redirect=${to?.path}`
        },
      }
    ]
  },
]

/* Home routes */

const HomeRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'HomeIndex',
    component: () => import('../pages/homePage/index.vue'),
  },
  {
    path: 'menua',
    name: 'HomeMenuA',
    component: () => import('../pages/homePage/MenuA.vue'),
  },
]

export default [
  {
    path: '/',
    name: 'PageHome',
    component: () => import('../layouts/default/index.vue'),
    children: HomeRoutes,
  },
  {
    path: App_BaseUrl,
    name: 'PageApp',
    component: () => import('../layouts/app/index.vue'),
    redirect: `${App_BaseUrl}/components`,
    children: AppRoutes,
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    // redirect: '/',
    component: () => import('../layouts/404.vue'),
  },
]
