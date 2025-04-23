import '@/assets/main.scss'
import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'   
// import ElementPlus from 'element-plus'
import '../dist/assets/index.CDUCtm_O.css' //引入了Element的样式 不然ElMessage按钮没有样式

const app = createApp(App)

app.use(pinia)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')
