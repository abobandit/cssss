import './assets/main.css'
import './assets/style.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css';
import App from './App.vue'
import router from './router'
const app = createApp(App)
import axios from "axios";
window.axios = axios;

app.use(createPinia())
  .use(router)
  .use(ElementPlus)

app.mount('#app')
