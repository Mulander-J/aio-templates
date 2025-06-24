import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { registerModule } from './modules'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'

const app = createApp(App)

app.use(router)
registerModule(app)
app.mount('#app')
