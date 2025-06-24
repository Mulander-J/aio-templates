<script setup lang="ts">
import useAuth from '~/hooks/useAuth'
import { ConnectWeb3 } from '~/plugins/connectWeb3'

const route = useRoute()
const router = useRouter()
const { userInfo } = useAuth()

const nextPage = () => {
  if (userInfo.value) {
    const redirect: any = route.query?.redirect || '/app/overview/ethereum'
    router.push({ path: redirect })
  }
}

onMounted(nextPage)
</script>

<template>
  <div>
    <h1 class="typo-title">Wagmi</h1>
    <p class="my-4">Please Connect Wallet first to view Route Wagmi.</p>
    <div class="my-2 mx-auto">
      <DBtn theme="primary" fill @click="ConnectWeb3">Connect Wallet</DBtn>
    </div>
  </div>
</template>
