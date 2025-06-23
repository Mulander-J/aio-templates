<script lang="ts" setup>
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { LoginStateEnum, useLoginState } from '../useLogin'
import FormTitle from './form-title.vue'
import useLoading from '@/hooks/useLoading'
import { BS64Code } from '@/utils/base64'
import { BASE_HOME_PATH } from '@/router/constants'
import { useUserStore } from '@/store/modules/user'
import type { UserLoginType } from '@/api/libs/types'

const defaultConf = {
  rememberPassword: false,
  email: '',
  password: ''
}

const errorMessage = ref('')
const userStore = useUserStore()
const { getLoginState } = useLoginState()

const router = useRouter()
const { loading, setLoading } = useLoading()

const isShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

const loginConfig = useStorage('login-config', defaultConf)

const userInfo = reactive({
  email: loginConfig.value.email,
  password: loginConfig.value.password ? BS64Code.decode(loginConfig.value.password) : ''
})

const setRememberPassword = (val: boolean) => {
  loginConfig.value.rememberPassword = val
}

const handleSubmit = async ({
  errors,
  values
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) => {
  if (loading.value) return
  if (!errors) {
    setLoading(true)
    try {
      const userInfo = await userStore.login(values as UserLoginType)
      if (userInfo) {
        if (loginConfig.value.rememberPassword) {
          loginConfig.value.email = values.email
          loginConfig.value.password = BS64Code.encode(values.password)
        } else {
          loginConfig.value = defaultConf
        }

        router.replace(BASE_HOME_PATH)
      }
    } catch (error) {
      errorMessage.value = (error as Error).message
    } finally {
      setLoading(false)
    }
  }
}
</script>

<template>
  <div v-show="isShow" w-320px>
    <FormTitle />
    <div min-h-32px color-red-5 text-xl>
      {{ errorMessage }}
    </div>
    <AForm ref="loginForm" :model="userInfo" layout="vertical" @submit="handleSubmit">
      <AFormItem
        field="email"
        :rules="[{ required: true, message: 'Please input email' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <AInput v-model="userInfo.email" placeholder="email...">
          <template #prefix>
            <icon-user />
          </template>
        </AInput>
      </AFormItem>
      <AFormItem
        field="password"
        :rules="[{ required: true, message: 'Please input password' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <AInputPassword v-model="userInfo.password" placeholder="password..." allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </AInputPassword>
      </AFormItem>
      <ASpace :size="16" direction="vertical">
        <div flex justify-between>
          <ACheckbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            Remember Me
          </ACheckbox>
        </div>
        <AButton type="primary" html-type="submit" :loading="loading" long>Login</AButton>
      </ASpace>
    </AForm>
  </div>
</template>
