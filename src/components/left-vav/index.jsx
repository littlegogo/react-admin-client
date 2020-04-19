// 左侧导航栏组件

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.less';
import logo from '../../assets/image/logo.png';

import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
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
                        <PieChartOutlined />
                        <span>首页</span>
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
                        <Menu.Item key="5">
                            <PieChartOutlined />
                            品类管理
                        </Menu.Item>
                        <Menu.Item key="6">
                            <PieChartOutlined />
                            商品管理
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}