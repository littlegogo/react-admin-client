// 商品分类路由
import React, { Component } from 'react';
import {
    Card,
    Table,
    Button
} from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../components/link-button';

export default class Category extends Component {

    
    render() {

        const dataSource = [
            {
                "parentId": null,
                "_id": "5ea42848c377cd44e04e64dc",
                "name": "家用电器",
                "__v": 0
            },
            {
                "parentId": null,
                "_id": "5ea429907f827c06f8a976fe",
                "name": "电脑",
                "__v": 0
            },
            {
                "parentId": null,
                "_id": "5ea429997f827c06f8a976ff",
                "name": "图书",
                "__v": 0
            }
          ];
          
          const columns = [
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
                    rowKey='_id'
                    dataSource={dataSource}
                    columns={columns}
                />
            </Card>
        );
    }
}