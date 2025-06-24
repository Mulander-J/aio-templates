<script lang="ts" setup>
import { StyleValue } from 'vue'
import type { NotifyProps } from './index'

const props = defineProps<NotifyProps>()

const root = ref(null!)

const state = reactive({
  height: 0,
  visible: false
})

const msgStatusIcon = computed(() => {
  switch (props.type) {
    case 'pending':
      return 'loading'
    case 'error':
      return 'error-circle'
    case 'success':
      return 'checked-circle'
    case 'warn':
    case 'normal':
    default:
      return ''
  }
})

const styleObj = computed(
  () =>
    ({
      bottom: `${props.verticalOffset}px`
    } as StyleValue)
)

const timer = ref(0)

const handleClose = (e: MouseEvent): void => {
  e.preventDefault()
  state.visible = false
}

const afterLeave = () => {
  ;(props as any).onClosed(state.height)
}

const afterEnter = () => {
  state.height = (root as any).value.offsetHeight
}

const createTimer = () => {
  if (props.duration) {
    timer.value = (setTimeout(() => {
      state.visible = false
    }, Number(props.duration)) as unknown) as number
  }
}

const clearTimer = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = 0
  }
}

onMounted(() => {
  state.visible = true
  createTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>
<template>
  <Transition name="move" @after-leave="afterLeave" @after-enter="afterEnter">
    <div
      v-if="state.visible"
      ref="root"
      class="d-notify"
      :class="['notify__' + type]"
      :style="styleObj"
      @mouseenter="clearTimer"
      @mouseleave="createTimer"
    >
      <div class="title">
        <div class="icon__status" v-if="msgStatusIcon">
          <Spin v-if="msgStatusIcon === 'loading'" size="24px" />
          <SvgIcon v-else :name="msgStatusIcon" size="24px" />
        </div>
        <div class="grow">{{ title || 'Title' }}</div>
        <div class="icon__close" v-if="!hideClose" @click="handleClose">
          <SvgIcon name="close" size="20px" />
        </div>
      </div>

      <div class="content" v-if="content">
        <slot>
          {{ content }}
        </slot>
      </div>
    </div>
  </Transition>
</template>
<style scoped lang="scss">
.d-notify {
  transition: all 0.28s ease;
  @apply fixed z-3200 bg-brand-main rounded-4px p-16px h-auto bottom-16px left-16px right-16px 
    md:(max-w-450px min-w-260px w-auto bottom-24px left-auto right-24px);

  .title {
    @apply row-center gap-x-4px typo-2 font-600 text-white md:(typo-3);
    .icon__status {
      user-select: none;
      height: 24px;
      width: 24px;
    }
    .icon__close {
      @apply cursor-pointer w-20px h-20px text-white hover:text-brand-hint;
      transition: all 0.28s ease-in-out;
    }
  }

  .content {
    @apply mt-8px text-brand-wall typo-1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    white-space: pre-wrap;
  }
}

.notify__pending {
  .icon__status {
    color: white;
  }
}
.notify__error {
  .icon__status {
    color: #ff1f00;
  }
}
</style>
