// 应用中所有接口请求函数的模块
// 

import ajax from './ajax';

// package.json 启用代理，解决跨域
const BASE_API="/api"; //'http://localhost:5000';

// 登录接口
export const reqLogin = (username, password) =>  ajax(BASE_API + '/login', {username, password}, 'POST');
// 添加用户
export const reqAddUser = (user) =>  ajax(BASE_API + '/register', user, 'POST');