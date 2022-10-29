import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'

//定义mock拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/home/getUserList',user.getUserList)

Mock.mock('/api/home/addUser','post',user.createUser)

Mock.mock('/api/home/delUser','post',user. deleteUser)

Mock.mock('/api/home/editUser','post',user. updateUser)