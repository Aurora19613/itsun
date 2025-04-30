<script setup>
import ChannlSelect from './ChannlSelect.vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import {addArticel, articleGetInfo, articleChangeManage} from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import axios from 'axios'
import { formatTime } from '@/api/format'
defineProps({
  show: Boolean
})
const formModel = ref({
    title: '',
    cate_id: '',
    content: '',
    cover_img: '',
    state: ''
})
const emit = defineEmits(['success'])
//控制抽屉的显示和隐藏
const type = ref(false)
//控制 title 是显示编辑还是添加
const id = ref('')
//接受图片地地址 并显示在浏览器中
const urlImg = ref('')
//定义是预览文章还是添加或修改文章
const open = async (row) => {
    type.value = true
    if(row.id) {
        id.value = true
        const res = await articleGetInfo(row.id)
        console.log(res.data)
        formModel.value = res.data.data
        urlImg.value = baseURL + res.data.data.cover_img
        res.data.data.cover_img = await imageUrlToFile(urlImg.value, formModel.value.cover_img)
    }else {
        urlImg.value = ''
        id.value = false
        formModel.value = {
            title: '',
            cate_id: '',
            content: '<p><br></p>',
            cover_img: '',
            state: ''
    }
    }
}
//当添加图片后触发的函数
const onChangeFile = (uploadFile) => {
    urlImg.value = URL.createObjectURL(uploadFile.raw)
    formModel.value.cover_img = uploadFile.raw
    
}
//添加文章
const addArcitle = async (text) => {
    formModel.value.state = text
    const fd = new FormData()
    for(let key in formModel.value){
        fd.append(key,formModel.value[key])
    }
    if(formModel.value.id){
        await articleChangeManage(fd)
        ElMessage.success('修改成功')
        type.value = false
        emit('success', '')
    }else{
        if(text === '已发布'){
        await addArticel(fd)
        ElMessage.success('添加成功')
        type.value = false
        emit('success','add')
    }else{
        await addArticel(fd)
        ElMessage.success('文章保存成功')
        type.value = false
        emit('success','')
    }
    }
}
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error);
    throw error;
  }
}

const showData = ref({})
const showId = ref(false)
//点击标题所会弹出的抽屉
const change = async (row) => {
  showId.value = true
  const res = await articleGetInfo(row.id)
  showData.value = res.data.data
}
//提取富文本编辑器的内容
const getPlainText = (html) => {
  const doc = new DOMParser().parseFromString(html,'text/html')
  return doc.body.textContent || ''
}
defineExpose({
    open,
    change
})
</script>
<template>
        <el-drawer
        v-model="type"
        :title="id ? '修改文章' : '添加文章'"
        direction="rtl"
        size="50%"
    >
    <el-form>
        <el-form-item label="文章标题">
            <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
            <ChannlSelect v-model="formModel.cate_id" width="100%"></ChannlSelect>
        </el-form-item>
        <el-form-item label="文章封面">
        <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="onChangeFile"
        >
        <img v-if="urlImg" :src="urlImg" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
            <div class="editor">
                <quill-editor
                    theme="snow"
                    v-model:content="formModel.content"
                    contentType="html"
                >
                </quill-editor>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addArcitle('已发布')">发布</el-button>
            <el-button type="info" @click="addArcitle('草稿')">草稿</el-button>
        </el-form-item>
    </el-form>
</el-drawer>
<el-drawer
    v-model="showId"
    title="预览文章"
    direction="rtl"
    size="50%"
  >
  <div>
    <div>
        <h3>{{ showData.title }}</h3>
    </div>
    <div>
        <span>发布时间:{{ formatTime(showData.pub_date) }}</span>
        <span style="padding-left: 10px;">文章分类:{{ showData.cate_name }}</span>
    </div>
    <hr>
    <p>
      <img :src="baseURL + showData.cover_img" alt="">
    </p>
    <div>
      <h3>{{ getPlainText(showData.content) }}</h3>
    </div>
  </div>
  </el-drawer>
</template>
<style lang="scss" scoped>
    .avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>