<script setup lang="ts">
import SvgIcon from '~/components/SvgIcon.vue'
import DBtn from '~/components/DBtn.vue'
import { useAppStore } from '~/store/app'
import type { DialogProps } from './index'

const props = defineProps<DialogProps>()

const emit = defineEmits(['update:visible', 'next'])

const appStore = useAppStore()

const initZindex = 3101

const _isShow = ref(props.visible)
const _clickKey = ref(false)

const dialogStyle = computed(() => {
  const _s: any = {}
  if (props?.width && !appStore.isMobile) {
    if (typeof props.width === 'string') _s.width = props.width
    else _s.width = `${props.width}px`
  }

  return _s
})

/*  Handlers  */

const handleTrigger = (flag: boolean) => {
  emit('update:visible', false)
  emit('next', flag)
  _isShow.value = false
  _clickKey.value = flag
}

const onClickOverlay = () => {
  !props?.lockOverlay && handleTrigger(false)
}

const delayClose = () => {
  props.onClose && props.onClose(_clickKey.value)
}

/*  Hooks */

watch(
  () => props.visible,
  (_b) => {
    _isShow.value = _b
  }
)
</script>

<template>
  <Teleport to="#app">
    <div class="relative" :class="[customCls || '']" :style="{ zIndex: zIndex || initZindex }">
      <transition name="fade" mode="out-in">
        <div v-if="_isShow" class="dialog-overlay" @click="onClickOverlay" />
      </transition>
      <transition name="show" mode="out-in" @after-leave="delayClose">
        <div v-if="_isShow" class="dialog-wrapper row-center">
          <div class="dialog" :style="dialogStyle">
            <header v-if="title" class="dialog-header">
              <span>{{ title }}</span>
              <SvgIcon
                v-if="!hideClose"
                class="dialog-close"
                name="close"
                @click="handleTrigger(false)"
              />
            </header>

            <main class="dialog-body">
              <slot>
                {{ content }}
              </slot>
            </main>

            <footer v-if="!hideFooter" class="dialog-footer">
              <slot name="actions">
                <div class="actionBar">
                  <DBtn v-if="cancelTxt" @click="handleTrigger(false)">
                    {{ cancelTxt }}
                  </DBtn>
                  <DBtn v-if="okTxt" theme="primary" fill @click="handleTrigger(true)">
                    {{ okTxt }}
                  </DBtn>
                </div>
              </slot>
            </footer>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.dialog-overlay {
  @apply fixed top-0 bottom-0 left-0 right-0;
  z-index: 1;
  background: rgba(28, 31, 68, 0.6);
}

.dialog-wrapper {
  @apply fixed top-1/2 left-1/2 w-full md:w-auto;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.dialog {
  @apply bg-white relative h-auto rounded-4px p-16px
    w-9/10 max-w-375px md:(w-auto max-w-635px py-24px px-32px);
  .dialog-header {
    @apply relative pr-24px;
    span {
      @apply text-brand-primary block w-full pr-40px text-18px font-600 leading-27px;
    }
    .dialog-close {
      @apply w-20px h-20px absolute cursor-pointer top-0 right-0 text-brand-primary md:(text-brand-main);
      transition: all 0.28s ease-in-out;

      &:hover {
        @apply text-brand-primary;
        transform: scale(1.1);
      }
    }
  }

  .dialog-body {
    @apply mt-24px;
  }

  .dialog-footer {
    @apply mt-26px md:(mt-40px);
    .actionBar {
      @apply flex items-center justify-end gap-12px;
      @media (max-width: 750px) {
        :nth-child(1) {
          width: 50%;
        }
        :nth-last-child(1) {
          width: 100%;
        }
        :nth-child(2) {
          width: 50%;
        }
      }
    }
  }
}
</style>
