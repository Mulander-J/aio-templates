<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { useClipboard } from '@vueuse/core'
import Block from './block.vue'
import ColorPanel from './color.vue'
import { useAppStore } from '@/store'

const visible = ref(false)
const appStore = useAppStore()
const { copy } = useClipboard()
const contentOpts = computed(() => [
  // {
  //   name: 'serverMenu',
  //   key: 'serverMenu',
  //   defaultVal: appStore.serverMenu,
  // },
  {
    name: 'Top Menu',
    key: 'topMenu',
    defaultVal: appStore.topMenu
  },
  // {
  //   name: 'navbarheight',
  //   key: 'navbarheight',
  //   defaultVal: appStore.navbarHeight,
  //   type: 'number',
  // },
  {
    name: 'Sidebar Width',
    key: 'sidebarWidth',
    defaultVal: appStore.sidebarWidth,
    type: 'number'
  },
  { name: 'MultiTabs', key: 'multiTabs', defaultVal: appStore.multiTabs },
  { name: 'Footer', key: 'footer', defaultVal: appStore.footer }
])
const othersOpts = computed(() => [
  {
    name: 'Color Weakness',
    key: 'colorWeakness',
    defaultVal: appStore.colorWeakness
  }
])

const copySettings = async () => {
  const text = JSON.stringify(appStore.$state, null, 2)
  await copy(text)
  Message.success('Copy Success')
}

const cancel = () => {
  visible.value = false
}

defineExpose({
  visible
})
</script>

<template>
  <!-- <div class="fixed-settings" @click="setVisible">
    <a-button type="primary">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </div> -->
  <a-drawer
    :width="350"
    unmount-on-close
    :visible="visible"
    cancel-text="Close"
    ok-text="Copy"
    @cancel="cancel"
    @ok="copySettings"
  >
    <template #title>Page Setting</template>
    <Block title="Theme">
      <ColorPanel />
    </Block>
    <Block :options="contentOpts" title="Content" />
    <Block :options="othersOpts" title="Other" />
  </a-drawer>
</template>

<style scoped lang="less">
.fixed-settings {
  position: fixed;
  top: 280px;
  right: 0;

  svg {
    font-size: 18px;
    vertical-align: -4px;
  }
}
</style>
