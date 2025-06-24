<template>
    <div class="loader"></div>
</template>

<style scoped>
.loader {
    height: 4px;
    width: 100px;
    --c: no-repeat linear-gradient(hsla(210, 100%, 44%) 0 0);
    background: var(--c), var(--c), hsla(210, 100%, 14%);
    background-size: 60% 100%;
    border-radius: 4px;
    animation: l16 3s infinite;
}

@keyframes l16 {
    0% {
        background-position: -150% 0, -150% 0
    }

    66% {
        background-position: 250% 0, -150% 0
    }

    100% {
        background-position: 250% 0, 250% 0
    }
}
</style>
