<script setup lang="ts">
defineProps<{
  content?: string
}>()
</script>

<template>
  <div class="col-center">
    <div>
      <img src="./img_empty.svg" alt="" />
    </div>
    <p class="mt-20 typo-4">{{ content || 'No Data' }}</p>
  </div>
</template>
