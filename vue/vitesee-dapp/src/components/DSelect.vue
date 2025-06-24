<script lang="ts" setup>
import { isArray } from '~/utils/is'

const emit = defineEmits(['update:value'])

type OptType = { label: string; value: any; icon?: string; disabled?: boolean }

const props = defineProps<{
  value: any
  options: Array<OptType>
  placeholder?: string
  multiple?: boolean
}>()

const state = reactive<{
  selected: any[]
  expand: boolean
}>({
  expand: false,
  selected: []
})

const selectEle = ref(null)

onClickOutside(selectEle, () => {
  state.expand = false
})

const headItem = computed(() => {
  if (state.selected.length + props.options.length <= 0) return null
  return props.options.find((e) => e.value === state.selected?.[0])
})

const showLabel = computed(() => {
  const len = state.selected.length
  if (len === 1 && headItem.value) {
    return headItem.value.label
  } else if (len > 1 && headItem.value) {
    return len === props.options.length ? 'All' : `${headItem.value.label}...+${len}`
  } else {
    return ''
  }
})

watch(
  () => props.value,
  (v) => {
    state.selected = isArray(v)
      ? [...(v.length === 0 ? props.options.map((e) => e.value) : v)]
      : [v]
  },
  { immediate: true }
)

const _triggerMulti = (val: any) => {
  const { selected } = state
  if (selected.includes(val)) {
    return selected.filter((e) => e !== val)
  } else {
    return [...selected, val]
  }
}

const handleSelect = (item: OptType) => {
  if (item.disabled) return

  if (props?.multiple) {
    state.selected = _triggerMulti(item.value)
    emit('update:value', state.selected)
  } else {
    state.selected = [item.value]
    emit('update:value', item.value)
    state.expand = false
  }
}
</script>

<template>
  <div ref="selectEle">
    <div class="d-select" :class="[state.expand && 'select__expand']">
      <div class="select__inner inner-item" @click.stop="state.expand = !state.expand">
        <div v-if="headItem?.icon" class="mr-8px">
          <SvgIcon :name="headItem.icon" size="24px" />
        </div>
        <label v-if="showLabel" class="grow">{{ showLabel }}</label>
        <span v-else class="text-brand-hint select-none">{{ placeholder || 'Select' }}</span>
        <div class="w-16px h-16px ml-8 translate-y-1/4">
          <SvgIcon class="arrow" name="arrow-up" size="16px" />
        </div>
      </div>
      <Transition mode="out-in" name="show">
        <div v-if="state.expand" class="option__outer">
          <button
            class="option__inner inner-item"
            :class="[
              item.disabled
                ? 'opt__disabled'
                : state.selected.includes(item.value)
                ? 'opt__selected'
                : 'opt__default'
            ]"
            v-for="item in props.options"
            :key="item.value"
            :disabled="item.disabled"
            @click="() => handleSelect(item)"
          >
            <div v-if="item?.icon" class="mr-8px">
              <SvgIcon :name="item.icon" size="24px" />
            </div>
            <label class="grow text-left">{{ item.label }}</label>
            <Transition mode="out-in" name="fade">
              <div v-show="state.selected.includes(item.value)" class="opt-icon">
                <SvgIcon name="checked" size="24px" />
              </div>
            </Transition>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.d-select {
  @apply relative w-full text-brand-main border-brand-line typo-1;
  .select__inner {
    @apply flex items-center justify-between border-1px rounded-4px w-full cursor-pointer hover:border-brand-highlight;
    padding: 8px 12px;
    .arrow {
      transform: rotateX(180deg) translateY(25%);
    }
  }
  .option__outer {
    @apply absolute w-full z-5 rounded-4px top-54px left-0 bg-white;
    box-shadow: 0px 2px 8px 0px rgba(51, 51, 51, 0.15);
    .option__inner {
      @apply flex items-center justify-between bg-white w-full;
      padding: 16px 13px;
      height: 40px;
      transition: all 0.2s ease;
      .opt-icon {
        @apply text-brand-highlight w-24px h-24px;
      }
    }
    .opt__default:hover,
    .opt__selected:hover {
      background: rgba(56, 219, 60, 0.06) !important;
    }
    .opt__disabled {
      @apply text-brand-hint;
      img,
      svg {
        @apply text-brand-hint;
      }
    }
  }

  .inner-item {
    height: 40px;
    transition: all 0.2s ease;
  }
}

.select__expand {
  .select__inner {
    .arrow {
      transform: rotateX(0);
    }
  }
  .select__inner {
    @apply border-brand-highlight;
  }
}
</style>
