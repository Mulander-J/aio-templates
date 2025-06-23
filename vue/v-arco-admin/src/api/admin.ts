import { AuthGate, CRUD } from './libs'
import type { AdminUserType, PermissionType, RoleType } from './libs/types'
import request from '@/plugins/request'

/* Login API */
export const AuthApi = new AuthGate()
/* Admin User API */
export const AdminApi = new CRUD<AdminUserType>({ url: '/adminUser' })
/* Role API */
export const RoleApi = new CRUD<RoleType>({ url: '/roles' })
/* Permission API */
class PermissionGate extends CRUD<PermissionType> {
  atCurrent() {
    return request.get<any[]>('/auth/currentUser/permissions')
  }

  atRole(roleId: number) {
    return request.get(`/roles/${roleId}/permissions`)
  }
}
export const PermissionApi = new PermissionGate({ url: '/permissions' })
