import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less';
import logo from '../../assets/image/logo.png';
import { reqLogin } from '../../api';
import { withRouter, Redirect } from 'react-router-dom';
import memoryUtil from '../../utils/memoryUtil';
import storageUtil from '../../utils/storageUtil';

// 包装form组件
const NormalLoginForm = (props) => {

  const onFinish = async (values) => {

    // 解构赋值
    const { username, password } = values;
    const response = await reqLogin(username, password);
    const result = response.data;
    if(result.status === 1){
        message.success('登录成功');
        
        const {user, token} = result;
        // 保存到内存当中当前的用户信息
        memoryUtil.user = user;
        memoryUtil.token = token;

        // 保存到本地存储
        storageUtil.saveUser(user);
        storageUtil.saveToken(token);
        
        // 跳转到后台管理界面
        props.history.replace('/');
    } else {
      message.error(result.message);
    }
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
              }else if(value.length < 5){
                return Promise.reject('密码最少5位');          
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

// 使NormalLoginForm组件可以访问路由
const LoginForm = withRouter(NormalLoginForm);

// 登录的路由组件
export default class Login extends Component {
  render() {

    // 如果用户已经登录，跳转到管理界面
    const user = memoryUtil.user;
    if(user && user._id) {
      return <Redirect to='/'/>;
    }

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="" />
          <h1>配置项测试管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <LoginForm/>
        </section>
      </div>
    );
  }
}