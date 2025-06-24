<script setup lang="ts">
import useWagmi from '~/hooks/useWagmi'
import { signMessage } from '@wagmi/core'

const { address, chain, isConnected } = useWagmi()

const sigVal = ref('')

const sign = async () => {
  let sig = ''
  try {
    sig = await signMessage({ message: "I'm signin VDNA as" + address.value })
  } catch {
    sig = ''
  } finally {
    sigVal.value = sig
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="typo-title">Use Wagmi</h1>

    <ul class="list">
      <li>
        <h3>Address</h3>
        <div>{{ address }}</div>
      </li>
      <li>
        <h3>Chain</h3>
        <div>{{ chain }}</div>
      </li>
      <li>
        <h3>isConnected</h3>
        <div>{{ isConnected }}</div>
      </li>

      <li>
        <h3>Sign Msg</h3>
        <div class="my-2">
          <DBtn label="Sign" @click="sign" />
        </div>
        <div>Sig:{{ sigVal || 'N/A' }}</div>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.list {
  @apply flex flex-col gap-12px;
  h3 {
    @apply my-4 text-brand-main;
  }
}
</style>
