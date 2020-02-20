import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
import ClassifyImage from './ClassifyImage';
import UploadVideoSider from './UploadVideoSider';
import { wait } from '@testing-library/react';

const { Header, Content, Sider, Footer } = Layout;  

class UploadVideo extends Component {

    state = {
        uploadSucceed: false,
        files: [],
    }

    handleUploadSucceed = (res) => {
        console.log(this.state.files);
        this.setState({ uploadSucceed : true, files: res });
        console.log(this.state.files);
    }

    render() {
        return (
            <div>
                <Layout >
                    <Layout> 
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            { this.state.uploadSucceed ? <ClassifyImage isUpload={false} files={this.state.files}/> : <Spin />}    
                        </Content>
                        <Sider
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                color: '#f0f'
                            }}
                        >
                            <UploadVideoSider handleUploadSucceed={this.handleUploadSucceed}/>
                        </Sider>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default UploadVideo;