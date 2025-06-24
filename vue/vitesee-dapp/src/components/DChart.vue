<script setup lang="ts">
import type { PropType } from 'vue'
import type { EChartsOption } from 'echarts'
import { useDebounceFn } from '@vueuse/core'
import echarts from '~/plugins/echarts.js'

import { isString } from '~/utils/is'

const props = defineProps({
  options: {
    type: Object as PropType<EChartsOption>,
    required: true
  },
  width: {
    type: [Number, String],
    default: ''
  },
  height: {
    type: [Number, String],
    default: '500px'
  }
})

// const theme = computed(() => {
//   const echartTheme: boolean | string = unref(isDark) ? true : 'auto'

//   return echartTheme
// })

const options = computed(() => {
  return Object.assign(props.options, {
    // darkMode: unref(theme)
    darkMode: 'auto'
  })
})

const elRef = ref<ElRef>()

let echartRef: Nullable<echarts.ECharts> = null

// const contentEl = ref<Element>()

const styles = computed(() => {
  const width = isString(props.width) ? props.width : `${props.width}px`
  const height = isString(props.height) ? props.height : `${props.height}px`

  return {
    width,
    height
  }
})

const initChart = () => {
  if (unref(elRef) && props.options) {
    echartRef = echarts.init(unref(elRef) as HTMLElement)
    echartRef?.setOption(unref(options))
  }
}

watch(
  () => options.value,
  (options) => {
    if (echartRef) {
      echartRef?.setOption(options)
    }
  },
  {
    deep: true
  }
)

const resizeHandler = useDebounceFn(() => {
  if (echartRef) {
    echartRef.resize()
  }
}, 100)

// const contentResizeHandler = async (e: TransitionEvent) => {
//   if (e.propertyName === 'width') {
//     resizeHandler()
//   }
// }

onMounted(() => {
  initChart()

  window.addEventListener('resize', resizeHandler)

  //   contentEl.value = document.getElementsByClassName(`echart-layout-content`)[0]
  //   unref(contentEl) &&
  //     (unref(contentEl) as Element).addEventListener('transitionend', contentResizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
  //   unref(contentEl) &&
  //     (unref(contentEl) as Element).removeEventListener('transitionend', contentResizeHandler)
})

onActivated(() => {
  if (echartRef) {
    echartRef.resize()
  }
})
</script>

<template>
  <div ref="elRef" :class="[$attrs.class]" :style="styles"></div>
</template>
