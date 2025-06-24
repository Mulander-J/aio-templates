import { AuthApi } from '~/api/auth'

interface UserType {
    id: string
    address?: string
}

/* UserInfo  */

const userRef = ref<Nullable<UserType>>(null)
const userInfo = computed(() => userRef.value)
const addr = computed(() => userRef.value?.address || '')

/* Token */

export const TokenStorge = 'dapp.token'
const setToken = (tk: string) => {
    sessionStorage.setItem(TokenStorge, tk)
}
const rmToken = () => {
    sessionStorage.removeItem(TokenStorge)
}
const getToken = () => {
    return sessionStorage.getItem(TokenStorge)
}

export default () => {
    const setUserInfo = (user: Nullable<UserType>) => {
        userRef.value = user
    }

    const fetchUser = async () => {
        try {
            const { data }: any = await AuthApi.atCurrent()
            setUserInfo(data)
        } catch {
            setUserInfo(null)
        }
    }

    const detectUser = async () => {
        const tk = getToken()
        if (!tk || userRef.value) return
        await fetchUser()
    }

    const resetUser = () => {
        rmToken()
        userRef.value = null
    }

    return {
        /* userInfo */
        addr,
        userInfo,
        setUserInfo,
        detectUser,
        fetchUser,
        resetUser,
        /* sessionToken */
        setToken,
        rmToken,
        getToken
    }
}
