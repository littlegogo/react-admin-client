import React, { Component } from 'react';
import {
  Form,
  Input,
  Button
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less';
import logo from './image/logo.png';

// 包装form组件
const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        username: 'admin'
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[
                //  声明式验证
                { required: true, message: '请输入用户名'},
                { min: 4, message: '用户名至少4位'},
                { max: 20, message: '用户名最多20位'},
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或下划线组成'}
            ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name='password'
        // 下面对密码自定义验证
        rules={[
          {
            validator:(_, value) => {
              if(!value){
                return Promise.reject('请填写密码');
              }else if(value.length < 6){
                return Promise.reject('密码最少6位');          
              } else if(/^[a-zA-Z0-9_]+$/.test(value) === false){
                return Promise.reject('密码必须是英文，数字或下划线组成');
              }

              return Promise.resolve();             
            }
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
      </Button>
      </Form.Item>
    </Form>
  );

}

// 登录的路由组件
export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="" />
          <h1>配置项测试管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <NormalLoginForm/>
        </section>
      </div>
    );
  }
}