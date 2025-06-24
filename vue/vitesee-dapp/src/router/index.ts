import { createRouter, createWebHistory } from 'vue-router'
import useAuth from '~/hooks/useAuth'
import routes from './routes'
import { SIGN_AS_LOGIN } from '~/config'

const { detectUser } = useAuth()

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return new Promise((resolve, reject) => {
      resolve({ left: 0, top: 0 })
    })
  },
})

router.beforeEach(async (to, from, next) => {

  SIGN_AS_LOGIN && await detectUser()

  next()
})

export default router
