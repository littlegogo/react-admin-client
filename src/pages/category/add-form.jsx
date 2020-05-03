// 添加分类的form组件
import React, { Component } from 'react';
import {
    Form,
    Select,
    Input,

} from 'antd';
const Item = Form.Item;
const Option = Select.Option;

// import {
//     Card,
//     Table,
//     Button,
//     message,
//     Modal,
// } from 'antd';
// import { PlusCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
// import LinkButton from '../../components/link-button';
// import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api';

export default class AddForm extends Component {

    render() {
        return (
            <div>
                <Form>
                    <Item>
                        <Select defaultValue='0'>
                            <Option value='0'>一级分类</Option>
                            <Option value='1'>电脑</Option>
                            <Option value='2'>图书</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Input placeholder='请输入分类名称' defaultValue=''></Input>
                    </Item>

                </Form>
            </div>
        );
    }

}
