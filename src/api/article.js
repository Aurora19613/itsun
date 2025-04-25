import instance from "@/utils/request"
//获取文章分类
export const articleGetChannelInfoService = () => instance.get('/my/cate/list')
//增加文章分类
export const articleAddChannel = (data) => instance.post('/my/cate/add', data)
//修改文章分类
export const articleEditChannel = (data) => instance.put('/my/cate/info', data)
//删除文章分类
export const articleDelChannel = (id) => instance.delete('/my/cate/del',{ params: { id } })