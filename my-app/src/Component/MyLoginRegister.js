import React from 'react';
import WrappedNormalLoginForm from './MyLogin';
import WrappedRegistrationForm from './MyRegister';
import { Divider, Row, Col } from 'antd';

class MyLoginRegister extends React.Component {
    state = {
        isRegister: false,
        isLogin: false
    }

    setIsLogin = () => {
        this.setState({isLogin: true});
    }

    showRegister = () => {
        console.log("Set state isRefister to True");
        this.setState({isRegister: true});
    }

    render() {
        if (this.state.isLogin) {
            return (
                <div>Already Login in!</div>
            )
        } else {
            return (
                <div>
                <Divider />
                <Row>
                  <Col span={6} push={2}><WrappedNormalLoginForm 
                                                setUserName={this.props.setUserName}
                                                showRegister={this.showRegister} 
                                                setIsLogin={this.setIsLogin}
                                         /></Col>
                  <Divider type="vertical" />
                  {this.state.isRegister ? <Col span={15} push={2}><WrappedRegistrationForm /></Col> : null}
                </Row>
                <Divider />
              </div>
            )
        }
    }
}

export default MyLoginRegister;