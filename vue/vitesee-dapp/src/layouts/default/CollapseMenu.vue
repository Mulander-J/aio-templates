<script setup lang="ts">
import type { NavType } from './navs'
defineProps<{
  data: NavType
  expand?: boolean
}>()

const emits = defineEmits(['trigger', 'navgi'])

const handleNavigate = (next?: any) => {
  next && next()
  emits('navgi')
}
</script>
<template>
  <div class="h5Collpase" :class="[expand && 'collapse__actived']">
    <div class="collpase__inner" @click="$emit('trigger', data.name)">
      <span class="text-brand-primary font-600 typo-2">{{ data.meta.title }}</span>
      <div class="arrowIcon">
        <SvgIcon name="arrow-up" size="16px" />
      </div>
    </div>
    <ul v-if="data?.children" class="navRows" :class="[!expand && 'nav__hide']">
      <li v-for="(sub, i) in data.children" :key="i">
        <Link v-if="!sub.isRoute" :href="sub.path">
          <div class="nav-item">
            <div class="h-24px w-24px mr-4px" v-if="sub.meta?.icon">
              <SvgIcon :name="sub.meta?.icon" size="24px" />
            </div>
            <span>{{ sub.meta.title }}</span>
          </div>
        </Link>
        <RouterLink v-else-if="sub.path" :to="{ path: sub.path }" custom v-slot="{ navigate }">
          <div class="nav-item" @click="handleNavigate(navigate)">
            <div class="h-24px w-24px mr-4px" v-if="sub.meta?.icon">
              <SvgIcon :name="sub.meta?.icon" size="24px" />
            </div>
            <span>{{ sub.meta.title }}</span>
          </div>
        </RouterLink>
        <div class="nav-item" v-else>
          <span>{{ sub.meta.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.h5Collpase {
  @apply bg-brand-wall rounded-4px;
  .collpase__inner {
    @apply flex items-center justify-between py-16px px-12px;
    .arrowIcon {
      transform: rotateX(180deg);
    }
  }
  .navRows {
    overflow: hidden;
    transition: opacity 0.38s;
    max-height: 1000px;
    @apply border-t-1px border-brand-line;
    .nav-item {
      @apply text-brand-main typo-1 font-500 flex items-center justify-start py-16px px-12px;
    }
  }
  .nav__hide {
    max-height: 0 !important;
    opacity: 0 !important;
  }
}
.collapse__actived {
  .collpase__inner {
    .arrowIcon {
      transform: rotate(0) translateY(25%);
    }
  }
}
</style>
