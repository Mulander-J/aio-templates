<script setup lang="ts">
import { LoginStateEnum, useLoginState } from '../useLogin'
const appTitle = import.meta.env.VITE_APP_TITLE
const { getLoginState } = useLoginState()
const getFormTitle = computed(() => {
  const titleObj: Record<LoginStateEnum, string> = {
    [LoginStateEnum.LOGIN]: 'Login',
    [LoginStateEnum.REGISTER]: 'Regsiter'
  }
  return titleObj[unref(getLoginState)]
})
</script>

<template>
  <div>
    <div font-500 text-3xl mb-4>{{ getFormTitle }}</div>
    <div text-xl c-gray mb-4>{{ appTitle }}</div>
  </div>
</template>
