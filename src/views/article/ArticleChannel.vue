<script setup>
import { ref } from 'vue'
import { articleGetChannelInfoService, articleDelChannel } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
// import { Edit } from '@element-plus/icons-vue/dist/types'
import ChannlEdit from './components/ChannlEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const dataList = ref([])
//定义加载变量
const loading = ref(false)
const dialog = ref()
//获取文章分类列表
const getChannelData = async () => {
    loading.value = true 
    const res = await articleGetChannelInfoService()
    console.log(res.data.data);
    dataList.value = res.data.data
    loading.value = false
}
getChannelData()
const onEditChannel = (row) => {
    dialog.value.open(row)
}
const onDelChannel = (row) => {
    ElMessageBox.confirm(
        '确认删除吗',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(async () => {
        await articleDelChannel(row.id)
        ElMessage({
        message: '删除成功',
        type: 'success'
    })
    getChannelData()
    })
    

}
const addChannel = () => {
    dialog.value.open()
}
const onSuccess = () => {
    getChannelData()
}
</script>
<template>
    <page-container title="文章分类">
        <template #button>
            <el-button type="primary" @click="addChannel">添加分类</el-button>
        </template>
       <el-table v-loading="loading" :data="dataList" style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
        <el-table-column label="操作" width="100">
            <template #default="{row}">
                <el-button
                 type="primary"
                 :icon="Edit"
                 circle
                 plain
                 @click="onEditChannel(row)"
                 ></el-button>
                <el-button 
                 type="danger"
                 :icon="Delete"
                 circle
                 plain
                @click="onDelChannel(row)"
                ></el-button>
            </template>
        </el-table-column>
        <template #empty>
            <el-empty description="没有数据"></el-empty>
        </template>
       </el-table>
       <ChannlEdit ref="dialog" @onSuccess="onSuccess"></ChannlEdit>
    </page-container>
</template>