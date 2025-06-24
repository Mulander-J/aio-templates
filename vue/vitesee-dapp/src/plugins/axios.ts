import Axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import Notify from '~/components/notify'
import { TokenStorge } from '~/hooks/useAuth'
import { RESULT_CODE } from '~/config/errCode'

const service: AxiosInstance = Axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/',
    timeout: 1000 * 60 * 3,
    withCredentials: true
})

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
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
                if (config.params[key] !== void 0 && config.params[key] !== null) {
                    url += `${key}=${encodeURIComponent(config.params[key])}&`
                }
            }
            url = url.substring(0, url.length - 1)
            config.params = {}
            config.url = url
        }
        // jwt-token
        const _token = sessionStorage.getItem(TokenStorge)
        if (_token) {
            if (!config.headers) config.headers = { token: '' }
            config.headers.token = _token
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

interface AxiosResponseData {
    data: Record<string, any>
    code: number
    error_code: number
    msg: string
}
service.interceptors.response.use(
    (res) => {
        const { data } = res as AxiosResponse<AxiosResponseData | Blob>
        /* file blob */
        if (data instanceof Blob) {
            if (data.type === 'application/json') return null
            return data
        }
        /* success */
        if (RESULT_CODE === data?.code) {
            return data
        }
        /* Error */
        return null

        /* Or catch err-code */
        // switch (data?.code) {
        //     case ErrCode.TokenExpire:
        //         sessionStorage.removeItem(TokenStorge)
        //         window.location.reload()
        //         return null
        //     default:
        //         // console.error('Request-Err', [code, msg])
        //         return null
        // }
    },
    (error: AxiosError) => {
        // console.log('[!Axios-Err]' + error) // for debug
        if (error.code !== 'ERR_CANCELED') {   // abort fetch
            Notify.error({ title: 'Network', content: error.message || 'Network Err!' })
        }
        return Promise.reject(error)
    }
)

export { service }
