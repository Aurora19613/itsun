<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores'

const isRegister = ref(false)
//定义属性 接收表单中的值 在ElEMent-plus中，表单必须要绑定了四个值(:model :rules v-model prop)才能输入值
const formModel = ref({
    username: '',
    password: '',
    repassword: ''
})
//定义规则 表单中的内容必须要符合规则
const rules = {
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur'}
    ],
    password:[
      {required: true, message: '请输入密码', trigger: 'blur'},
      {pattern: /^\S{5,16}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'}
    ] ,
    repassword:[
      {required: true, message: '请再次输入密码', trigger: 'blur'},
      {pattern: /^\S{5,16}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'},
      {
        validator: (rule, value, callback) => {
          if (value !== formModel.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
      }    
    ]
}
//定义一个form 用于收集登录或者注册的表单内容
//用ref="form"来绑定对应表单域
const form = ref()
const register = async () => { //在async修饰的函数内 await获取Promise对象‘成功状态’的结果值 
  //validate用于对表单内容进行验证，返回一个Promise
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  setTimeout(() => {
    isRegister.value = false
  },1500)
}
//监听isRegister 当值变化则说明注册成功 就将注册表单的内容清空
watch(isRegister,() => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  const useUser = useUserStore()
  useUser.setToken(res.data.token)
  ElMessage({
    message: '登陆成功',
    type: 'success',
  })
  setTimeout(() => {
    router.push('/')
  }, 1500)
}
</script>
<template>  
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>