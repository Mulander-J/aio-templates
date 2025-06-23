<script setup lang="ts">
import GlobalSettings from '../../components/settings/index.vue'
import Menu from '../../components/menu/index.vue'
import { useAppStore, usePermissionStore, useUserStore } from '@/store'

const appStore = useAppStore()
const userStore = useUserStore()
const permissionStore = usePermissionStore()

const isDev = !/prod|qa|stg|stage/i.test(import.meta.env.VITE_APP_MODE)

const toggleDrawerMenu = inject('toggleDrawerMenu') as (ev: MouseEvent) => any

const topMenu = computed(() => appStore.topMenu && permissionStore.permissions)

const appShortTitle = import.meta.env.VITE_APP_SHORT_TITLE as string

const envMode = import.meta.env.VITE_APP_MODE as string
const appMode = /prod/i.test(envMode) ? '' : envMode.toUpperCase()

// theme
const theme = computed(() => {
  return appStore.theme
})
const themeColor = computed(() => {
  return appStore.themeColor
})
const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark)
  }
})
const toggleTheme = useToggle(isDark)
const handleToggleTheme = () => {
  toggleTheme()
}

// full scene
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

// settings
const settingsRef = ref()
const setSettingsVisible = () => {
  settingsRef.value.visible = true
}
// user
const avatar = computed(() => {
  return userStore.getAvatarUrl
})
const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="navbar">
    <div class="navbar-left">
      <a-space>
        <img alt="logo" src="../../../assets/svg/logo.svg" />
        <div class="hidden md:flex gap-2 items-center">
          <div class="font-bold text-18px">
            {{ appShortTitle }}
          </div>
          <a-tag v-if="appMode">{{ appMode }}</a-tag>
        </div>

        <icon-menu-fold
          v-if="!topMenu && appStore.isMobile"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="navbar-center">
      <Menu v-if="topMenu" />
    </div>
    <ul class="navbar-right">
      <li>
        <a-tooltip :content="theme === 'light' ? 'Dark' : 'Light'">
          <a-button class="nav-btn" type="outline" shape="circle" @click="handleToggleTheme">
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="isFullscreen ? 'Exit FullScreen' : 'FullScreen'">
          <a-button class="nav-btn" type="outline" shape="circle" @click="toggleFullScreen">
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <!-- settings -->
      <li v-if="isDev">
        <a-tooltip content="PageSetting">
          <a-button class="nav-btn" type="outline" shape="circle" @click="setSettingsVisible">
            <template #icon>
              <icon-experiment />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <!-- user -->
      <li>
        <a-dropdown trigger="click">
          <div class="flex items-center gap-2">
            <div
              class="w-28px h-28px rounded-full overflow-hidden"
              :style="{ 'background-color': themeColor }"
            >
              <a-image width="28px" height="28px" :src="avatar" :preview="false">
                <template #error>
                  <img src="@/assets/images/avatar.jpg" alt="" class="w-28px h-28px" />
                </template>
                <template #loader>
                  <icon-loading size="28px" />
                </template>
              </a-image>
            </div>
            <span class="hidden md:block grow truncate">{{ userStore.nickname }}</span>
          </div>
          <template #content>
            <a-doption>
              <a-space @click="$router.push({ name: 'UserCenter' })">
                <icon-idcard />
                <span>User Center</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>Logout</span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
    <!-- page settings -->
    <GlobalSettings v-if="isDev" ref="settingsRef" />
  </div>
</template>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.navbar-left {
  display: flex;
  align-items: center;
  padding-left: 20px;
  img {
    width: 28px;
    margin-right: 8px;
  }
}

.navbar-center {
  flex: 1;
}

.navbar-right {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  a {
    color: var(--color-text-1);
    text-decoration: none;
  }
  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 14px;
  }
  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }
  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
