import { Form, Icon, Input, Button, Checkbox, Divider, message } from 'antd';
import React from 'react';
import axios from 'axios';
import '../App.css';
import { withCookies } from 'react-cookie';

class NormalLoginForm extends React.Component {
  state ={
    credentials: {
      username: '',
      password: '',
    },
  };

  showRegister = e => {
    this.props.showRegister();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await axios.post(`${process.env.REACT_APP_API_URL}/users/auth/`, values)
        .then(response => {
          this.props.cookies.set('myapp-token', response.data.token);
          this.props.cookies.set('myapp-user_id', response.data.user_id);
          this.props.cookies.set('myapp-username', response.data.username);
          window.location.href = "/app";
        }).catch(response => {
          message.error("Incorrect Password");
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <p> </p>
          <Button type="primary" htmlType="submit" className="login-form-button">
            {this.state.isLogin ? "Logout" : "Login"} 
          </Button>
          <Divider type="vertical" />
          Or <a onClick={this.showRegister}>register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default withCookies(WrappedNormalLoginForm);