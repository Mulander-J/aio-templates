<script setup lang="ts">
import { Message, Modal } from '@arco-design/web-vue'
import PermSelect from './PermSelect.vue'
import { useUserStore } from '@/store/modules/user'
import { RoleApi } from '@/api/admin'
import type { RoleType } from '@/api/libs/types'
import { FormState, ModalInit } from '@/constant'
import { calcColWidth, colsAdminRole } from '@/constant/tableCols'
import { required } from '@/constant/formRules'

defineOptions({
  name: 'RoleManagement'
})

const colWidth = calcColWidth(colsAdminRole, 200)

const defaultRole = {
  key: '',
  displayName: '',
  permissionIds: []
}

const userStore = useUserStore()

const curRoleIds = computed(() => userStore?.roles?.map((e: any) => e?.id) || [])

const formRef = ref()

const state = reactive<{
  dialogVisible: boolean
  isFetching: boolean
  isUpdateing: boolean
  editMode: FormState
  formData: RoleType
  data: RoleType[]
}>({
  dialogVisible: false,
  isFetching: false,
  isUpdateing: false,
  editMode: FormState.create,
  formData: defaultRole,
  data: []
})

const isCreate = computed(() => state.editMode === FormState.create)
const FormProp = computed<any>(() => {
  switch (state.editMode) {
    case FormState.create:
      return {
        title: 'Create role',
        rules: {
          key: [required],
          displayName: [required]
        }
      }
    default:
      return {
        title: 'View',
        rules: {
          key: [],
          displayName: [required]
        }
      }
  }
})

const fetchData = async () => {
  if (state.isFetching) return
  try {
    state.isFetching = true
    const res: any = await RoleApi.toList()
    state.data = res
  } catch {
    state.data = []
  } finally {
    state.isFetching = false
  }
}

const suggestRefresh = () => {
  Modal.confirm({
    title: `Recommand logout`,
    content: `The role of current user has been updated. Please relogin for better perfomance.`,
    ...ModalInit,
    okText: 'Logout',
    onOk: () => {
      userStore.logout()
    }
  })
}

const deleteRow = (row: any) => {
  if (state.isUpdateing) return

  Modal.confirm({
    title: `Delete this item?`,
    content: `Key: ${row.key}`,
    ...ModalInit,
    okText: 'Confirm',
    onOk: async () => {
      try {
        state.isUpdateing = true
        const res = await RoleApi.toDelete(row.id)
        if (res) {
          Message.success(`Delete Success`)
          fetchData()
          curRoleIds.value.includes(row.id) && suggestRefresh()
        }
      } finally {
        state.isUpdateing = false
      }
    }
  })
}

const handlePermIds = (ids: any) => {
  if (Array.isArray(ids)) {
    state.formData.permissionIds = [...ids]
  } else {
    state.formData.permissionIds = []
  }
}

const openModal = (editKey: FormState, row?: RoleType) => {
  state.editMode = editKey

  if (editKey === FormState.create) {
    state.formData = { ...defaultRole }
    state.dialogVisible = true
  } else {
    if (!row) return
    state.formData = { ...row }
    state.dialogVisible = true
  }
}

const submitRow = async () => {
  if (state.isUpdateing) return
  state.isUpdateing = true

  const theForm = formRef.value

  try {
    const validate = await theForm?.validate()?.catch(() => true)

    if (!validate) {
      const _isCreated = isCreate.value
      const param = { ...state.formData }
      _isCreated && delete param.id
      param.permissionIds = Array.from(new Set(param?.permissionIds || []))

      const res = await (_isCreated
        ? RoleApi.toAdd(param)
        : RoleApi.doUpdate(param?.id || 0, param))

      theForm.clearValidate()

      if (res) {
        state.dialogVisible = false
        Message.success('Success')
        fetchData()
      }
    }
  } catch (err: any) {
    Message.error(err.message || err)
  } finally {
    state.isUpdateing = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <a-card title="Role Management" class="general-card">
    <a-row>
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="openModal(FormState.create)">Create</a-button>
        </a-space>
      </a-col>
      <a-col :span="12" class="flex justify-end items-center">
        <a-tooltip content="Refresh">
          <div class="ml-2" @click="fetchData"><icon-refresh size="18" /></div>
        </a-tooltip>
      </a-col>
    </a-row>

    <a-divider class="my-4" />

    <a-table
      :loading="state.isFetching"
      :data="state.data"
      :scroll="{ x: colWidth }"
      :columns="colsAdminRole"
      :pagination="false"
    >
      <template #operate="{ record }">
        <div class="flex flex-wrap gap-2">
          <a-link @click.prevent="openModal(FormState.view, record)">Edit</a-link>
          <a-link status="danger" @click.prevent="deleteRow(record)">Delete</a-link>
        </div>
      </template>
    </a-table>

    <a-modal
      v-model:visible="state.dialogVisible"
      v-bind="ModalInit"
      :title="FormProp.title"
      @ok="submitRow"
    >
      <a-row>
        <a-col :span="12">
          <a-form ref="formRef" :model="state.formData" layout="vertical" :rules="FormProp.rules">
            <a-form-item label="Key" field="key" :disabled="!isCreate">
              <a-input
                v-model="state.formData.key"
                placeholder="key..."
                show-word-limit
                :max-length="250"
              />
            </a-form-item>
            <a-form-item label="Name" field="displayName">
              <a-input
                v-model="state.formData.displayName"
                placeholder="name..."
                show-word-limit
                :max-length="250"
              />
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="12">
          <div class="p-4">
            <p class="mb-4">Select Permission</p>
            <PermSelect
              class="w-full h-80 overflow-auto"
              :key-id="state.formData?.id"
              @change="handlePermIds"
            />
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </a-card>
</template>
