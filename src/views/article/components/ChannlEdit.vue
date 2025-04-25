<script setup>
import { ref } from 'vue'
import { articleAddChannel,articleEditChannel } from '@/api/article'
import { ElMessage } from 'element-plus'
import { defineEmits } from 'vue'
const emit = defineEmits(['onSuccess'])
const dialogFormVisible = ref(false)
const formModel = ref({
    cate_name: '',
    cate_alias: ''
})
const rules = {
    cate_name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur'},
        { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位非空字符', trigger: 'blur'}
    ],
    cate_alias: [
    { required: true, message: '分类别名不能为空', trigger: 'blur'},
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur'}
    ]
}
const open = (obj) => {
    dialogFormVisible.value = true
    formModel.value = {...obj}
}
const formRef = ref()
const add = async () => {
    await formRef.value.validate()
    formModel.value.id ?
    await articleEditChannel(formModel.value)
    : await articleAddChannel(formModel.value)
    ElMessage({
        message: formModel.value.id ? '编辑成功' : '添加成功',
        type: 'success'
    })
    dialogFormVisible.value = false
    emit('onSuccess')
}
defineExpose({
    open
})
</script>
<template>
    <el-dialog v-model="dialogFormVisible" :title="formModel.id ? '编辑分类': '添加分类'" width="30%">
        <el-form ref="formRef" :model="formModel" :rules="rules">
        <el-form-item prop="cate_name" label="分类名称" label-width="100">
            <el-input v-model="formModel.cate_name"></el-input>
        </el-form-item>
        <el-form-item prop="cate_alias" label="分类别名" label-width="100">
            <el-input v-model="formModel.cate_alias"></el-input>
        </el-form-item>
         </el-form>
         <template #footer>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="add">确定</el-button>
        </template>
       </el-dialog>
       
</template>