<script setup>
import { articleGetManagelList, articleDelManage } from '@/api/article'
import { ref } from 'vue'
import {Delete, Edit} from '@element-plus/icons-vue'
import ChannlSelect from './components/ChannlSelect.vue'
import {formatTime} from '@/api/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
//发送请求时的参数
const params = ref({
    pagenum: 1,
    pagesize: 4,
    cate_id: '',
    state: ''
})
//控制加载的显示和隐藏
const loading = ref(false)
//请求参数中的页数
const total = ref(0)
const dataList = ref([])
//获取列表
const getList = async () => {
    loading.value = true
                                            //这里要写.value
    const data = await articleGetManagelList(params.value)
    dataList.value = data.data.data
    total.value = data.data.total
    loading.value = false
}
getList()
//编辑页面按钮会触发的函数
const onEditManage = (row) => {
    onarticleEdit.value.open(row)
}
//删除文章按钮会触发的函数
const onDelManage = async (row) => {
    ElMessageBox.confirm(
        '确定要删除吗',
        '温馨提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then( async() => {
      await articleDelManage(row.id)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
//当改变页面一次显示多少条数据时 触发的函数
const handleSizeChange = () => {
    params.value.pagenum = 1
    getList()
}
//当改变页数的时候 触发的函数
const handleCurrentChange = (page) => {
    params.value.pagenum = page
    getList()
}
//搜索按钮触发的函数
const onSearch = () => {
    params.value.pagenum = 1
    getList()
}
//重置按钮会触发的函数
const onReset = () => {
    params.value.pagenum = 1
    params.value.cate_id = ''
    params.value.state = ''
    getList()
}
//定位抽屉组件
const onarticleEdit = ref()
//发布文章
const addArticle = async () => {
    onarticleEdit.value.open({})
}
//监听子组件 ArticleEdit 添加成功的消息
const onSuccess = (type) => {
    if(type === 'add'){
        const data = Math.ceil((total.value + 1) / params.value.pagesize)
        params.value.pagenum  = data
    }
    getList()
}
//点击标题显示文章预览
const showManage = (row) => {
    onarticleEdit.value.change(row)
}
</script>
<template>
    <page-container title="文章管理">
        <template #button>
            <el-button type="primary" @click="addArticle">发布文章</el-button>
        </template>
        <el-form inline>
            <el-form-item label="文章分类:">
              <!--vue3中 v-model 绑定后,在子组件用 :modelValue 来接收信息,通过 @update:modelValue 来通知父组件修改了信息-->
              <ChannlSelect v-model="params.cate_id" width="200px"></ChannlSelect>
            </el-form-item>
            <el-form-item label="发布状态:">
                <el-select style="width: 200px;" v-model="params.state" placeholder="请选择">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                    <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="dataList" style="width: 100%;">
            <el-table-column prop="title" label="文章标题">
                <template #default="{row}">
                    <el-link underline="never" type="primary" @click="showManage(row)">{{ row.title }}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="cate_name" label="分类"></el-table-column>
            <el-table-column prop="pub_date" label="发表时间">
                <template #default="{row}">
                     {{ formatTime(row.pub_date) }}
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{row}">
                    <el-button
                    :icon="Edit"
                    circle
                    plain
                    type="primary"
                    @click="onEditManage(row)"
                    ></el-button>
                    <el-button
                    :icon="Delete"
                    circle
                    plain
                    type="danger"
                    @click="onDelManage(row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--size-change是每页条数改变时触发
            current-change是改变当前页时触发
        -->
        <!--分页模块-->
        <el-pagination
        v-model:current-page="params.pagenum" 
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 4, 6, 8]"
        :default-page-size="4"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
    ></el-pagination>
    <ArticleEdit ref="onarticleEdit" @success="onSuccess"></ArticleEdit>
</page-container>
</template>
