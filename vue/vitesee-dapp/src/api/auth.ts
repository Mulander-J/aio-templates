import { useAxios } from '~/hooks/useAxios'

const { request } = useAxios()

class AuthGate {
    /* Login */

    async logout() {
        return request({ url: '/auth/logout', method: 'post' })
    }
    async register(data: {
        address: string
        sign: string
        signId: string
        wallet?: string
    }) {
        return request<{ token: string }>({
            url: '/auth/register',
            method: 'post',
            data
        })
    }
    async login(data: {
        address: string
        sign: string
        signId: string
        wallet?: string
    }) {
        return request<{ token: string }>({
            url: '/auth/login',
            method: 'post',
            data
        })
    }

    /* Sign */

    async sign(data: { address: string, signType: 'login' | 'register' }) {
        return request<{
            signId: string,
            signText: string
        }>({
            url: `/signs/generate`,
            method: 'post',
            data
        })
    }

    /* User */

    async atCurrent() {
        return request<{ id: number, address: string, count: number }>({
            url: '/users/currentUser',
            method: 'get'
        })
    }
    async atWho(addr: string) {
        return request<any>({
            url: `/users?address=${addr}`,
            method: 'get'
        })
    }
}

export const AuthApi = new AuthGate()