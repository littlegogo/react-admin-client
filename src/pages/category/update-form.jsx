// 添加分类的form组件
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input,

} from 'antd';
const Item = Form.Item;


export default class UpdateForm extends Component {

    formRef = React.createRef();
    
    static propTpyes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.setForm(this.formRef.current);
    }
  
    render() {
        const { categoryName } = this.props;
        return (
            <div>
                <Form   initialValues={{categoryName}} ref={ this.formRef }>
                    <Item  name='categoryName'>
                        <Input placeholder='请输入分类名称'></Input>
                    </Item>
                </Form>
            </div>
        );
    }

}
