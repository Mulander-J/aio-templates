<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const gotoPath = route.params.path as string
setTimeout(() => {
  router.replace({ path: gotoPath })
}, 800)
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <icon-loading size="42px" />
  </div>
</template>

<style scoped lang="less"></style>
