<script setup lang="ts">
import { ConnectWeb3 } from '~/plugins/connectWeb3'
import { disconnect } from '@wagmi/core'
import useAuth from '~/hooks/useAuth'
import { strSlice } from '~/utils'

const router = useRouter()

const { userInfo, resetUser } = useAuth()

const handleLogout = async () => {
  await disconnect()
  resetUser()

  await router.push({ name: 'PageApp' })

  window.location.reload()
}
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <div v-if="userInfo" class="flex flex-col gap-y-8px">
        <div class="px-16px flex items-center justify-center md:(justify-start)">
          <div class="avatar" />
          <span class="font-600 typo-2 text-brand-primary md:(grow)">{{
            userInfo?.address ? strSlice(userInfo?.address) : '0x****'
          }}</span>
        </div>
        <DBtn
          class="w-full mt-8px wallet-btn"
          suffix="disconnect"
          label="Disconnect"
          fill
          @click="handleLogout"
        />
      </div>
      <DBtn
        v-else
        class="w-full h-48px md:(h-40px)"
        label="Connect Wallet"
        theme="primary"
        @click="ConnectWeb3"
      />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  background: linear-gradient(72.07deg, #fa709a 14.92%, #fea740 85.86%);
  @apply w-28px h-28px mr-8px rounded-100;
}
</style>
