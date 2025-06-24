<script setup lang="ts">
const percent = ref(0)

const handleScroll = (event: Event) => {
    let { scrollTop, scrollHeight, clientHeight } = event.target;
    percent.value = (100 * scrollTop) / (scrollHeight - clientHeight)
}
</script>
<template>
    <div class="no-scrollbar h-full w-full overflow-auto" @scroll="handleScroll">
        <div id="scrollTrack" class="fixed z-20 top-0 right-0 h-full w-[2PX]">
            <div class="bar" :style="{ height: percent + '%' }" />
        </div>
        <slot />
    </div>
</template>

<style scoped>
.bar {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to top, #008aff, #00ffe7);
    animation: animate 5s linear infinite;
    height: 100%;
    width: 100%;

    &::after,
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #008aff, #00ffe7);
    }

    &::before {
        filter: blur(10px);
    }

    &::after {
        filter: blur(30px);
    }
}

@keyframes animate {

    0%,
    100% {
        filter: hue-rotate(0deg);
    }

    50% {
        filter: hue-rotate(360deg);
    }
}
</style>
