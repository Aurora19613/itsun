import '@/assets/main.scss'
import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import { QuillEditor } from '@vueup/vue-quill'   
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// import '../dist/assets/index-C5WyVui3.css' //引入了Element的样式 不然ElMessage按钮没有样式
// import 'element-plus/dist/index.css'
const app = createApp(App)
app.component('QuillEditor', QuillEditor)
app.use(pinia)
app.use(router)
app.mount('#app')
