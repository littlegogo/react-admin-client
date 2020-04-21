// 左侧导航栏组件

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import logo from '../../assets/image/logo.png';

import { Menu, Button } from 'antd';
import {
    BarChartOutlined,
    MenuUnfoldOutlined,
    UnorderedListOutlined,
    LockOutlined,
    UserOutlined,
    AreaChartOutlined,
    HomeOutlined,
    MailOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

export default class LeftNav extends Component {

    render() {
        return (
            <div className='left-nav'>
                <Link
                    to='/'
                    className='left-nav-header'
                >
                    <img src={logo} alt='' />
                    <h1>测试管理系统</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    // inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1">
                        <Link to='/home'>
                            <HomeOutlined />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <MailOutlined />
                                <span>商品</span>
                            </span>
                        }
                    >
                        <Menu.Item key="2">
                            <Link to='/category'>
                            <UnorderedListOutlined />
                                <span>品类管理</span>  
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to='/product'>
                                <MenuUnfoldOutlined />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4">
                        <Link to='/user'>
                            <UserOutlined />
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to='/role'>
                            <LockOutlined />
                            <span>角色管理</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <AreaChartOutlined />
                                <span>图形图表</span>
                            </span>
                        }
                    >
                        <Menu.Item key="6">
                            <Link to='/chars/bar'>
                                <BarChartOutlined />
                                <span>柱状图</span>  
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to='/chars/line'>
                                <LineChartOutlined />
                                <span>折线图</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to='/chars/pie'>
                                <PieChartOutlined />
                                <span>饼状图</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}