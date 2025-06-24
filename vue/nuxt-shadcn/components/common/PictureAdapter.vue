<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    path: string
    alt?: string
    size?: Array<'sm' | 'md'>
    locale?: 'en' | 'zh'
}>()

const variants = computed(() => {
    return new FileVariantGenerator(props.path)
        .withSize(props.size)
        .withLocale(props.locale)
        .build()
})
</script>
<template>
    <picture>
        <source v-for="variant in variants" :key="variant.srcset" :srcset="variant.srcset" :media="variant.media">
        <img class="w-full h-auto" :src="variants[0].srcset" :alt="alt || 'img'" draggable="false">
    </picture>
</template>
