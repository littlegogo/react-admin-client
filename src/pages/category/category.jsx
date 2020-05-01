// 商品分类路由
import React, { Component } from 'react';
import {
    Card,
    Table,
    Pagination,
    Button,
    message
} from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';
import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api';

export default class Category extends Component {

    state = {
        categories: [],
        loading: false
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
              render:() => (//返回需要显示的界面标签
                <span>
                    <LinkButton>修改</LinkButton>
                    <LinkButton>子分类</LinkButton>
                </span>)
            },
          ];
    }

    // 获取一级分类列表
    getCategories = async ()=>{

        // 在发请求前显示loading
        this.setState({ loading: true });
        // 发送请求
        const response = await reqCategories();
        const result = response.data;
        if(result.status === 'success'){
            const { categories } = result;
            this.setState({ categories });
        } else {
            message.error(result.message);
        }

        // 结束loading
        this.setState({ loading: false });
        
    }

    // 发起异步请求，请求一级分类
    componentDidMount() {
        this.initColumns();
        this.getCategories();
    }

    onChange(){

    }
    render() {

        const { categories, loading } = this.state;

        //卡片标题
        const title = '一级分类列表';
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
                    dataSource={categories}
                    columns={this.columns}
                    pagination= {{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        defaultPageSize: 2,
                        defaultCurrent: 1,
                        showTotal: num => `共有${num}项`,
                    }}
                />
            </Card>
        );
    }
}