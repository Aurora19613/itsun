<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import {useUserStore} from '@/stores/index'
import { userChangeAvatar } from '@/api/user'
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
const uploadRef = ref()
const useUser = useUserStore()
const loading = ref(false)
//预览图片
const imageUrl = ref(useUser.user.user_pic)
const onUploadFile = (uploadFile) => {
    const reader = new FileReader()
    reader.readAsDataURL(uploadFile.raw)
    reader.onload = () => {
        imageUrl.value = reader.result
    }
}
const change = async () => {
    loading.value = true
    await userChangeAvatar(imageUrl.value)
    useUser.getInfo()
    ElMessage.success('修改成功')
    loading.value = false
}
</script>
<template>
    <PageContainer title="更换头像">
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button 
        @click="uploadRef.$el.querySelector('input').click()"
        type="primary" 
        :icon="Plus" 
        size="large">
          选择图片
        </el-button>
        <el-button 
        type="success" 
        :icon="Upload"
        :loading="loading" 
        size="large"
        @click="change">
          上传头像
        </el-button>
      </el-col>
    </el-row>
    </PageContainer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>