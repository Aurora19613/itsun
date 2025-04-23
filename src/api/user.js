import instance from "@/utils/request"
export const userRegisterService = ({username, password, repassword}) => 
    instance.post('/api/reg',{username, password, repassword})
export const userLoginService = ({username, password}) => 
    instance.post('/api/login',{username, password})