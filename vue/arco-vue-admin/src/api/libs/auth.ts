import type { UserLoginType, UserResetType } from './types'
import request from '@/plugins/request'

export class AuthGate {
  login(data?: UserLoginType) {
    return request.post<{ data?: { token?: string }; msg?: string; code?: number }>(
      '/auth/login',
      data,
      {
        isReturnOriginData: true
      }
    )
  }

  logout() {
    return request.post('/auth/logout')
  }

  resetPwd(data: UserResetType) {
    return request.post('/auth/resetPassword', data)
  }

  atCurrent() {
    return request.get('/auth/currentUser')
  }
}
