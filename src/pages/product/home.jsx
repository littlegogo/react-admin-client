// Product的默认子路由
import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    message,
} from 'antd';

import {
    PlusOutlined
} from '@ant-design/icons';

import LinkButton from '../../components/link-button';

import {reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api';
import {PRODUCT_PAGE_SIZE} from '../../utils/constants';


const Option = Select.Option;

export default class ProductHome extends Component {

    state = {
        total: 0, // 商品总数量
        products:[], // 商品的数组
        loading: false, // 表格是否在加载数据中
        searchName: '', // 搜索的关键字
        searchType: 'name', // 默认根据名称进行搜索
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
                //dataIndex: 'status',
                render:(product) => {
                    const {status, _id, name }= product;
                    return (
                        <span>
                            <Button 
                                type='primary'
                                onClick={()=>{this.updateStatus(_id, name, status ===1 ? 0 : 1)}}
                            >
                                {status===1? '下架':'上架'}
                            </Button>
                            <span>{status===1? '在售':'已下架'}</span>
                        </span>
                    );
                }
              },
              {
                title: '操作',
                width: '100px',
                render: (product) => (//返回需要显示的界面标签
                    <span>
                        {/* 讲product作为state对象传递给目的路由组件 */}
                        <LinkButton onClick={()=>{this.props.history.push('/product/detail', {product})}}>详情</LinkButton>
                        <LinkButton >修改</LinkButton>
                    </span>)
            },
          ];
    }

    // 获取指定页码的列表数据显示
    getProducts = async (pageNumber, pagesize) => {
        // 保存当前的页码，让其它方法可以看到
        this.pageNumber = pageNumber;

        this.setState({
            loading: true
        });

        const {searchName, searchType} = this.state;
        let result;
        // 如果搜索关键字有值，说明要做搜索分页
        if(searchName) {
            result = await reqSearchProducts({
                pageNumber,
                pageSize: PRODUCT_PAGE_SIZE,
                searchType,
                searchName
            });
        } else {// 一般分页
            result = await reqProducts(pageNumber, PRODUCT_PAGE_SIZE);
        }
       
        if(result.data.status === 'success') {
            // 取出分页数据，更新状态，显示分页列表
            const { total, products } = result.data;
            this.setState({
                total,
                products
            });

            this.setState({
                loading: false
            });
        } else {
            message.error('请求商品列表失败');
        }
    }

    // 更新指定商品的状态
    updateStatus = async (id, productName, status)=>{
        const result = await reqUpdateStatus(id, status);
        if(result.data.status === 'success') {
            message.success(`更新${productName}状态成功`);
            this.getProducts(this.pageNumber, PRODUCT_PAGE_SIZE);
        } else {
            message.error(`更新${productName}状态失败`);
        }
    }


    componentDidMount(){
        this.initColumns();
        this.getProducts(1, PRODUCT_PAGE_SIZE);
    }

    render() {
        const { products, total, loading, searchName, searchType } = this.state;
        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 150 }}
                    onChange={value => this.setState({searchType: value})}
                >
                    <Option value='name'>按名称搜索</Option>
                    <Option value='desc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    value={searchName}
                    onChange={event => this.setState({searchName: event.target.value})}
                    style={{ width: 200, margin: '0 15px' }}/>
                <Button
                    type='primary'
                    onClick={()=>{this.getProducts(1, PRODUCT_PAGE_SIZE)}}
                >
                    搜索
                </Button>
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
                    pagination={{   
                        loading: loading,                     
                        showSizeChanger: true,
                        showQuickJumper: true,
                        total: total,
                        defaultPageSize: PRODUCT_PAGE_SIZE,
                        defaultCurrent: 1,
                        showTotal: num => `共有${num}项`,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        );
    }
}