<template>
  <RouterView />
</template>
<script lang="ts" setup>
import { useAppStore } from './store/app'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => (preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'))
    }
  ],
  meta: [
    {
      name: 'theme-color',
      content: computed(() => (isDark.value ? '#00aba9' : '#ffffff'))
    }
  ]
})

const { setIsMobile } = useAppStore()

const throttledFn = useThrottleFn(setIsMobile, 200, true, true)

onBeforeMount(async () => {
  window.addEventListener('resize', throttledFn)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', throttledFn)
})
</script>
