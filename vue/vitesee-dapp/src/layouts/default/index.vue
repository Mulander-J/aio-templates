<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'

const { t } = useI18n()

useHead({
  title: t('app.shortTitle'),
  meta: [
    {
      name: 'description',
      content: t('app.description')
    },
    {
      name: 'keywords',
      content: t('app.keywords')
    }
  ]
})
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans">
    <TheHeader />

    <main class="relative grow mt-60px md:mt-72px">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <TheFooter />
  </div>
</template>
