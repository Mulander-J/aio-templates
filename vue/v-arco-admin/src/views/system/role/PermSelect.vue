<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { PermissionApi } from '@/api/admin'
import { eachTree } from '@/utils/tree'

const props = defineProps({
  keyId: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['change'])

const defaultProps = {
  children: 'children',
  key: 'id',
  title: 'displayName'
}

const myTree = ref()

const state = reactive<{
  isQuerying: boolean
  oldSelection: any[]
  halfSelection: any[]
  data: any[]
}>({
  isQuerying: false,
  oldSelection: [],
  halfSelection: [],
  data: []
})

const fetchData = async () => {
  if (state.isQuerying) return
  state.isQuerying = true
  try {
    const res: any = await PermissionApi.toList()
    state.data = res
    if (props.keyId) {
      const resPerm: any = await PermissionApi.atRole(props.keyId)
      const selection: any = []
      const halfs: any = []

      eachTree(resPerm || [], (ele: any) => {
        if (ele.children.length <= 0) {
          ele?.id && selection.push(ele.id)
        } else {
          ele?.id && halfs.push(ele.id)
        }
      })

      //  console.log('selection', [selection, resPerm])

      state.oldSelection = selection
      state.halfSelection = halfs
      emit('change', [...halfs, ...selection])
    }
  } catch (err: any) {
    state.data.length = 0
    state.oldSelection.length = 0
    Message.error(err.message || err)
  } finally {
    state.isQuerying = false
  }
}

const onCheckChange = (_: any, { halfCheckedKeys }) => {
  const _checked = [..._, ...halfCheckedKeys]
  emit('change', Array.from(new Set(_checked)))
}

onMounted(fetchData)
</script>

<template>
  <div>
    <a-tree
      ref="myTree"
      v-model:checked-keys="state.oldSelection"
      v-model:half-checked-keys="state.halfSelection"
      :checkable="true"
      :data="state.data"
      :field-names="defaultProps"
      checked-strategy="all"
      auto-expand-parent
      @check="onCheckChange"
    />
  </div>
</template>
