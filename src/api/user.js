import instance from "@/utils/request"
//注册接口
export const userRegisterService = ({username, password, repassword}) => 
    instance.post('/api/reg',{username, password, repassword})
//登录接口
export const userLoginService = ({username, password}) => 
    instance.post('/api/login',{username, password})
//获取用户的基本信息
export const userGetInfoService = () => instance.get('/my/userinfo')