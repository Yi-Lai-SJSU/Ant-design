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
import AddProjectForm from './Component/AddProjectForm';
import WrappedUploadModels from './Component/UploadModel';

import { withCookies } from 'react-cookie';
import { Layout } from 'antd';
import Axios from 'axios';
const { Content } = Layout;

class App extends React.Component {

  state = {
    headerCurrent: 'home',
    siderCurrent: '',
    breadcrumbCurrent: '',
    contentCurrent: 'home',
    token: this.props.cookies.get('myapp-token'),
    user_id: this.props.cookies.get('myapp-user_id'),
    username: this.props.cookies.get('myapp-username'),
    current_project: 'Home',
  };

  componentDidMount() {
    if (this.state.token) {
      console.log(this.state.user_id);
    } else {
      window.location.href = '/';
    }
  }

  setUserName = (userName) => {
    console.log(userName);
    this.setState({username: userName});
  }

  handleHeaderClick = e => {
    this.setState({headerCurrent: e.key});
    console.log("*******", e.key);
    if (e.key.includes("Project", 0)) {
      console.log("valid project click");
      this.setState({
        siderCurrent: e.key, 
        contentCurrent: e.key,
        current_project: e.key,
      });
    } else {
      console.log("invalid project click");
      this.setState({
        siderCurrent: '', 
        contentCurrent: e.key,
        current_project: e.key,
      });
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log(this.state);
    }
  };
   
  handleSiderClick = e => {
    console.log("e.key:", e.key);
    this.setState({siderCurrent: e.key});
    this.setState({contentCurrent: e.key});
    console.log("app's current state", this.state.siderCurrent);
  }

  automatic_jump = e => {
    console.log(e);
    console.log("Automatic jump");
    this.handleHeaderClick(e);
  };

  render() {
    let appSider = '';
    let content = '';

    if (this.state.siderCurrent !== '') {
      appSider = <MySider myClick={this.handleSiderClick} />;
    } 

    console.log("what is wrong?")

    switch(this.state.contentCurrent) {
      case 'home':
        content = <div> Home </div>;
        break;
      case 'setting':
        content = <div> Setting </div>;
        break;
      case 'viewImage':
        content = <ViewImages isClassList={true} user_id={this.state.user_id} project={this.state.current_project}/>;
        break;
      case 'viewVideo':
        content = <VideoList user_id={this.state.user_id} project={this.state.current_project}/>;
        break;
      case 'viewModel':
        content = <ModelList user_id={this.state.user_id} project={this.state.current_project}/>;
        break;
      case 'uploadImages':
        console.log("what is wrong?");
        content = <UploadImage isClassList={true} user_id={this.state.user_id} project={this.state.current_project}/>
        break;
      case 'uploadVideos':
        content = <UploadVideo user_id={this.state.user_id} project={this.state.current_project}/>
        break;
      case 'uploadModels':
        content = <WrappedUploadModels user_id={this.state.user_id} project={this.state.current_project}/>
        break;
      case 'trainModel':
        content = <div>Train Model</div>
        break;
      case 'predictModel':
        content = <PredictImage user_id={this.state.user_id} project={this.state.current_project}/>
        break;
      case 'login':
        content = <div> Status </div>
        break;
      case 'add:project':
        content = <AddProjectForm user_id={this.state.user_id} automatic_jump={this.automatic_jump}/>
        break;
      default:
        content = <div> Project </div>
    }

    return (
      <Layout>
        <MyHeader myClick={this.handleHeaderClick} 
                  user_id={this.state.user_id} 
                  username={this.state.username}
        />
        <Layout>
          {appSider}
          <Layout style={{ padding: '0 24px 24px' }}>
            <MyBreadcrumb current_project={this.state.current_project}/>
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

export default withCookies(App);
