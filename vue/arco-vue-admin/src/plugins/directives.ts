import type { App } from 'vue'
import { intersection } from 'lodash-es'
import { Message } from '@arco-design/web-vue'
import { useClipboard } from '@vueuse/core'
import { usePermissionStoreWithOut } from '@/store/modules/permission'

const permissionStore = usePermissionStoreWithOut()

const access: any = {
  mounted(el: any, binding: any) {
    let isExist = false
    // 从配置获取用户按钮权限
    const btnPermissions = permissionStore?.permissions || []
    const targetPerms = binding.value || []
    const res = intersection(btnPermissions, targetPerms)
    if (res.length === targetPerms.length) {
      isExist = true
    }
    // 不存在时删除节点
    if (el.parentNode && !isExist) {
      el.remove()
    }
  }
}

const copy = {
  mounted(el:any, { value }) {
    el.handel = () => {
        if(!el.$value){
          el.$value = value || ''
        }
        const copyText = el.$value
        try {
          if (!copyText) {
            Message.warning('Copied Nothing.')
            return
          }
          const { copy } = useClipboard()
          copy(copyText)
          Message.success('Copied Successfully!')
        } catch {
          Message.success('Copied Failed!')
        }
    }
    el.addEventListener('click', el.handel)
  },
  updated(el:any, { value }) {
    el.$value = value
  },
  unbind(el: HTMLElement) {
    el.removeEventListener('click', (el as any)?.handel)
  }
}

const directives = { access, copy }

export const registerDirectives = (app: App) => {
  Object.entries(directives).forEach(([k, v]) => {
    app.directive(k, v)
  })
}
