<template>
    <main class="h-screen w-full row-center px-[max(5.34%,20px)] md:px-[max(6.94%,100px)]">
        <section class="flex flex-col items-center justify-center gap-2">
            <h1 class="text-4xl font-bold text-primary">{{ $t('hello') }} Nuxt</h1>
            <img class="select-none" src="/imgs/icon.png" alt="logo" draggable="false"/>
            <RekaButton class="min-w-[200px]" variant="primary" launch>Click me</RekaButton>
        </section>
    </main>
</template>
