import axios from 'axios';
import React from 'react';
import {
    Form,
    Select,
    InputNumber,
    Button,
    Upload,
    Icon,
    message
} from 'antd';

const { Option } = Select;

class PredictImageSider extends React.Component {

    state = {
        modelList: [],
        uploading: false,
        fileList: []
    }

    handleSubmit =  (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let formData = new FormData();
                console.log(values.select);
                formData.append("model", values.select);
                for (let i = 0; i < values.dragger.length; i++) {
                    console.log("index:" + i);
                    formData.append('files', values.dragger[i].originFileObj);
                }
                // http://axios-js.com/zh-cn/docs/index.html
                console.log(formData);
                let res = await axios.post(`${process.env.REACT_APP_API_URL}/images/predict/?user_id=${this.props.user_id}&project_title=${this.props.project}`, formData);
                message.success("Upload Images Success!")
                console.log(res); 
                console.log("*********************************");
                let e = {
                    fileList: []
                }

                this.normFile(e);
                this.setState({ uploading: false });
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
                <Form.Item label="Upload Images">
                    <span className="ant-form-text">Please Select Models for Pre-predict</span>
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

                <Form.Item label="Dragger">
                    {getFieldDecorator('dragger', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload.Dragger name="files" action="/upload.do" multiple="true">
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>,
                    )}
                </Form.Item>

                {/* <Form.Item label="Upload">
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
                </Form.Item> */}
        
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedPredictImageSider = Form.create({ name: 'validate_other' })(PredictImageSider);
export default WrappedPredictImageSider;