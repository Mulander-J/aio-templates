<script lang="ts" setup>
import { getClient, connect, signMessage, disconnect, Connector } from '@wagmi/core'
import { promiseTimeout } from '@vueuse/core'
import { AuthApi } from '~/api/auth'
import { useAppStore } from '~/store/app'
import { SIGN_AS_LOGIN } from '~/config'
import useAuth from '~/hooks/useAuth'
import Notify from '~/components/notify'

// trigger emit is required
const emits = defineEmits(['trigger'])

const appStore = useAppStore()
const { resetUser, setToken, fetchUser, setUserInfo } = useAuth()

const initState = (): {
  isLoading: boolean
  pendingWallet: string
} => ({
  isLoading: false,
  pendingWallet: ''
})

const state = reactive({ ...initState() })

const getWallets = () => {
  try {
    const client = getClient()
    const connectors = client.connectors
    return connectors
  } catch {
    return []
  }
}
const wallets = getWallets()

const selectdWallet = computed(() => {
  return (wallets || []).find((e) => e.id === state.pendingWallet)
})

const connect2Login = async (c: any) => {
  const addr = c?.account || ''
  setUserInfo({
    address: addr,
    id: addr
  })
  appStore.triggerRefresh()
}

const sign2Login = async (c: any) => {
  const address = c?.account
  const wallet = c?.connector?.id || ''
  if (!address) throw Error('Unconnect')

  const isExist = await AuthApi.atWho(address)

  const {
    data: { signId, signText }
  } = await AuthApi.sign({ address, signType: !!isExist ? 'login' : 'register' })

  const sign = await signMessage({ message: signText })

  const {
    data: { token }
  } = await (!!isExist
    ? AuthApi.login({ address, sign, signId, wallet })
    : AuthApi.register({ address, sign, signId, wallet }))

  setToken(token)

  await fetchUser()

  appStore.triggerRefresh()
}

const executeConnect = async (c: Connector) => {
  if (state.isLoading) return
  state.isLoading = true

  try {
    if (!c) return
    if (!c.ready) return

    state.pendingWallet = c.id

    await disconnect()

    const result: any = await connect({ connector: c })

    await promiseTimeout(1000)

    if (SIGN_AS_LOGIN) {
      await sign2Login(result)
    } else {
      await connect2Login(result)
    }

    emits('trigger')
  } catch (err: any) {
    console.log('ConnectErr', err)

    const msg = /reject/i.test(err?.message) ? 'User rejected request' : 'Login Failed'
    Notify.error({ title: msg })

    resetUser()
  } finally {
    Object.assign(state, initState())
  }
}
</script>
<template>
  <div>
    <div class="control">
      <div class="dotItem dot__active">
        <div class="dot"></div>
      </div>
      <div
        class="dotItem grow"
        v-for="n in 2"
        :key="n"
        :class="[n == 1 && state.isLoading && 'dot__active']"
      >
        <i></i>
        <div class="dot"></div>
      </div>
    </div>

    <Transition name="fade" mode="out-in">
      <section v-if="!state.isLoading">
        <div class="connectors" v-if="!state.isLoading">
          <div class="choice wallet" v-for="c in wallets" :key="c.id" @click="executeConnect(c)">
            <div class="avatar">
              <img v-if="c?.options.logo" :src="c?.options.logo" alt="" />
              <div v-else-if="c?.options.icon" :class="c?.options.icon" />
            </div>
            <div>{{ c.options?.name || c.name }}</div>
            <a
              v-if="!c.ready && c.options?.unReady"
              :href="c.options?.unReady"
              target="_blank"
              rel="noopener"
            ></a>
          </div>
        </div>
        <p class="wallet-desc">
          By connecting to the Wallet, you agree to the
          <a class="underline">User Agreement</a>
          and acknowledge that you have read and understand the
          <a class="underline">Privacy Policy</a>.
          <br />
          Only available to our authorized clients.
        </p>
      </section>

      <section v-else>
        <div class="pendingStage">
          <div class="item">
            <img src="/favicon.svg" />
          </div>
          <div>
            <div class="w-48px i-custom:pending" />
          </div>
          <div class="item">
            <img v-if="selectdWallet?.options.logo" :src="selectdWallet?.options.logo" alt="" />
            <div v-else-if="selectdWallet?.options.icon" :class="selectdWallet?.options.icon" />
          </div>
        </div>
        <p class="wallet-desc">
          Please approve the connection in your wallet and authorize access to continue.
        </p>
      </section>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.control {
  @apply row-center my-24px w-2/3 mx-auto my-24px md:(mt-40px mb-24px w-240px);
  .dotItem {
    @apply transition-all row-center;
    .dot {
      @apply bg-brand-hint rounded-full w-15px h-15px;
    }
    i {
      @apply bg-brand-hint block h-1px grow;
    }
  }

  .dot__active {
    .dot,
    i {
      @apply bg-brand-highlight;
    }
  }
}
.connectors {
  @apply grid grid-cols-2 gap-12px mb-16px md:(gap-16px mb-24px);
  .choice {
    @apply cursor-pointer text-brand-primary bg-brand-wall rounded-4px grid items-center justify-center text-center typo-1 py-16px;
  }
  .wallet {
    @apply gap-y-8px relative;
    .avatar {
      @apply h-40px w-40px mx-auto;
      img,
      div {
        @apply w-full h-full;
      }
    }
    a {
      @apply absolute w-full h-full top-0 left-0 z-2;
    }
  }
}

.pendingStage {
  grid-template-columns: repeat(3, max-content);
  @apply grid justify-center items-center mb-16px gap-x-12px md:(gap-x-54px mb-24px);
  .item {
    @apply bg-brand-wall row-center w-100px h-100px;
    img,
    div {
      @apply w-40px h-40px;
    }
  }
}

.wallet-desc {
  @apply text-brand-main font-500 typo-0 md:(text-14px leading-21px);
}
</style>
