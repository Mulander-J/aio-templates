<script lang="ts" setup>
const props = defineProps<{
  /* Theme */

  /**
   * 主题
   */
  theme?: 'default' | 'primary'
  /**
   * 是否填充/描边
   */
  fill?: boolean

  /* Button-Binds */

  /**
   * 禁用
   */
  disabled?: boolean

  /**
   * 填充文案
   */
  label?: string

  /* 图标 */

  /**
   * 前缀图标
   */
  preffix?: string
  /**
   * 后缀图标
   */
  suffix?: string
  /**
   * 图标尺寸
   */
  iconSize?: string
  /**
   * 是否在后方追加箭头
   */
  arrow?: boolean
}>()

const _cls = computed(() => {
  const { theme = 'default', disabled, fill } = props

  if (disabled) {
    return `!cursor-not-allowed btn-${fill ? 'filled' : theme}__disabled`
  }

  return `btn-${theme}__${fill ? 'filled' : 'outline'}`
})

const theSize = computed(() => props.iconSize || '22px')
</script>

<template>
  <button class="d-btn" :class="[_cls]" :disabled="disabled">
    <SvgIcon class="mr-8px" v-if="preffix" :name="preffix" :size="theSize" />
    <slot>
      {{ label }}
    </slot>
    <SvgIcon class="ml-8px" v-if="suffix" :name="suffix" :size="theSize" />
    <div v-else-if="arrow" class="overflow-clip">
      <SvgIcon class="arrowIcon" name="arrow-right-slim" :size="theSize" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.d-btn {
  padding: 8px 24px;
  min-height: 40px;
  border-radius: 4px;
  border: 1px solid #b3b8d0;
  transition: all 0.3s linear;
  @apply btn typo-1 relative flex items-center justify-center overflow-hidden;
  .arrowIcon {
    transition: all 0.15s ease;
    width: 0;
    opacity: 0;
    transform: translateX(-12px);
  }
  &:hover {
    .arrowIcon {
      margin-left: 8px;
      opacity: 1;
      width: inherit;
      transform: translateX(0);
    }
  }
}

.btn-default__outline {
  @apply text-brand-primary border-brand-hint bg-white;
  &:hover {
    @apply text-brand-highlight;
  }
}
.btn-primary__outline {
  @apply text-brand-highlight border-brand-highlight bg-white hover:filter-grayscale-10;
}

.btn-default__filled {
  @apply text-brand-primary border-brand-wall bg-brand-wall;
  &:hover {
    @apply text-brand-highlight;
  }
}
.btn-primary__filled {
  @apply text-white border-brand-highlight bg-brand-highlight;
  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), #70bc5b;
  }
}

.btn-default__disabled {
  @apply text-brand-hint border-brand-line bg-white;
}
.btn-primary__disabled {
  @apply text-brand-hint border-brand-line bg-white;
}
.btn-filled__disabled {
  @apply text-white border-brand-line bg-brand-line;
}
</style>
