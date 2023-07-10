<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { RoleApi } from '@/api/admin'

const props = defineProps({
  checked: {
    type: Array,
    default() {
      return []
    }
  }
})

const emit = defineEmits(['change'])

const state = reactive<{
  isQuerying: boolean
  data: any[]
  checkGroup: any[]
}>({
  isQuerying: false,
  data: [],
  checkGroup: [...props.checked]
})

const fetchData = async () => {
  if (state.isQuerying) return
  state.isQuerying = true
  try {
    const res: any = await RoleApi.toList()
    state.data = res
  } catch (err: any) {
    state.data.length = 0
    Message.error(err.message || err)
  } finally {
    state.isQuerying = false
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="w-full">
    <a-empty v-if="state.data.length <= 0" description="No Data" />
    <a-checkbox-group
      v-else
      v-model="state.checkGroup"
      class="w-full"
      size="small"
      @change="(v) => emit('change', v)"
    >
      <a-checkbox v-for="r in state.data" :key="r.id" :value="r.id">
        <div class="truncate max-w-120px">
          {{ r.displayName }}
        </div>
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>
