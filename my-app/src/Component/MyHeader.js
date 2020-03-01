import React from 'react';
import '../App.css';
import { Layout, Menu, Icon, Badge } from 'antd';
import { Row, Col } from 'antd';
import Axios from 'axios';

const { SubMenu } = Menu;
const { Header } = Layout;

class MyHeader extends React.Component {
  state = {
    current: 'home',
    projects_title: [],
    currentProject: "1",
    user_id: this.props.user_id,
  };

  initializeProject = async (user_id) => {
    let res = await Axios.get(`${process.env.REACT_APP_API_URL}/projects/?user_id=${this.state.user_id}`);
    console.log(res.data);
    let projects_title = res.data.map(current => {
      return current.title;
    })
    this.setState({projects_title: projects_title});
    console.log(this.state.projects_title);
  }

  componentDidMount() {
      var user_id = this.props.user_id;
      this.initializeProject(user_id);
  }

  handleClick = e => {
    console.log('click in myHeader', e);
    this.setState({current: e.key});
    this.props.myClick(e);
  };
  
  render() {
    // console.log(this.state.projects_title);
    const projectComponent = this.state.projects_title.map(current => {
      return (
        <Menu.Item key={current}> { current } </Menu.Item>
      )
    });

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
                      <span className="submenu-title-wrapper" key="project">
                        <Icon type="project" />
                        Projects
                      </span>
                    }
                  >
                    <Menu.Item key="add:project">Add Project</Menu.Item>
                    { projectComponent }
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
               Welcome, {this.props.username}
              </Col>
            </Row>
        </Header>
    );
  }
}

export default MyHeader;
