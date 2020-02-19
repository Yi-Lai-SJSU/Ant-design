import React from 'react';
import '../App.css';
import { 
  Layout, Menu, Icon 
} from 'antd';

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
                  External Link
                </a>
              </Menu.Item>
            </Menu>
        </Header>
    );
  }
}

export default MyHeader;
