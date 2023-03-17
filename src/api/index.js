import http from '../utils/request'

// 请求首页数据
export const getData = () => {
  return http.get('/home/getData') // 返回一个promise对象
}

// 请求用户数据
export const getUser = (params) => {
  return http.get('/home/getUserList', params)
}

export const addUser = (data) => {
  return http.post('/home/addUser', data)
}

export const delUser = (data) => {
  return http.post('/home/delUser', data)
}

export const editUser = (data) => {
  return http.post('/home/editUser', data)
}

export const getMenu = (data) => {
  return http.post('/permission/getMenu', data)
}