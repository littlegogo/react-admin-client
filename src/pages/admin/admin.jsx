import React, { Component } from 'react';

// 管理的路由组件

import memoryUtil from '../../utils/memoryUtil';
import { Redirect } from 'react-router-dom';

export default class Admin extends Component {
    render () {        
        const user = memoryUtil.user;
        // 如果当前内存中没有user，说明user没有登录
        if(!user || !user._id) {
            // 自动跳转到登录（在render中）
            return <Redirect to='/login'/>;
        }

        const token = memoryUtil.token;
        return (
        <div>hello {user.username}, your token:{token}</div>
        );
    }
}