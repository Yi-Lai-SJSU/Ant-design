import { Form, Icon, Input, Button, Checkbox, Divider, message } from 'antd';
import React from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom';
import '../App.css';
// import 'whatwg-fetch'

class NormalLoginForm extends React.Component {
  state ={
    credentials: {
      username: '',
      password: '',
    },
    isLogin: false,
  };

  showRegister = e => {
    this.props.showRegister();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // this.setState({...this.state.credentials, username: values.username});
        // this.setState({...this.state.credentials, password: values.password});
        // console.log("******************************");
        // console.log(this.state.credentials);
        
        // fetch('http://127.0.0.1:8000/user/login',{
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify(values)
        // }).then(resp => {
        //   console.log(resp.json());
        // })
        // .then( res => {
        //   console.log(res);
        //   console.log("**********************");
        // });

        // Making React and Django play well together - the “single page app” model
        // https://fractalideas.com/blog/making-react-and-django-play-well-together-single-page-app-model/
        await axios.post('http://127.0.0.1:8000/user/login', values, {withCredentials: true})
        .then(response => {
          console.log(response);
          console.log(response.headers["set-cookie"]);
          this.props.setUserName(response.data);
          this.setState({isLogin: true});
          message.success("Login suceed!");
        }).catch(response => {
          console.log("error");
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
export default WrappedNormalLoginForm;