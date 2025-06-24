<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-mdi-information-outline inline-block />
    </div>
    404
    <div>
      <DBtn text-sm m="3 t8" @click="router.back()">
        {{ t('button.back') }}
      </DBtn>
    </div>
  </main>
</template>
