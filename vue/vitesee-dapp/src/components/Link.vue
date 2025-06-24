<script setup lang="ts">
defineProps<{
  target?: string
  draggable?: boolean
}>()
</script>
<template>
  <a rel="noopener" :draggable="!!draggable" :target="target || '_blank'">
    <slot />
  </a>
</template>
