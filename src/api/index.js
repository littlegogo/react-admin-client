// 应用中所有接口请求函数的模块
// 
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

// package.json 启用代理，解决跨域
const BASE_API="/api"; //'http://localhost:5000';

// 登录接口
export const reqLogin = (username, password) =>  ajax(BASE_API + '/login', {username, password}, 'POST');
// 添加用户
export const reqAddUser = (user) =>  ajax(BASE_API + '/register', user, 'POST');


// 请求特定分类
export const reqCategory = (id) =>  ajax(BASE_API + '/categories/'+ id, {}, 'GET');
// 请求产品分类列表
export const reqCategories = (parentId=null) =>  ajax(BASE_API + '/categories', { parentId }, 'GET');
// 添加分类
export const reqAddCategory = (parentId, name) =>  ajax(BASE_API + '/categories', { parentId, name }, 'POST');
// 更新分类
export const reqUpdateCategory = (id, parentId, name) =>  ajax(BASE_API + '/categories/'+id , { parentId, name }, 'PUT');
// 删除分类
export const reqDeleteCategory = (id) =>  ajax(BASE_API + '/categories/'+id , { }, 'DELETE');

// 请求商品分页列表
export const reqProducts = (pageNumber, pageSize) =>  ajax(BASE_API + '/products/' , { pageNumber, pageSize}, 'GET');

// 请求更新产品状态
export const reqUpdateStatus = (id, status) =>  ajax(BASE_API + '/products/updateStatus' , { id, status}, 'PUT');

// 搜索商品分页列表（根据商品名称/商品描述）
// searchType：搜索的类型，name/desc
export const reqSearchProducts = ({pageNumber, pageSize, searchName, searchType }) =>  ajax(BASE_API + '/products/' , {
    pageNumber,
    pageSize,
    [searchType]:searchName // 使用searchType的值作为属性
}, 'GET');

//jsonp 请求的接口请求函数
export const reqWeather = (city) => {

    return new Promise((reslove, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            if(!err && data.status === 'success'){
                // 取出需要的数据，天气图片和对应的天气
                const {dayPictureUrl, weather} = data.results[0].weather_data[0];
                reslove({dayPictureUrl, weather} );
            }else {
                console.log('jsonp error');
                message.error('获取天气信息失败');
            }
        });
    });
}