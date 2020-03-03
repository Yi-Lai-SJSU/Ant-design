import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
import ClassifyImage from './ClassifyImage';
import WrappedUploadVideoSider from './UploadVideoSider';

const {Content, Sider } = Layout;  

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
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                minWidth:1000,
                                width: 1000,
                                color: '#f0f'
                            }}
                        >
                            <WrappedUploadVideoSider 
                                handleUploadSucceed={this.handleUploadSucceed}
                                user_id={this.props.user_id} 
                                project={this.props.project}
                            />
                        </Content>

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
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default UploadVideo;