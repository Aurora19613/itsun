import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'
// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token
    const user = ref({}) // 用于接收用户信息
    const getInfo = async () => { // 请求用户数据
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const removeToken = () => token.value = ''
    const setInfo = (obj) => user.value = obj
    return { 
      token, 
      setToken, 
      user, 
      getInfo,
      removeToken,
      setInfo
    }
  },
  {
    persist: true // 持久化
  }
)