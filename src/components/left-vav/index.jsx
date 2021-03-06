// 左侧导航栏组件

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig';
import './index.less';
import logo from '../../assets/image/logo.png';
import { Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MailOutlined,
} from '@ant-design/icons';


const { SubMenu } = Menu;

 class LeftNav extends Component {

    constructor(props) {
        super(props);
        this.menuNodes = this.getMenuNodes_map(menuList);
    }

    // 根据数据生成菜单节点
   getMenuNodes_map = (menuList) => {

       // 获取到当前的路由
       const path = this.props.location.pathname;

       return menuList.map(item => {
           if(! item.child) {
               return(
                    <Menu.Item key={item.key}>
                        <Link to={ item.key}>                            
                            <MenuUnfoldOutlined/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
               );
           } else {

               const citem = item.child.find(citem => path.indexOf(citem.key) === 0);
               if(citem){
                   this.openKey = item.key;
               }
                 
               return(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <MailOutlined />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                    {
                        // 递归调用
                        this.getMenuNodes_map(item.child)
                    }
                </SubMenu>
               );
           }
       });
    }

    getMenuNodes_reduce = (menuList) => {
        menuList.reduce((pre, item) => {
            // 向pre中添加Menu.Item或者SubMenu
            if(item.child){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>                            
                            <MenuUnfoldOutlined/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ));
            } else {
                pre.push((
                    <SubMenu
                    key={item.key}
                    title={
                        <span>
                            <MailOutlined />
                            <span>{item.title}</span>
                        </span>
                    }
                >
                {
                    // 递归调用
                    this.getMenuNodes_map(item.child)
                }
            </SubMenu>
                ));
            }
            return pre;
        },[]);
    }

    render() {

        //得到当前请求的路由路径
        let path = this.props.location.pathname;
        if(path.indexOf('/product')===0){
            path = '/product'
        }
        // 得到当前需要打开菜单项的key
        const openKey = this.openKey;

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
                    // 根据路由选中导航菜单项
                    selectedKeys={[path]}
                    // 设置展开的菜单项
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    // inlineCollapsed={this.state.collapsed}
                >
                    {
                        // 根据数据动态生成导航栏的菜单项
                        this.menuNodes
                    }
                </Menu>
            </div>
        );
    }
}

// withRouter高阶组件，包装非路由组件，返回一个新的组件，新的组件向非路由组件
// 传递三个属性，history/location/mathc
// 将LeftNav组件包装为路由组件
export default withRouter(LeftNav);