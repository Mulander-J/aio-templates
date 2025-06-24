import type { App } from 'vue'
import { createHead } from '@vueuse/head'
import 'virtual:svg-icons-register'
import { store } from './pinia'
import i18n from './i18n'
import initWagmi from './initWagmi'
import { copy } from './directives'

type PluginKeys = 'i18n' | 'store' | 'head' | 'wagmi'

const plugins: Array<{ name: PluginKeys, dep: any, install?: any }> = [
  { name: 'i18n', dep: i18n },
  { name: 'store', dep: store },
  { name: 'head', dep: createHead() },
  { name: 'wagmi', dep: null, install: initWagmi }
]


const directives = {
  copy
}

export const registerModule = (app: App, pick?: PluginKeys[]) => {
  //  install plugins
  plugins.forEach(p => {
    if (pick && !pick?.includes(p.name)) return

    if (p.dep) {
      app.use(p.dep)
    } else if (p.install) {
      p.install(app)
    }
  })

  //  install directives
  Object.entries(directives).forEach(([k, v]) => {
    app.directive(k, v)
  })
}
