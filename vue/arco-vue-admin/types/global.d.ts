declare interface Fn<T = any> {
  (...arg: T[]): T
}

declare type Nullable<T> = T | null

declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

interface ORMBase {
  id?: number
  createdAt?: string
  updatedAt?: string
}

interface PageType {
  pageSize: number
  pageNum: number
}
