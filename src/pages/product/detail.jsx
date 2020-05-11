// Product的详情子路由
import React, { Component } from 'react';
import {
    Card,
    List,
} from 'antd';

import {
    ArrowLeftOutlined
} from '@ant-design/icons';

import LinkButton from '../../components/link-button';
import {STATIC_RESOURCE_URL} from '../../utils/constants'
import { reqCategory } from '../../api';

export default class ProductDetail extends Component {

    state = {
        cName1: '', // 一级分类名称
        cName2: ''  // 二级分类名称
    }


    async componentDidMount() {
        // 得到当前商品的分类id        
        const {pCategory, categoryid} =  this.props.location.state.product;
        console.log(pCategory, categoryid)

        if(pCategory === null){
            // 一级分类下的商品
           const result =  await reqCategory(categoryid);
           const cName1 = result.data.category.name;
           this.setState({cName1});
        } else {
            // 通过多个await发送多个请求：后面的请求是在前面的请求成功之后才发送
            // const result1 =  await reqCategory(pCategory);
            // const result2 = await reqCategory(categoryid);
            // const cName1 = result1.data.category.name;
            // const cName2 = result2.data.category.name;

            // 一次性发送多个请求,只有都成功才处理
            const results = await Promise.all([
                reqCategory(pCategory),
                reqCategory(categoryid)
            ]);

            const cName1 = results[0].data.category.name;
            const cName2 = results[1].data.category.name;
            this.setState({cName1, cName2});
        }
        
    }

    render() {

        console.log(this.props.location.state)
        // 读取传递过来的state对象数据
        const {name, desc, price, detail, imgs} = this.props.location.state.product;
        const {cName1, cName2} = this.state;

        const title = (
            <span>
                <LinkButton onClick={()=> {this.props.history.goBack()}}>
                    <ArrowLeftOutlined
                        style={{ marginRight: '2px', fontSize: '15px' }}
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        );
        return(
            <Card
                className='product-detail'
                title={title}
            >
                <List>
                    <List.Item>
                        <div>
                            <span className='left' style={{ width: '25%' }}>商品名称:</span>
                            <span >{name}</span>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div>
                            <span className='left'>商品描述:</span>
                            <span>{desc}</span>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div>
                            <span className='left'>商品价格:</span>
                            <span>{price}</span>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div>
                            <span className='left'>所属分类:</span>
                            <span>{cName1}{cName2? '-->' + cName2 : ''}</span>
                        </div>

                    </List.Item>
                    <List.Item>
                        <div>
                            <span className='left'>商品图片:</span>
                            <span>
                                {
                                    imgs.map(img => (
                                        <img
                                            key={img}
                                            src={STATIC_RESOURCE_URL + img}
                                            className='product-img'
                                            alt='图片吧'
                                        />
                                    ))
                                }
                                
                            </span>
                        </div>

                    </List.Item>
                    <List.Item>
                        <div>
                            <span className='left'>商品详情 :</span>
                            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                        </div>
                    </List.Item>
                </List>

            </Card>
        );
    }
}