// 发送ajax请求的函数模块
// 函数返回的式Promise对象
// 1.优化：统一处理异常？
//   在层包一个自己创建的Promise对象
//   在请求出错时，不reject(error)，而是显示错误提示

import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data={}, method='GET'){
    return new Promise((reslove, reject) => {
        let promise;
        if(method === 'GET') {
            promise = axios.get(url, {
                params: data
            });
        } else if (method === 'POST') {
           promise = axios.post(url, data);
        } else if (method === 'PUT') {
            promise = axios.put(url, data);
        }else if (method === 'DELETE') {
            promise = axios.delete(url, data);
        } else {
            message.info('ajax.js unsupported request method:' + method);
        }

        promise.then(response => {
            reslove(response);
        }).catch(error => {
            message.error('请求失败了：' + error.message)
        })
    });


}