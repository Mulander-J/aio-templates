<script setup lang="ts">
const isLoading = ref(true)

onMounted(async () => {
    await waitPreloads([
        { src: '/imgs/icon.png', as: 'image', type: 'preload' }
    ])
    console.log('[Preload done]')
    // 页面加载完成
    isLoading.value = false
})

</script>
<template>
    <Transition mode="out-in" name="fade">
        <div v-if="isLoading"
            style="z-index: 50;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: #000;display: flex;align-items: center;justify-content: center;">
            <Loader />
        </div>
        <div v-else class="fixed w-screen h-screen overflow-hidden text-xs md:text-sm">
            <ScrollProgress id="pageContainer" class="flex flex-col scroll-smooth">
                <!-- <PageHeader /> -->
                <slot />
                <!-- <PageFooter /> -->
            </ScrollProgress>
        </div>
    </Transition>
</template>