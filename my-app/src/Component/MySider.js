import React from 'react';
import '../App.css';

import { 
  Layout, Menu, Icon 
} from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class MySider extends React.Component {
  state = {
    current: '',
  };

  handleClick = e => {
    console.log('click in Sider', e);
    this.props.myClick(e);
    this.setState({current: e.key});
  };
  
  render() {
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          onClick={this.handleClick} 
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="viewAssets" title={<span> <Icon type="read" /> View Assets</span>}>
            <Menu.Item key="viewImage">
              <Icon type="file-jpg" />
              View Images
            </Menu.Item>
            <Menu.Item key="viewVideo">
              <Icon type="video-camera" />
              View Vedios
            </Menu.Item>
            <Menu.Item key="viewModel">
              <Icon type="check-circle" />
              View Models
            </Menu.Item>
          </SubMenu>

          <SubMenu key="uploadAssets" title={<span> <Icon type="cloud-upload" /> Upload Assets</span>}>
            <Menu.Item key="uploadImages">
              <Icon type="file-jpg" />
              Upload Images
            </Menu.Item>
            <Menu.Item key="uploadVideos">
              <Icon type="video-camera" />
              Upload Videos
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Model" title={<span> <Icon type="export" /> Model</span>}>
            <Menu.Item key="trainModel">
              <Icon type="clock-circle" />
              Train Model
            </Menu.Item>
            <Menu.Item key="predictModel">
              <Icon type="check-circle" />
              Predict Image
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default MySider;
