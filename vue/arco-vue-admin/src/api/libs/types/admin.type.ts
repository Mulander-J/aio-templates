/**
 * 用户登录
 */
export interface UserLoginType {
  email: string
  password: string
}
/**
 * 重置密码
 */
export interface UserResetType {
  oldPassword: string
  newPassword: string
  repeatPassword?: string
}
/**
 * 管理员用户
 */
export interface AdminUserType extends ORMBase {
  email?: string
  nickname: string
  password?: string
  password2?: string
  enabled?: boolean
  roles?: RoleType[]
  roleIds?: number[]
}
/**
 * 管理员角色
 */
export interface RoleType extends ORMBase {
  key: string
  displayName: string
  enable?: boolean
  permissionIds?: number[]
}
/**
 * 管理权限
 */
export interface PermissionType {
  id: number
  parentId: number
  key: string
  displayName: string
  children: PermissionType[]
}
