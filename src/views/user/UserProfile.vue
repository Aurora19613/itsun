<script setup>
import PageContainer from '@/components/PageContainer.vue'
// import { userGetInfoService } from '@/api/user'
import {onMounted, ref} from 'vue'
import { useUserStore } from '@/stores'
import { userChangeInfo } from '@/api/user'
import { ElMessage } from 'element-plus'
const rules = {
    nickname: [
        {required: true, message: '请输入用户昵称'}
    ],
    email: [
        {required: true, message: '请输入用户邮箱'}
    ]
}
const formModel = ref({})
onMounted(async() => {
    const res = useUserStore()
    formModel.value = res.user
    console.log(formModel.value)
})
const submit = async () => {
  await userChangeInfo(formModel.value)
  ElMessage.success('修改成功')
}
</script>
<template>
    <PageContainer title="基本资料">
        <el-row>
      <el-col :span="12">
        <el-form
          :model="formModel"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="formModel.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="formModel.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="formModel.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    </PageContainer>
</template>
<style scoped>
/* .el-form{
    margin-left: 20px;
} */
/* .el-form-item--large .el-form-item__label {
    margin-left: 5px;
    height: 40px;
    line-height: 40px;
}
.el-form-item__label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 0 0 auto;
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
} */
</style>