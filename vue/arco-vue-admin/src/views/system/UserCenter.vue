<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store'
import { AuthApi, PermissionApi } from '@/api/admin'
import { required, strongPwd } from '@/constant/formRules'

const filedProps = {
  key: 'id',
  title: 'displayName',
  children: 'children'
}

const _data: any = ref([])

const pwdState: any = reactive({
  oldPassword: '',
  newPassword: '',
  password2: ''
})

const pwdRule = {
  oldPassword: [required],
  newPassword: [required, strongPwd],
  password2: [
    required,
    strongPwd,
    {
      validator: (value: any, cb: any) => {
        if (value !== pwdState.newPassword) {
          // eslint-disable-next-line n/no-callback-literal
          cb('Password not match')
        }
      }
    }
  ]
}

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const avatarUrl = computed(() => userStore.getAvatarUrl || '')

const fetchData = async () => {
  try {
    const res = await PermissionApi.atCurrent()
    _data.value = res
  } catch {
    _data.value = []
  }
}

const handleReset = async (data: any) => {
  if (!data.errors) {
    const res = await AuthApi.resetPwd(pwdState)
    if (res) {
      Message.success('Success')
      userStore.logout()
    }
  }
}

onMounted(fetchData)
</script>

<template>
  <a-card title="User Center" class="general-card">
    <a-row :gutter="80">
      <a-col :span="8">
        <a-card class="mb-10" hoverable>
          <div class="userTop">
            <a-avatar class="mb-4" :size="64" :image-url="avatarUrl" />
            <section class="user-line">
              <p>
                <label>Email:</label>
                <span>{{ userInfo.email }}</span>
              </p>
              <p>
                <label>Nickname:</label>
                <span>{{ userInfo.nickname }}</span>
              </p>
              <p>
                <label>Joined:</label>
                <span>{{ userInfo.createdAt }}</span>
              </p>
            </section>
          </div>
        </a-card>
        <a-form :model="pwdState" :rules="pwdRule" layout="vertical" @submit="handleReset">
          <a-form-item label="Old Password" field="oldPassword">
            <a-input-password v-model="pwdState.oldPassword" allow-clear />
          </a-form-item>
          <a-form-item label="New Password" field="newPassword">
            <a-input-password v-model="pwdState.newPassword" allow-clear />
          </a-form-item>
          <a-form-item label="Repeat Password" field="password2">
            <a-input-password v-model="pwdState.password2" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" type="primary" status="danger">Reset Password</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="16">
        <div class="mb-4">
          <p class="mb-4">Roles</p>
          <div class="flex gap-4">
            <a-tag v-for="ro in userInfo?.roles || []" :key="ro.id" color="arcoblue" size="large">
              {{ ro.displayName }}
            </a-tag>
          </div>
          <p class="my-4">Permissions</p>
          <a-tree
            class="max-h-300 overflow-auto"
            :data="_data"
            :field-names="filedProps"
            action-on-node-click="expand"
          />
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<style lang="less" scoped>
.userTop {
  @apply flex gap-10 items-center justify-between;
  .user-line {
    @apply flex flex-col gap-4 grow;
    p {
      label {
        @apply text-gray-400 mr-4;
      }
    }
  }
}
</style>
