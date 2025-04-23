import axios from "axios"
import { useUserStore } from '@/stores/index'
import { ElMessage } from "element-plus"
import router from "@/router"
const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
    baseURL,
    timeout: 10000
})
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const UserStore = useUserStore()
    if(UserStore.token){
        config.headers.Authorization = UserStore.token
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if(response.data.code === 0){
       return response
    }
    ElMessage({message: response.data.message || '服务异常', type: 'error'})
    // console.log(response.data.message);
    return Promise.reject(response.data)
    // 对响应数据做点什么
    
  }, 
  function (error) {
    ElMessage({message: error.response.data.message || '服务异常', type: 'error'})  //只要错误就提示
    if(error.response.status === 401){
        router.push('/login')
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
  )
export default instance
export { baseURL }