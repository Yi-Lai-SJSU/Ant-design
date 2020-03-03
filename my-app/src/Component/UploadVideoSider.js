// import { Upload, Button, Icon, message } from 'antd';
// import reqwest from 'reqwest';
import axios from 'axios';

import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
    message
} from 'antd';

const { Option } = Select;


class UploadVideoSider extends React.Component {
    state = {
        modelList: [],
        uploading: false,
    }

   handleSubmit =  (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let formData = new FormData();
                console.log(values.select);
                formData.append("model", values.select);
                formData.append("interval", values.number);
                formData.append("file",values.upload[0].originFileObj);
                // http://axios-js.com/zh-cn/docs/index.html
                console.log(formData);
                let res = await axios.post(`${process.env.REACT_APP_API_URL}/videos/?user_id=${this.props.user_id}&project_title=${this.props.project}`, formData);
                message.success("Upload Model Success!")
                console.log(res); 
                this.setState({ uploading: false });
                console.log(res);
                this.props.handleUploadSucceed(res.data);
            }
        });
    };
    
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    async componentDidMount() {
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/models/?user_id=${this.props.user_id}&project_title=${this.props.project}`);
        let models = res.data.map ( current => {
            return <Option value={current.title}>{current.title}</Option>
        })
        console.log(models);
        this.setState({modelList: models});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <Form.Item label="Upload .mp4 file">
                    <span className="ant-form-text">Please Select Intervels for frames-cutting and Models for Pre-predict</span>
                </Form.Item>

                <Form.Item label="Model" hasFeedback>
                    {getFieldDecorator('select', {
                        rules: [{ required: true, message: 'Please select your Model!' }],
                    })(
                        <Select placeholder="Please select a country">
                            {this.state.modelList}
                        </Select>
                    )}
                </Form.Item>
        
                <Form.Item label="Input Interval">
                    {getFieldDecorator('number', { initialValue: 500 })(<InputNumber min={100} max={2000} />)}
                    <span className="ant-form-text"> /ms</span>
                </Form.Item>
        
                <Form.Item label="Upload">
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" /> Click to upload
                        </Button>
                        </Upload>,
                    )}
                </Form.Item>
        
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
    // state = {
    //     fileList: [],
    //     uploading: false,
    // };

    // handleUpload = () => {
    //     const { fileList } = this.state;
    //     const formData = new FormData();
    //     fileList.forEach(file => {
    //         formData.append('video', file);
    //     });

    //     this.setState({
    //         uploading: true,
    //     });

    //     // You can use any AJAX library you like
    //     reqwest({
    //         url: `http://localhost:8000/videos/?user_id=${this.props.user_id}&project_title=${this.props.project}`,
    //         method: 'post',
    //         processData: false,
    //         data: formData,
    //         success: (res) => {
    //             message.success('upload successfully.');
    //             this.setState({ fileList: [], uploading: false});
    //             console.log(res);
    //             this.props.handleUploadSucceed(res);
    //         },
    //         error: () => {
    //             this.setState({uploading: false});
    //             message.error('upload failed.');
    //         },
    //     });
    // };

    // render() {
    //     const { uploading, fileList } = this.state;

    //     const props = {
    //         onRemove: file => {
    //             this.setState(state => {
    //                 const index = state.fileList.indexOf(file);
    //                 const newFileList = state.fileList.slice();
    //                 newFileList.splice(index, 1);
    //                 return {
    //                     fileList: newFileList,
    //                 };
    //             });
    //         },

    //         beforeUpload: file => {
    //             this.setState(state => ({
    //                 fileList: [...state.fileList, file],
    //             }));
    //             return false;
    //         },
    //         fileList,
    //     };

    //     return (
    //         <div>
    //             <Upload {...props}>
    //             <Button>
    //                 <Icon type="upload" /> Select File
    //             </Button>
    //             </Upload>
    //             <Button
    //                 type="primary"
    //                 onClick={this.handleUpload}
    //                 disabled={fileList.length === 0}
    //                 loading={uploading}
    //                 style={{ marginTop: 16 }}
    //                 >
    //             {uploading ? 'Uploading' : 'Start Upload'}
    //             </Button>
    //         </div>
    //     );
    // }
}

const WrappedUploadVideoSider = Form.create({ name: 'validate_other' })(UploadVideoSider);

export default WrappedUploadVideoSider;