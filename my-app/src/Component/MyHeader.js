import React from 'react';
import '../App.css';
import { Layout, Menu, Icon, Badge } from 'antd';
import { Row, Col } from 'antd';

const { SubMenu } = Menu;
const { Header } = Layout;

class MyHeader extends React.Component {
  state = {
    current: 'home'
  };

  handleClick = e => {
    console.log('click in myHeader', e);
    this.setState({current: e.key});
    this.props.myClick(e);
  };
  
  render() {
    return (
        <Header className="header">
            <div className="logo" />
            <Row>
              <Col span={15} push={0}>
                <Menu 
                  theme = "dark"
                  mode="horizontal"
                  defaultSelectedKeys={['home']}
                  onClick={this.handleClick} 
                  selectedKeys={[this.state.current]} 
                  style ={{lineHeight:'64px'}}
                >
                  <Menu.Item key="home">
                    <Icon type="home" /> Home
                  </Menu.Item>
                  <SubMenu
                    title={
                      <span className="submenu-title-wrapper">
                        <Icon type="project" />
                        Projects
                      </span>
                    }
                  >
                    <Menu.Item key="project:1">Project 1</Menu.Item>
                    <Menu.Item key="project:2">Project 2</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="setting">
                    <Icon type="setting" />
                    Setting
                  </Menu.Item>
                  <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                      <Icon type="link" />
                      External Link
                    </a>
                  </Menu.Item>
                  <Menu.Item key="notification">
                    <Badge dot>
                      <Icon type="notification" />
                    </Badge>
                  </Menu.Item>
                  <Menu.Item key="login">
                    <Icon type="login" />
                    Login
                  </Menu.Item>
                </Menu>
              </Col>
              <Col span={8} push={6} style={{color:"white"}}>
               What's wrong?
              </Col>
            </Row>
        </Header>
    );
  }
}

export default MyHeader;
