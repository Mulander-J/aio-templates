<script setup lang="ts">
import { Message, Modal } from '@arco-design/web-vue'
import RoleSelect from './RoleSelect.vue'
import { AdminApi } from '@/api/admin'
import type { AdminUserType } from '@/api/libs/types'
import { AutoEmailSearch, FormState, ModalInit } from '@/constant'
import { calcColWidth, colsAdminUser } from '@/constant/tableCols'
import { isEmail, maxLength, required, strongPwd } from '@/constant/formRules'

defineOptions({
  name: 'AdminUser'
})

const colWidth = calcColWidth(colsAdminUser, 300)

const defaultUser = {
  email: '',
  nickname: '',
  password: 'p@55word',
  password2: 'p@55word',
  roleIds: []
}

const formRef = ref()

const state = reactive<{
  dialogVisible: boolean
  isFetching: boolean
  isUpdateing: boolean
  editMode: FormState
  formData: AdminUserType
  emailData: string[]
  data: AdminUserType[]
}>({
  dialogVisible: false,
  isFetching: false,
  isUpdateing: false,
  editMode: FormState.create,
  formData: defaultUser,
  emailData: [],
  data: []
})

const pageInfo = reactive<{
  pageSize: number
  pageNum: number
  total: number
}>({
  pageSize: 10,
  pageNum: 1,
  total: 0
})

const isCreate = computed(() => state.editMode === FormState.create)
const FormProp = computed<any>(() => {
  switch (state.editMode) {
    case FormState.create:
      return {
        title: 'Create admin user',
        rules: {
          email: [required, isEmail, maxLength(100)],
          nickname: [required],
          password: [required, strongPwd],
          password2: [
            required,
            strongPwd,
            {
              validator: (value: any, cb: any) => {
                if (value !== state.formData.password) {
                  // eslint-disable-next-line n/no-callback-literal
                  cb('Password not match')
                }
              }
            }
          ]
        }
      }
    default:
      return {
        title: 'View',
        rules: {
          email: [],
          nickname: [required],
          password: [strongPwd]
        }
      }
  }
})

const fetchData = async () => {
  if (state.isFetching) return
  try {
    state.isFetching = true
    const { pageNum, pageSize = 10 } = pageInfo
    const res: any = await AdminApi.toPage({ pageNum, pageSize })
    state.data = res.list
    pageInfo.total = res.total
  } catch {
    state.data = []
  } finally {
    state.isFetching = false
  }
}
const pageChange = (n: number) => {
  pageInfo.pageNum = n || 1
  fetchData()
}
const sizeChange = (n: number) => {
  pageInfo.pageNum = 1
  pageInfo.pageSize = n || 10
  fetchData()
}
const initFetch = () => {
  pageChange(1)
}

const ableRow = (row: any) => {
  if (state.isUpdateing) return

  const nextAble = !row.enabled
  const ableLable = nextAble ? 'Active' : 'Deregister'

  Modal.confirm({
    title: `${ableLable} this item?`,
    content: `Email: ${row.email}`,
    ...ModalInit,
    okText: 'Confirm',
    onOk: async () => {
      try {
        state.isUpdateing = true
        const res = await AdminApi.toToggle(row.id, nextAble)
        if (res) {
          Message.success(`${ableLable} Success`)
          fetchData()
        }
      } finally {
        state.isUpdateing = false
      }
    }
  })
}

const handleRoleIds = (ids: any) => {
  if (Array.isArray(ids)) {
    state.formData.roleIds = [...ids]
  } else {
    state.formData.roleIds = []
  }
}

