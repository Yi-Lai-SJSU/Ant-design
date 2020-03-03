import React, { Component } from 'react';
import { Layout, Spin } from 'antd';
import ClassifyImage from './ClassifyImage';
import WrappedPredictImageSieder from './PredictImageSieder';

const {Content, Sider } = Layout;  

class PredictImage extends Component {
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
                            <WrappedPredictImageSieder 
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

export default PredictImage;

// import { Upload, Button, Icon, message } from 'antd';
// import React from "react";
// import '../App.css';

// const fileList = [];
// message.config({
//   top: 200,
//   duration: 2,
//   maxCount: 3,
// });

// class PredictImage extends React.Component {
//   handleChange = (info) => {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log("uploading");
//     }
//     if (status === 'done') {
//       message.success(`Predict class: ${info.file.response}.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   };

//   render() {
//     const props = {
//       action: 'http://localhost:8000/predict/image/',
//       listType: 'picture',
//       defaultFileList: [...fileList],
//       onChange: this.handleChange,
//     };

//     return(
//       <div style={{width:500}}>
//         <Upload {...props} >
//           <Button>
//             <Icon type="upload" /> Upload Image to Predict
//           </Button>
//         </Upload>
//       </div>
//     )
//   }
// }

// export default PredictImage;