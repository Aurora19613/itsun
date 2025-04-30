<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { userChangePwd } from '@/api/user'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import router from '@/router'
const formRef = ref()
const pwdForm = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})
const checkOldPwd = (rule, value, cb) => {
    if(value === pwdForm.value.old_pwd){
        cb(new Error('新密码不能和原密码一样'))
    }else cb()
}
const checkNewPwd = (rule, value, cb) => {
    if(value !== pwdForm.value.new_pwd){
        cb(new Error('两次输入的密码不一致'))
    }else cb()
}
const rules = {
    old_pwd: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {pattern: /^\S{5,16}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'}
    ],
    new_pwd: [
        {required: true, message: '请输入新密码', trigger: 'blur'},
        {pattern: /^\S{5,16}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'},
        {validator: checkOldPwd, trigger: 'blur'}
    ],
    re_pwd: [
        {required: true, message: '请再次输入新密码', trigger: 'blur'},
        {pattern: /^\S{5,16}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur'},
        {validator: checkNewPwd, trigger: 'blur'}
    ]
}
const loading = ref(false)
const onSubmit = async () => {
    const boolean = await formRef.value.validate()
    if(boolean){
      loading.value = true
      await userChangePwd(pwdForm.value)
      ElMessage.success('重置成功')
      const useUser = useUserStore()
      useUser.removeToken()
      useUser.setInfo({})
      loading.value = false
      router.push('/login')
    }
}
const onReset = () => {}
</script>
<template>
    <PageContainer title="重置密码">
        <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button 
            :loading="loading" 
            @click="onSubmit" 
            type="primary"
            >修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    </PageContainer>
</template>
<style></style>