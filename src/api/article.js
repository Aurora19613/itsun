import instance from "@/utils/request"
//获取文章分类
export const articleGetChannelInfoService = () => instance.get('/my/cate/list')
//增加文章分类
export const articleAddChannel = (data) => instance.post('/my/cate/add', data)
//修改文章分类
export const articleEditChannel = (data) => instance.put('/my/cate/info', data)
//删除文章分类
export const articleDelChannel = (id) => instance.delete('/my/cate/del',{ params: { id } })
//获取文章列表
export const articleGetManagelList = (params) => instance.get('/my/article/list',{ params })
//发布文章
export const addArticel = (data) => instance.post('/my/article/add', data)
//获取文章详细
export const articleGetInfo = (id) => instance.get('/my/article/info', { params: { id } })
//更新文章
export const articleChangeManage = (data) => instance.put('/my/article/info',data)
//删除文章
export const articleDelManage = (id) => instance.delete('/my/article/info', { params: { id } })