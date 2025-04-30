import instance from "@/utils/request"
//注册接口
export const userRegisterService = ({username, password, repassword}) => instance.post('/api/reg',{username, password, repassword})
//登录接口
export const userLoginService = ({username, password}) => instance.post('/api/login',{username, password})
//获取用户的基本信息
export const userGetInfoService = () => instance.get('/my/userinfo')
//更新用户的基本信息
export const userChangeInfo = (data) => instance.put('my/userinfo',data)
//更新头像
export const userChangeAvatar = (avatar) => instance.patch('/my/update/avatar', {avatar})
//重置密码
export const userChangePwd = (data) => instance.patch('/my/updatepwd',data)