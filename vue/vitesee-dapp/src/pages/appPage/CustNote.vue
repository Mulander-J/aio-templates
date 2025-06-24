<script setup lang="ts">
defineProps<{ text?: string }>()
</script>
<template>
  <div>This is custom note: {{ text || '' }}</div>
</template>
