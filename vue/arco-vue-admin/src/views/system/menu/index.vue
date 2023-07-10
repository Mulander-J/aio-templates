<script setup lang="ts">
import { PermissionApi } from '@/api/admin'

defineOptions({
  name: 'MenuManagement'
})

const filedProps = {
  key: 'id',
  title: 'displayName',
  children: 'children'
}

const state = reactive<{
  isLoading: boolean
  data: any[]
}>({
  isLoading: false,
  data: []
})

const searchKey = ref('')
const searchData = (keyword: string) => {
  const loop = (data: any) => {
    const result: any = []
    data.forEach((item: any) => {
      if (item.displayName.toLowerCase().includes(keyword.toLowerCase())) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length > 0) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })
    return result
  }

  return loop(state.data)
}
const treeData = computed(() => {
  if (!searchKey.value) return state.data
  return searchData(searchKey.value)
})

const fetchData = async () => {
  searchKey.value = ''
  if (state.isLoading) return
  try {
    state.isLoading = true
    const res = await PermissionApi.toList()
    state.data = res
  } catch {
    state.data = []
  } finally {
    state.isLoading = false
  }
}

const getMatchIndex = (title: string) => {
  if (!searchKey.value) return -1
  return title.toLowerCase().indexOf(searchKey.value.toLowerCase())
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <a-card title="Permission" class="general-card">
    <!-- search form -->
    <a-form :model="state">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-input v-model="searchKey" placeholder="Please enter name" />
        </a-col>
        <a-col :span="8">
          <a-space>
            <a-button type="outline" @click="fetchData">
              <template #icon>
                <icon-refresh />
              </template>
              Reset
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
    <a-divider class="my-4" />
    <a-tree :data="treeData" :field-names="filedProps" action-on-node-click="expand">
      <template #title="nodeData">
        <template v-if="((index = getMatchIndex(nodeData?.displayName)), index < 0)">
          {{ `${nodeData?.displayName}(${nodeData?.key})` }}
        </template>
        <span v-else>
          {{ nodeData?.displayName?.substr(0, index) }}
          <span style="color: var(--color-primary-light-4)">
            {{ nodeData?.displayName?.substr(index, searchKey.length) }}
          </span>
          {{ nodeData?.displayName?.substr(index + searchKey.length) }}
        </span>
      </template>
    </a-tree>
  </a-card>
</template>
