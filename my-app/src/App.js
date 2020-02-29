import React from 'react';
import './App.css';
import MyHeader from './Component/MyHeader';
import MySider from './Component/MySider';
import MyBreadcrumb from './Component/MyBreadcrumb';
import VideoList from './Component/VideoList';
import ModelList from './Component/ModelList';
import ViewImages from './Component/ViewImages';
import UploadImage from './Component/UploadImage';
import UploadVideo from './Component/UploadVideo';
import PredictImage from './Component/PredictImage';
import WrappedNormalLoginForm from './Component/MyLogin';
import WrappedRegistrationForm from './Component/MyRegister';
import MyLoginRegister from './Component/MyLoginRegister';
import { Row, Col, Divider } from 'antd';

import { Layout } from 'antd';
const { Content } = Layout;

class App extends React.Component {
  state = {
    headerCurrent: 'home',
    siderCurrent: '',
    breadcrumbCurrent: '',
    contentCurrent: 'home',
    username: 'Guest',
  };

  setUserName = (userName) => {
    console.log(userName);
    this.setState({username: userName})
  }

  handleHeaderClick = e => {
    this.setState({headerCurrent: e.key});
    if (e.key.includes("project", 0)) {
      this.setState({siderCurrent: e.key, contentCurrent: e.key});
    } else {
      this.setState({siderCurrent: '', contentCurrent: e.key});
    }
  };
   
  handleSiderClick = e => {
    this.setState({siderCurrent: e.key});
    this.setState({contentCurrent: e.key});
    console.log("app's current state", this.state.siderCurrent);
  }

  render() {
    let appSider = '';
    let content = '';

    if (this.state.siderCurrent !== '') {
      appSider = <MySider myClick={this.handleSiderClick} />;
    } 

    switch(this.state.contentCurrent) {
      case 'home':
        content = <div> Home </div>;
        break;
      case 'setting':
        content = <div> Setting </div>;
        break;
      case 'viewImage':
        content = <ViewImages isClassList={true}/>;
        break;
      case 'viewVideo':
        content = <VideoList />;
        break;
      case 'viewModel':
        content = <ModelList />;
        break;
      case 'uploadImages':
        content = <UploadImage isClassList={true}/>
        break;
      case 'uploadVideos':
        content = <UploadVideo />
        break;
      case 'trainModel':
        content = <div>Train Model</div>
        break;
      case 'predictModel':
        content = <PredictImage />
        break;
      case 'login':
        content = <MyLoginRegister setUserName={this.setUserName}/>
        break;
      default:
        content = <div> Project </div>
    }

    return (
      <Layout>
        <MyHeader myClick={this.handleHeaderClick}/>
        <Layout>
          {appSider}
          <Layout style={{ padding: '0 24px 24px' }}>
            <MyBreadcrumb />
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              { content }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
