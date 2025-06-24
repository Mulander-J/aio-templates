<script setup lang="ts">
import { useAppStore } from '~/store/app'
import { HomeNavs } from './navs'
import DropMenu from './DropMenu.vue'
import CollapseMenu from './CollapseMenu.vue'

const appStore = useAppStore()

const isMobile = computed(() => appStore.isMobile)

const { availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const navName = ref(HomeNavs[0].name)
const showNav = ref(false)
const toggle = useToggle(showNav)
const triggerNav = (nav: string) => {
  if (nav && nav === navName.value) navName.value = ''
  else navName.value = nav
}
const toogleNav = () => {
  !showNav.value && (navName.value = HomeNavs[0].name)
  nextTick(() => {
    toggle()
  })
}
const closeSider = (next?: any) => {
  next && next()
  toggle(false)
  navName.value = HomeNavs[0].name
}

const preventScroll = (e: Event) => {
  e.preventDefault()
}

watch(
  () => appStore.isMobile,
  () => {
    showNav.value = false
  },
  { immediate: true }
)

watch(
  () => showNav.value,
  (b: boolean) => {
    if (b) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', preventScroll, false)
    } else {
      nextTick(() => {
        document.body.style.overflow = ''
        document.removeEventListener('touchmove', preventScroll, false)
      })
    }
  }
)
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-10 bg-white">
    <div
      class="relative z-2 bg-white flex items-center justify-between px-16px h-60px py-14px md:(h-72px py-0 px-140px)"
    >
      <RouterLink :to="{ path: '/' }" custom v-slot="{ navigate }">
        <div class="h-32px md:(h-35px)" @click="closeSider(navigate)">
          <img class="h-full" src="/logo.svg" alt="VDNA" />
        </div>
      </RouterLink>

      <div v-if="!isMobile" class="flex items-center gap-x-48px">
        <DropMenu v-for="(item, i) in HomeNavs" :data="item" :key="i" />

        <i
          class="text-brand-main hover:text-brand-highlight cursor-pointer i-mdi-translate-variant"
          @click="toggleLocales"
        ></i>
      </div>

      <div v-else class="text-brand-main" @click="toogleNav">
        <Transition name="fade" mode="out-in">
          <SvgIcon v-if="!showNav" name="nav" size="24px" />
          <SvgIcon v-else name="close" size="24px" />
        </Transition>
      </div>
    </div>

    <Transition mode="out-in" name="show" v-if="isMobile">
      <div
        class="fixed z-1 top-0 left-0 bottom-0 right-0 p-16px pt-76px bg-white flex flex-col"
        v-show="showNav"
      >
        <div class="grow flex flex-col gap-y-12px">
          <CollapseMenu
            v-for="(item, i) in HomeNavs"
            :data="item"
            :key="i"
            :expand="navName === item.name"
            @trigger="triggerNav"
            @navgi="closeSider"
          />
        </div>
        <div class="flex justify-end py-8px">
          <div class="rounded-full bg-brand-highlight text-white w-64px h-64px row-center">
            <i class="i-mdi-translate-variant w-32px h-32px" @click="toggleLocales"></i>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
