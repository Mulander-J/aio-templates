<script setup lang="ts">
import { computed } from 'vue'
import { strSlice } from '../../utils/index'

const props = defineProps<{
  value?: string | number
  short?: boolean
  size?: number
}>()

const showStr = computed(() => {
  if (!props.value) return 'N/A'
  return props.short ? strSlice(props.value) : 'N/A'
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <a-link v-copy="value" :hoverable="false">
      <icon-copy :size="size || 18" />
    </a-link>
    {{ showStr }}
  </div>
</template>