const openModal = (editKey: FormState, row?: AdminUserType) => {
  state.editMode = editKey

  if (editKey === FormState.create) {
    state.formData = { ...defaultUser }
    state.dialogVisible = true
  } else {
    if (!row) return
    state.formData = {
      ...row,
      roleIds: (row?.roles || []).map((e: any) => e.id)
    }
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
      const isCreate = state.editMode === FormState.create
      const param = { ...state.formData }
      const roleIds = Array.from(new Set(param?.roleIds || []))

      const res = await (isCreate
        ? AdminApi.toAdd({
            email: param.email,
            password: param.password,
            nickname: param.nickname,
            roleIds
          })
        : AdminApi.doUpdate(param.id, {
            id: param.id,
            password: param.password || '',
            nickname: param.nickname || '',
            roleIds
          }))

      theForm.clearValidate()

      if (res) {
        state.dialogVisible = false
        Message.success('Success')
        fetchData()
        return true
      }
    }
    return false
  } catch (err: any) {
    Message.error(err.message || err)
    return false
  } finally {
    state.isUpdateing = false
  }
}

onMounted(() => {
  initFetch()
})
</script>

<template>
  <a-card title="Admin Management" class="general-card">
    <a-row>
      <a-col :span="12">
        <a-space>
          <a-button type="primary" @click="openModal(FormState.create)">Create</a-button>
        </a-space>
      </a-col>
      <a-col :span="12" class="flex justify-end items-center">
        <a-tooltip content="Refresh">
          <div class="ml-2" @click="initFetch"><icon-refresh size="18" /></div>
        </a-tooltip>
      </a-col>
    </a-row>

    <a-divider class="my-4" />

    <a-table
      page-position="tl"
      :scroll="{ x: colWidth }"
      :loading="state.isFetching"
      :data="state.data"
      :columns="colsAdminUser"
      :pagination="{
        total: pageInfo.total,
        current: pageInfo.pageNum,
        showTotal: true,
        showPageSize: true
      }"
      @page-change="pageChange"
      @page-size-change="sizeChange"
    >
      <template #operate="{ record }">
        <div class="flex flex-wrap gap-2">
          <a-link size="small" @click.prevent="openModal(FormState.view, record)">Edit</a-link>
          <a-link v-if="record?.enabled" status="danger" @click.prevent="ableRow(record)">
            Disable
          </a-link>
          <a-link v-else status="success" @click.prevent="ableRow(record)">Enable</a-link>
        </div>
      </template>
    </a-table>

    <a-modal
      v-model:visible="state.dialogVisible"
      v-bind="ModalInit"
      :title="FormProp.title"
      @before-ok="submitRow"
    >
      <a-row>
        <a-col :span="12">
          <a-form ref="formRef" :model="state.formData" layout="vertical" :rules="FormProp.rules">
            <a-form-item label="Email" field="email" :disabled="!isCreate">
              <a-auto-complete
                v-model="state.formData.email"
                :data="state.emailData"
                placeholder="email..."
                show-word-limit
                :max-length="100"
                @search="(v) => (state.emailData = AutoEmailSearch(v))"
              />
            </a-form-item>
            <a-form-item label="Nickname" field="nickname">
              <a-input
                v-model="state.formData.nickname"
                placeholder="nickname..."
                show-word-limit
                :max-length="250"
              />
            </a-form-item>

            <template v-if="isCreate">
              <a-form-item label="Password" field="password">
                <a-input-password v-model="state.formData.password" allow-clear />
              </a-form-item>
              <a-form-item label="Repeat Password" field="password2">
                <a-input-password v-model="state.formData.password2" allow-clear />
              </a-form-item>
            </template>

            <a-form-item
              v-else
              label="Password"
              field="password"
              extra="Enter to reset the password, or leave it unchanged"
            >
              <a-input-password v-model="state.formData.password" allow-clear />
            </a-form-item>

            <a-form-item label="Roles">
              <span v-if="(state.formData?.roles?.length || 0) <= 0" class="text-gray-400">
                No Data yet, please select roles.
              </span>
              <template v-else>
                <div class="flex gap-2">
                  <a-tag v-for="r in state.formData.roles" :key="`role__${r.id}`" color="arcoblue">
                    <div class="truncate max-w-120px">
                      {{ r.displayName }}
                    </div>
                  </a-tag>
                </div>
              </template>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="12">
          <div class="p-4">
            <p class="mb-4">Select Roles</p>
            <RoleSelect :checked="state.formData.roleIds" @change="handleRoleIds" />
          </div>
        </a-col>
      </a-row>
    </a-modal>
  </a-card>
</template>
