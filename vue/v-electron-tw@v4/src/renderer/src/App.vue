<script setup lang="ts">
import Versions from '@renderer/components/Versions.vue'

// const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-y-4 h-screen">
    <h1 class="text-[24px] text-blue-500 font-bold underline">Hello world!</h1>
    <div class="text-[16px]">
      Build an Electron app with
      <span class="text-">Vue</span>
      and
      <span>TypeScript</span>
    </div>
    <Versions />
  </div>
</template>
