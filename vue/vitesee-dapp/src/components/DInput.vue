<script setup lang="ts">
const props = defineProps<{
  /**
   * 输入框赋值
   */
  value: string

  /**
   * 错误提示
   */
  errMsg?: string
  /**
   * 输入框类型
   */
  type?: 'text' | 'textarea'
  /**
   * 预设尺寸
   */
  size?: 'sm' | 'lg'
  /**
   * 提示语
   */
  placeholder?: string
  /**
   * 最大字数限制
   * @default 0:空
   */
  maxlength?: number
  /**
   * 后方是否带元素插入
   */
  isAppend?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 前缀图标-svg名
   */
  prefix?: string
  /**
   * 后缀图标-svg名
   */
  suffix?: string

  /**
   * 是否加载中
   */
  loading?: boolean
}>()

const emit = defineEmits(['update:value', 'update:errMsg'])

const input = ref<any>(null)
const { focused } = useFocus(input)

const state = reactive({
  value: ''
})

const changeInput = () => {
  emit('update:errMsg', '')
  emit('update:value', state.value)
}

watch(
  () => props.value,
  (val) => {
    state.value = val
  },
  { immediate: true }
)
</script>

<template>
  <div class="input-outer" :class="[`input-${size || 'sm'}`]">
    <div class="d-input">
      <div class="input-inner" :class="[focused && 'input__focus', isAppend && 'input__append']">
        <slot name="prefix">
          <div v-if="prefix" class="icon">
            <SvgIcon :name="prefix" size="24px" />
          </div>
        </slot>
        <input
          ref="input"
          v-model="state.value"
          :placeholder="placeholder"
          :maxlength="props.maxlength || ''"
          :disabled="disabled"
          type="text"
          @input="changeInput"
        />
        <slot name="suffix">
          <Spin class="text-brand-highlight" v-if="loading" size="24px" />
          <div class="icon" v-else-if="suffix">
            <SvgIcon :name="suffix" size="24px" />
          </div>
        </slot>
      </div>
    </div>

    <Transition name="show" mode="out-in">
      <div class="error" v-if="errMsg">{{ errMsg }}</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.input-outer {
  @apply typo-1;
  .d-input {
    @apply flex items-center justify-start h-full;
    .input-inner {
      @apply h-full text-brand-primary border-1px rounded-4px border-box 
        grow flex items-center justify-start py-8px 
        px-8px gap-x-8px md:(px-12px gap-x-12px);
      background: linear-gradient(0deg, #ffffff, #ffffff), #f5f6fa;
      transition: all 0.38s ease;
      @apply border-brand-line;
      &:hover {
        @apply border-brand-highlight;
      }
      input {
        @apply h-full w-full font-400 outline-none bg-transparent;
      }
      .icon,
      input::placeholder {
        @apply text-brand-hint select-none;
      }
    }
    .input__append {
      border-right: none;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .input__focus {
      @apply border-brand-highlight;
    }
  }
  .error {
    color: #ff1f00;
    margin: 8px 0 0 16px;
  }
}

.input-lg {
  @apply typo-2;
  .d-input {
    min-height: 56px;
    .input-inner {
      padding: 16px;
    }
  }
}
</style>
