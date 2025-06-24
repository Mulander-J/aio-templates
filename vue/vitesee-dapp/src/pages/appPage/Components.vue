<script setup lang="ts">
import { DPrompt } from '~/components/dialog'
import Notify from '~/components/notify'
import { ConnectWeb3 } from '~/plugins/connectWeb3'
import dayjs from '~/plugins/dayjs'
import { lineOpt } from './echartOptions'
import CustNote from './CustNote.vue'

defineOptions({
  name: 'AppComponents'
})

const OptSelect = [
  { label: 'Option-A', value: 'a' },
  { label: 'Option-B', value: 'b' },
  { label: 'Option-C', value: 'c' }
]

const state = reactive<any>({
  val: '',
  errMsg: '',
  select: '',
  selects: [],
  chartOpt: { ...lineOpt }
})

const randomChart = () => {
  const start = dayjs()
  state.chartOpt.series[0].data = new Array(10)
    .fill(0)
    .map((_, i) => [start.subtract(i, 'd').format('MM-DD'), 100 + 20 * Math.random()])
  console.log('state.chartOpt.series[0].data', state.chartOpt.series[0].data)
}

const opneDialog = () => {
  DPrompt({
    title: 'Title',
    content: 'This is conetnt.',
    okTxt: 'Ok',
    cancelTxt: 'Cancel'
  }).then((res: any) => {
    console.log('cb', res)
  })
}

const openNotify = (mode: 'success' | 'err' | 'pending' | 'custom') => {
  switch (mode) {
    case 'success':
      Notify.success({ title: 'Success Title', content: 'Success' })
      return
    case 'err':
      Notify.error({ title: 'Error Title' })
      return
    case 'pending':
      Notify.pending({ title: 'Pedning Title' })
      return
    case 'custom':
      Notify({ title: 'Custom' }, { name: 'addLog', type: CustNote, binds: { text: 'Cust' } })
      return
    default:
      return
  }
}

onMounted(() => {
  randomChart()
})
</script>

<template>
  <div class="flex flex-col h-full">
    <h1 class="typo-title">Overview</h1>

    <ul class="list">
      <li>
        <div>
          <h3>Button</h3>
          <div class="flex gap-4">
            <DBtn fill label="Button" />
            <DBtn label="Button" />
            <DBtn fill theme="primary" label="Button" />
            <DBtn theme="primary" label="Button" />
            <DBtn disabled label="Button" />
            <DBtn disabled fill label="Button" />
            <DBtn class="w-188px" arrow theme="primary" label="Arrow Button" />
          </div>
        </div>
      </li>

      <li>
        <div>
          <h3>Input</h3>
          <div class="flex gap-4 mb-4">
            <DInput
              class="w-160px h-48px"
              placeholder="Input"
              v-model:value="state.val"
              :errMsg="state.errMsg"
            />
            <DInput
              class="w-160px h-48px"
              placeholder="Input"
              v-model:value="state.val"
              errMsg="Loading..."
              loading
            />
            <DInput
              class="w-160px h-48px"
              placeholder="Input"
              v-model:value="state.val"
              prefix="checked"
            />
            <DInput
              class="w-160px h-48px"
              placeholder="Input"
              v-model:value="state.val"
              suffix="checked"
            />
          </div>
        </div>
      </li>

      <li>
        <div>
          <h3>Select</h3>
          <div class="flex gap-4">
            <DSelect
              class="w-full md:w-220px z-2001"
              v-model:value="state.select"
              :options="OptSelect"
            />
            <DSelect
              class="w-full md:w-220px z-2001"
              v-model:value="state.selects"
              :options="OptSelect"
              multiple
            />
          </div>
        </div>
      </li>

      <li>
        <div>
          <h3>Link</h3>
          <div class="flex gap-4">
            <Link class="link" href="/"> Home </Link>

            <Link class="link" href="https://github.com/Mulander-J">
              <div class="i-mdi-github"></div>
            </Link>
          </div>
        </div>
      </li>

      <li>
        <div>
          <h3>Notice</h3>
          <div class="flex gap-4">
            <DBtn theme="primary" fill label="Success Notice" @click="openNotify('success')" />
            <DBtn label="Err Notice" @click="openNotify('err')" />
            <DBtn label="Pending Notice" @click="openNotify('pending')" />
            <DBtn theme="primary" fill label="Custom Notice" @click="openNotify('custom')" />
          </div>
        </div>
      </li>

      <li>
        <div>
          <h3>Dialog</h3>
          <div class="flex gap-4">
            <DBtn theme="primary" fill label="Open Dialog" @click="opneDialog" />
            <DBtn theme="primary" fill label="Connect Wallet" @click="ConnectWeb3" />
          </div>
        </div>
      </li>

      <li>
        <div>
          <h3>Status</h3>
          <div class="flex flex-col gap-4">
            <div>
              <p>Spin</p>
              <Spin class="text-brand-highlight" />
            </div>
            <div>
              <p>No Data</p>
              <NoData />
            </div>
          </div>
        </div>
      </li>

      <li>
        <div>
          <h3>Chart</h3>
          <div>
            <DBtn label="Random Chart" @click="randomChart" />
            <DChart :options="state.chartOpt" height="328px" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.list {
  @apply flex flex-col gap-12px;
  h3 {
    @apply my-4;
  }
}
</style>
