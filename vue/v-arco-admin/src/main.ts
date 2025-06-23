import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerIcon } from '@/plugins/icons'
import { registerDirectives } from '@/plugins/directives'
import '@arco-design/web-vue/dist/arco.css'
import 'uno.css'
import '@/styles/global.less'



const app = createApp(App)
const head = createHead()
registerIcon(app)
registerDirectives(app)
app.use(head)
app.use(router)
app.use(store)
app.mount('#app')
