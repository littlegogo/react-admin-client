// 管理的路由组件
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import memoryUtil from '../../utils/memoryUtil';
import LeftNav from '../../components/left-vav';
import Header from '../../components/header';

// 导入二级路由
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../chars/bar';
import Line from '../chars/line';
import Pie from '../chars/pie';

// 导入antd布局组件
const {Footer, Sider, Content } = Layout;



export default class Admin extends Component {
    render () {
        
        // 如果当前内存中没有user，说明user没有登录        
        const user = memoryUtil.user;        
        if(!user || !user._id) {
            // 自动跳转到登录（在render中）
            return <Redirect to='/login'/>;
        }

        // 获取用户的token
        const token = memoryUtil.token;

        return (
            <Layout style={{height:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
              <Header>Header</Header>
              <Content style={{backgroundColor:'#fff'}}>
                  <Switch>
                      <Route path='/home' component={Home}></Route>
                      <Route path='/category' component={Category}></Route>
                      <Route path='/product' component={Product}></Route>
                      <Route path='/role' component={Role}></Route>
                      <Route path='/user' component={User}></Route>
                      <Route path='/chars/bar' component={Bar}></Route>
                      <Route path='/chars/line' component={Line}></Route>
                      <Route path='/chars/pie' component={Pie}></Route>
                      {/* 只要不是上述路由，都转到主页 */}
                      <Redirect to='/home'/>
                  </Switch>
              </Content>
              <Footer style={{textAlign:'center', color:'#ccc'}}>推荐使用谷歌浏览器，获得最佳体验</Footer>
            </Layout>
          </Layout>
        );
    }

    componentDidMount() {

    }
}