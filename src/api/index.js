import http from '../utils/request'

//请求首页数据
export const getData = () => {
    return http.get('/home/getData') //返回一个promise对象
}