<script setup lang="ts">
import Menus from './Menus.vue'
import Wallet from './Wallet.vue'
import { AppRoutes } from '~/router/routes'
import { useAppStore } from '~/store/app'
import { lockScroll } from '~/utils/index'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'

const { t } = useI18n()

useHead({
  title: t('app.shortTitle') + '@app',
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

const appStore = useAppStore()
const isRouterAlive = ref(true)
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

const showNav = ref(false)
const toggle = useToggle(showNav)
const menuTrigger = () => {
  if (appStore.isMobile) {
    toggle(false)
  } else {
    return
  }
}

watch(
  () => appStore.isMobile,
  (b: boolean) => {
    showNav.value = !b
    //  PC clint- disable lockScroll
    !b && lockScroll(false)
  },
  { immediate: true }
)
watch(
  () => showNav.value,
  (b: boolean) => {
    // h5 client - enbale lockScroll
    if (appStore.isMobile) {
      lockScroll(b)
    }
  }
)
watch(
  () => appStore.refreshIndex,
  () => {
    reload()
  }
)

provide('reload', reload)
</script>

<template>
  <main class="flex font-sans">
    <div
      class="fixed w-full flex items-center justify-between overflow-hidden py-14px px-16px border-b-1px h-60px z-3001 bg-white md:(hidden)"
    >
      <RouterLink to="/" title="Home">
        <img class="h-32px" src="/logo.svg" alt="" />
      </RouterLink>
      <div class="text-brand-main md:(hidden)" @click="toggle()">
        <Transition name="fade" mode="out-in">
          <SvgIcon v-if="!showNav" name="nav" size="24px" />
          <SvgIcon v-else name="close" size="24px" />
        </Transition>
      </div>
    </div>

    <Transition mode="out-in" name="show">
      <div
        class="fixed border-brand-line top-0 left-0 right-0 bottom-0 z-3000 md:(border-r-1px h-full w-240px flex items-center flex-col)"
        v-show="showNav"
      >
        <div
          class="hidden overflow-hidden w-full py-32px h-99px justify-center items-center md:(flex)"
        >
          <RouterLink to="/" title="Home">
            <img class="h-35px" src="/logo.svg" alt="" />
          </RouterLink>
        </div>
        <div
          class="flex items-center flex-col w-full h-full bg-white px-16px pt-84px md:(p-0 mt-0 grow)"
        >
          <Menus :data="AppRoutes" @navgi="menuTrigger" />
          <Wallet class="my-24px px-1px w-full md:(w-192px)" />
        </div>
      </div>
    </Transition>

    <a-config-provider :locale="enUS">
      <div
        class="bg-white w-full mt-60px p-16px md:(grow ml-241px mt-0 min-h-screen p-10 w-[calc(100%-241px)])"
      >
        <RouterView v-slot="{ Component }" v-if="isRouterAlive">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </a-config-provider>
  </main>
</template>
