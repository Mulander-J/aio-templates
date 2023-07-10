import axios from 'axios'
import { Message } from '@arco-design/web-vue'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios'
import qs from 'qs'
import { userToken } from '@/utils/storage'
import { LOGIN_PATH } from '@/router/constants'
import { ErrCodeReplace } from '@/constant/errorHandler'

const BASE_PREFIX = import.meta.env.VITE_API_BASE_URL
// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json'
  }
})

export interface RequestConfig extends AxiosRequestConfig {
  // 是否返回原始数据
  isReturnOriginData?: boolean
}

export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  msg: string
  data: T
}

const showErrorMessage = (code: number | string): string => {
  switch (code) {
    case 400:
      return '[400]:请求参数错误'
    case 401:
      return '[401]:未授权，请登录'
    case 403:
      return '[403]:拒绝访问'
    case 404:
      return '[404]:请求地址出错'
    case 408:
      return '[408]:请求超时'
    case 500:
      return '[500]:服务器内部错误'
    case 501:
      return '[501]:服务未实现'
    case 502:
      return '[502]:网关错误'
    case 503:
      return '[503]:服务不可用'
    case 504:
      return '[504]:网关超时'
    default:
      return `[${code}]:连接出错`
  }
}

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: any) => {
    if (
      config.method === 'post' &&
      (config.headers as AxiosRequestHeaders)['Content-Type'] ===
        'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    // get参数编码
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (
          // eslint-disable-next-line no-void
          config.params[key] !== void 0 &&
          config.params[key] !== null &&
          config.params[key] !== ''
        ) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.slice(0, Math.max(0, url.length - 1))
      config.params = {}
      config.url = url
    }
    //  token
    const _token = userToken.value
    if (_token) {
      if (!config.headers) config.headers = { token: '' }
      config.headers.token = _token
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response
})

const service = {
  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<any, AxiosResponse<Result>>(config)
        .then((res: AxiosResponse<Result>) => {
          const resData = res?.data || { code: -1, msg: 'Error', data: null }
          const { code, msg } = resData
          if (code === 40301) {
            // 登录失效
            Message.error(msg)
            userToken.value = ''
            window.location.replace(LOGIN_PATH)
            reject(new Error(msg))
          } else if (config.isReturnOriginData) {
            resolve(resData as any)
          } else if (code === 0) {
            resolve(resData?.data as T)
          } else {
            const err = ErrCodeReplace(resData)
            if (!err || err?._global) {
              Message.error(err?.msg || 'Error')
              resolve(null as any)
            } else {
              resolve(err as any)
            }
          }
        })
        .catch((err: AxiosError) => {
          const response = err?.response
          if (response) {
            const msg = showErrorMessage(response.status)
            Message.error(msg)
            // return Promise.reject(response.data)
            return reject(new Error(msg))
          }
          Message.warning('Network Error')
          reject(err)
        })
    })
  },
  get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<T> {
    return service.request<T>({ ...config, url, method: 'GET', params })
  },
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.request<T>({ ...config, url, method: 'POST', data })
  },
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.request<T>({ ...config, url, method: 'PUT', data })
  },
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.request<T>({ ...config, url, method: 'PATCH', data })
  },
  delete<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.request<T>({ ...config, url, method: 'DELETE', data })
  },
  upload<T = any>(url: string, data?: FormData | File, config?: RequestConfig): Promise<T> {
    return service.request<T>({
      ...config,
      url,
      method: 'POST',
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  download<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return service.request<T>({
      ...config,
      url,
      method: 'POST',
      data,
      responseType: 'blob'
    })
  }
}

export { axiosInstance }
export default service
