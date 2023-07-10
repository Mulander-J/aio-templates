import type { App } from 'vue'
import { Icon } from '@iconify/vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

export const registerIcon = (app: App) => {
  app.use(ArcoVueIcon)
  app.component('Icon', Icon)
}
