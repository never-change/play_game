import React, { Component } from 'react';

import { Form, Icon, Input, Button } from 'antd';


const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const params = {...values};
        this.props.login(params);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('login') && getFieldError('login');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form onSubmit={this.handleSubmit} className='LoginForm'>
        <h3 style={{ padding: "30px 0px" }}>牌手登陆</h3>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('login', {
            rules: [{ required: true, message: 'Please input your login!' }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="Login" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(LoginForm);
export default Login;