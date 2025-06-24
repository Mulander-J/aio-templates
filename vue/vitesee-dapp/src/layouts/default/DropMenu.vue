<script setup lang="ts">
import type { NavType } from './navs'
defineProps<{
  data: NavType
}>()

const dropEle = ref(null)

const isHovered = useElementHover(dropEle)
</script>

<template>
  <div class="relative" ref="dropEle" :class="[isHovered && 'drop__actived']">
    <div class="drop__inner">
      <span class="font-600">{{ data.meta.title }}</span>
      <div class="arrowIcon">
        <SvgIcon name="arrow-up" size="16px" />
      </div>
    </div>
    <Transition mode="out-in" name="show" v-if="data.children">
      <div class="drop__outer" v-show="isHovered">
        <div class="holder"></div>
        <ul>
          <li v-for="sub in data.children" :key="sub.name">
            <Link v-if="!sub.isRoute" :href="sub.path">
              <div class="drop-item">
                <div
                  class="h-24px w-24px"
                  :class="[sub.meta?.actIcon && 'iconReverse']"
                  v-if="sub.meta?.icon"
                >
                  <SvgIcon class="icon__de" :name="sub.meta?.icon" size="24px" />
                  <SvgIcon
                    class="icon__act"
                    v-if="sub.meta?.actIcon"
                    :name="sub.meta?.actIcon"
                    size="24px"
                  />
                </div>
                <span class="text-left grow">{{ sub.meta.title }}</span>
                <div class="h-24px w-24px rightIcon">
                  <SvgIcon name="arrow-right-slim" size="24px" />
                </div>
              </div>
            </Link>
            <RouterLink v-else-if="sub.path" :to="{ path: sub.path }">
              <div class="drop-item">
                <div class="h-24px w-24px" v-if="sub.meta?.icon">
                  <SvgIcon :name="sub.meta?.icon" size="24px" />
                </div>
                <span class="text-left grow">{{ sub.meta.title }}</span>
                <div class="h-24px w-24px rightIcon">
                  <SvgIcon name="arrow-right-slim" size="24px" />
                </div>
              </div>
            </RouterLink>
            <div class="drop-item" v-else>
              <span>{{ sub.meta.title }}</span>
            </div>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.drop__inner {
  @apply flex items-center h-22px typo-1 text-brand-main hover:text-brand-highlight;
  .arrowIcon {
    @apply h-16px w-16px ml-4px;
    transform: rotateX(180deg);
  }
}
.drop__actived {
  .drop__inner {
    @apply text-brand-highlight;
  }
  .arrowIcon {
    transform: rotate(0) translateY(25%);
  }
}
.drop__outer {
  @apply absolute left-0 top-0;
  .holder {
    @apply w-full h-46px;
  }
  ul {
    box-shadow: 2px 2px 16px rgba(172, 179, 203, 0.24);
    @apply p-12px rounded-4px bg-white;
    li {
      @apply typo-1 font-500 cursor-pointer text-brand-main w-full transition-all rounded-4px py-8px px-12px h-56px;
      &:hover {
        @apply text-brand-highlight;
      }
      .drop-item {
        @apply min-w-max w-full flex items-center justify-between gap-x-4px h-full;
        .iconReverse {
          .icon__de {
            display: block;
          }
          .icon__act {
            display: none;
          }
        }

        .rightIcon {
          opacity: 0;
          transform: translateX(-12px);
          transition: all 0.28s ease;
        }
        &:hover {
          .iconReverse {
            .icon__de {
              display: none !important;
            }
            .icon__act {
              display: block;
            }
          }

          .rightIcon {
            opacity: 1;
            transform: translateX(0px);
          }
        }
      }
    }
  }
}
</style>
