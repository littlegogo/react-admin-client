// 入口文件
import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

import storageUtil from  './utils/storageUtil';
import memoryUtil from './utils/memoryUtil';

//----
const loadStorage = () => {
    //-------读取本地存储中的数据，保存到内存中
    const user = storageUtil.getUser();
    const token = storageUtil.getToken();

    memoryUtil.user = user;
    memoryUtil.token = token;

    console.log(memoryUtil);
}

loadStorage();
//--------将App组件标签渲染到index页面的div上
ReactDom.render(<App/>, document.getElementById('root'));

