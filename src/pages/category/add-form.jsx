// 添加分类的form组件
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Select,
    Input,

} from 'antd';
const Item = Form.Item;
const Option = Select.Option;

export default class AddForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        categories: PropTypes.array.isRequired, // 接收一级分类的数组
        parentId: PropTypes.string,   // 父分类的id
        setForm: PropTypes.func.isRequired,     // 用来传递form对象的函数
    }

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    render() {
        const {categories, parentId } = this.props;
        //console.log(parentId, categories);
        return (
            <div>
                <Form initialValues={{parentId, name:''}} ref={this.formRef}>
                    <Item name='parentId'>
                        <Select>
                            <Option key={null} value={null}>一级分类</Option>
                            {
                                categories.map(c =>  <Option key={ c._id } value={ c._id }>{ c.name }</Option>)
                            }
                        </Select>
                    </Item>
                    <Item name='name'>
                        <Input placeholder='请输入分类名称'></Input>
                    </Item>

                </Form>
            </div>
        );
    }

}
