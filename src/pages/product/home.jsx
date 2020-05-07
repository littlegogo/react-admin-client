// Product的默认子路由
import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
} from 'antd';

import {
    PlusOutlined
} from '@ant-design/icons';

import LinkButton from '../../components/link-button';
const Option = Select.Option;

export default class ProductHome extends Component {

    state = {
        products:[
            {
                status: 0,
                imgs: [
                    "image-1.jpg",
                    "image-2.jpg",
                ],
                _id:'abcdefghigklmn',
                name: '联想电脑',
                desc: 'ssss',
                price: 1111,
                pCategory: 'xxxxx',
                categoryid: 'xxxx',
                detail: 'xxxxxxxxxxxxxxxxxxxx'
            },
            {
                status: 1,
                imgs: [
                    "image-1.jpg",
                    "image-2.jpg",
                ],
                _id:'abcdefghigklmnfdsgsdfg',
                name: '联想电脑',
                desc: 'ssss',
                price: 1111,
                pCategory: 'xxxxx',
                categoryid: 'xxxx',
                detail: 'xxxxxxxxxxxxxxxxxxxx'
            }
        ]
    }

    // 初始化table列
    initColumns = ()=>{
        this.columns = [
            {
              title: '商品名称',
              dataIndex: 'name'
            },
            {
              title: '描述',
              dataIndex: 'desc',
            },
            {
              title: '价格',
              dataIndex: 'price',
              render:(price) => ("￥" + price)
            },
            {
                title: '状态',
                width: '100px',
                dataIndex: 'status',
                render:(status) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    );
                }
              },
              {
                title: '操作',
                width: '100px',
                render: (product) => (//返回需要显示的界面标签
                    <span>
                        <LinkButton >详情</LinkButton>
                        <LinkButton >修改</LinkButton>
                    </span>)
            },
          ];
    }
    componentDidMount(){
        this.initColumns();
    }

    render() {
        const { products } = this.state;
        const title = (
            <span>
                <Select value='1' style={{ width: 150 }}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 200, margin: '0 15px' }}/>
                <Button type='primary'>搜索</Button>
            </span>
        );
        const extra = (
            <Button type='primary'>
                <PlusOutlined/>
                <span>添加商品</span>
            </Button>
        );  


        return(
            <Card
                title={ title }
                extra={ extra }
            >
                <Table
                    rowKey='_id'
                    dataSource={products}
                    columns={this.columns}
                    bordered
                />
            </Card>
        );
    }
}