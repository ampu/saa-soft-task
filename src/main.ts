import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createBootstrap} from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import './style.scss'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(createBootstrap())

app.mount('#app')
