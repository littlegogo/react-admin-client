// 商品分类路由
import React, { Component } from 'react';
import {
    Card,
    Table,
    Button,
    message
} from 'antd';
import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api';

export default class Category extends Component {

    state = {
        categories: [],  // 一级分类列表
        subCategories:[], // 二级分类列表
        loading: false,
        parentId: null, // 当前需要显示的分类列表的父分类Id
        parentName: '', // 当前需要显示的分类列表的父分类名称

    }

    // 初始化表格列
    initColumns = ()=> {
        this.columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              width: '150px',
              render:(category) => (//返回需要显示的界面标签
                <span>
                    <LinkButton>修改</LinkButton>
                    {/* 如何向事件回调函数传递参数，先定义一个匿名函数，再函数中调用处理的函数，并传入数据 */}
                    { this.state.parentId === null ? <LinkButton onClick={()=>{ this.showSubCategories(category) }}>子分类</LinkButton> : null }
                    
                </span>)
            },
          ];
    }

    // 获取一级分类列表
    getCategories = async ()=>{

        // 在发请求前显示loading
        this.setState({ loading: true });
        // 发送请求
        const { parentId } = this.state;
        const response = await reqCategories(parentId);
        const result = response.data;
        if(result.status === 'success'){
            // 取出分类数组，可能是一级列表也可能是二级列表
            const { categories } = result;
            if(parentId === null){
                // 更新一级分类列表
                this.setState({ categories });
            } else {
                // 更新二级分类列表
                this.setState({
                    subCategories: categories
                });
            }

        } else {
            message.error(result.message);
        }

        // 结束loading
        this.setState({ loading: false });
        
    }

    //显示指定一级分类对象的二级列表
    showSubCategories = (category) => {
        // 更新状态，setState是异步更新的状态
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, ()=>{
            // 回调函数会在状态更新前且重新render后执行
            this.getCategories();
        });
    }

    // 显示一级分类列表
    showCategories = () => {
        this.setState({
            // 更新为显示一级列表状态
            parentId:null,
            parentName: '',
            subCategories:[]
        });
    }

    // 发起异步请求，请求一级分类
    componentDidMount() {
        this.initColumns();
        this.getCategories();
    }

    onChange(){

    }
    render() {

        const { categories, subCategories, parentId, parentName, loading } = this.state;

        //卡片标题
        const title = parentId === null ? '一级分类列表': (
            <span>
                <LinkButton onClick={ this.showCategories }>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ marginRight:5}}/>
                <span >{ parentName }</span>
            </span>
        )
        // Card的右侧
        const extra = (
            <Button type='primary'>
                <PlusCircleOutlined />
                添加
            </Button>
        );

        return(
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    loading={loading}
                    rowKey='_id'
                    dataSource={ parentId==null ? categories : subCategories}
                    columns={this.columns}
                    pagination= {{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        defaultPageSize: 5,
                        defaultCurrent: 1,
                        showTotal: num => `共有${num}项`,
                    }}
                />
            </Card>
        );
    }
}