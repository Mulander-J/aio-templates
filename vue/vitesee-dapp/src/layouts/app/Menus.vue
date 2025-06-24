<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import useExpand from './useExpand'

const emits = defineEmits(['navgi'])

const props = defineProps<{ data: RouteRecordRaw[]; isSub?: boolean }>()

const route = useRoute()
const { trigger, isExpand, open } = useExpand()

const initExpand = () => {
  const parent = props.data.find((e) => e.children?.some((e) => e.name === route.name))
  if (!parent) return
  if (!isExpand(parent.name)) open(parent.name)
}

watch(() => route, initExpand, { immediate: true })

const handleNavigate = (next?: any) => {
  next && next()
  emits('navgi')
}
</script>

<template>
  <ul class="menu-nav" :class="isSub && 'subMenu-nav'">
    <template v-for="r in data" :key="r.name">
      <li v-if="!r?.meta?.isHide">
        <template v-if="r?.children">
          <RouterLink v-slot="{ isActive, isExactActive }" custom :to="r">
            <div
              class="nav-item"
              :class="[(isActive || isExactActive) && 'nav-active']"
              @click="trigger(r.name)"
            >
              <SvgIcon
                v-if="r?.meta?.icon"
                class="mr-4px"
                :name="String(r?.meta?.icon)"
                size="32px"
              />
              <span class="grow">{{ r?.meta?.title }}</span>
              <SvgIcon
                class="arrow"
                :class="!isExpand(r.name) && 'arrow__collapse'"
                name="arrow-up"
                size="16px"
              />
            </div>
          </RouterLink>
          <Menus
            :data="r.children"
            :class="!isExpand(r.name) && 'menu__hide'"
            is-sub
            @navgi="handleNavigate(null)"
          />
        </template>
        <template v-else>
          <RouterLink v-slot="{ isActive, isExactActive, navigate }" custom :to="r">
            <div
              class="nav-item"
              :class="[(isActive || isExactActive) && 'nav-active']"
              @click.stop="handleNavigate(navigate)"
            >
              <SvgIcon
                v-if="r?.meta?.icon"
                class="mr-4px"
                :name="String(r?.meta?.icon)"
                size="32px"
              />
              <span>{{ r?.meta?.title }}</span>
            </div>
          </RouterLink>
        </template>
      </li>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.menu-nav {
  overflow: hidden;
  transition: max-height 0.38s, opacity 0.48s;
  max-height: 1000px;
  @apply grow flex flex-col gap-y-8px w-full select-none md:(pl-16px pr-15px);
  .nav-item {
    transition: all 0.3s ease-in-out;
    @apply typo-2 font-600 cursor-pointer flex items-center
      text-brand-primary w-full h-48px
      md:(text-brand-hint hover:text-brand-primary px-16px);
    .arrow {
      transition: all 0.38s ease-in-out;
    }
    .arrow__collapse {
      transform: rotateX(180deg);
    }
  }
  .nav-active {
    @apply text-brand-primary;
  }
}
.menu__hide {
  max-height: 0 !important;
  opacity: 0 !important;
}

.subMenu-nav {
  border-left: 1px solid;
  margin-left: 27px;
  padding-left: 10px;
  @apply border-brand-line gap-y-12px;
  .nav-item {
    width: 156px;
    @apply typo-1 rounded-4px h-36px m-0 px-12px;
  }
  .nav-active {
    background: #f7f9fc;
    @apply text-brand-primary;
  }
}
</style>
