// 头部组件
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import LinkButton from '../link-button';
import './index.less';
import { reqWeather } from '../../api';
import { formatDate } from '../../utils/dateUtil';
import memoryUtil from '../../utils/memoryUtil';
import storageUtil from '../../utils/storageUtil';
import menuList from '../../config/menuConfig';

class Header extends Component{

    state = {
        currentTime: formatDate(Date.now()), // 当前时间字符串
        dayPictureUrl:'', // 天气图片
        weather: ''       // 天气文本
    }

    getTime = ()=>{
        this.intervalid = setInterval(() => {
            const currentTime = formatDate(Date.now());
            this.setState({currentTime});
        }, 1000);
    }

    getWeather = async() => {
        const {dayPictureUrl, weather} = await reqWeather('北京');
        this.setState({dayPictureUrl, weather});
    }

    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname;
        let title = '';
        menuList.forEach((item)=>{
            if(item.key === path) {
                title = item.title;
            } else if (item.child) {
                const citem = item.child.find(citem => citem.key === path);
                if(citem) {
                    title = citem.title;
                }
            }
        });

        return title;        
    }

    // 退出登录
    logout = ()=>{
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确认退出吗？',
            onOk: () => {
                storageUtil.removeUser();
                memoryUtil.user = {};
                this.props.history.replace('/login');
            },
            onCancel: () => {
                
            },
          });
    }
    // 第一次render之后执行，只执行一次
    // 一般在此处执行异步操作，发送ajax/启动定时器
    componentDidMount(){
        // 获取当前时间
        this.getTime();
        // 获取当前天气显示
        this.getWeather();
    }

    // 当前组件卸载之前
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalid);
    }

    render() {
        
        const { currentTime, dayPictureUrl, weather } = this.state;
        const { username } = memoryUtil.user;
        const title = this.getTitle();
        return(
            <div className='header'>
                <div className="header-top">
                <span>欢迎 【{username}】</span>
                    {/* <a href="javascript:" onClick={this.logout}>退出</a> */}
                    <LinkButton onClick={this.logout} >退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt=""></img>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(Header);