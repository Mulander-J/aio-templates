export const ROOT_PATH = '/'

export const LOGIN_PATH = '/login'

export const LOGIN_NAME = 'Login'

export const NOT_FOUND_NAME = 'NotFound'

export const WHITE_LIST = [
  { name: NOT_FOUND_NAME, children: [] },
  { name: LOGIN_NAME, children: [] }
]

export const REDIRECT_ROUTE_NAME = 'Redirect'

export const DEFAULT_ROUTE_NAME = 'AboutPage'

export const BASE_HOME_PATH = '/about/index'

export const DEFAULT_ROUTE = {
  title: 'About',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/about/index',
  path: '/about/index'
}

export const CACHE_EXCLUDE = []

export const LAYOUT = () => import('@/layout/index.vue')
