import React from 'react';
import { Button } from 'antd';
import './App.css';
import Topshow from './Component/TopShow';

import { 
  Layout, Menu, Breadcrumb, Icon 
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends React.Component {

  status = {
    currentPage: 0,
  };
  
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">View Assets</Menu.Item>
            <Menu.Item key="2">Upload Videos</Menu.Item>
            <Menu.Item key="3">Upload Images</Menu.Item>
          </Menu>
        </Header>

        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    Home
                  </span>
                }
              >

              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    Projects
                  </span>
                }
              >
                <Menu.Item key="5">Project 1</Menu.Item>
                <Menu.Item key="6">Project 2</Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    Notification
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Topshow />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
