<script lang="ts" setup>
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import { usePageTitle } from '@/hooks/usePageTitle'

usePageTitle()
</script>

<template>
  <a-config-provider :locale="enUS">
    <router-view />
  </a-config-provider>
</template>
