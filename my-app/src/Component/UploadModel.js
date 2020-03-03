import React from "react";
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
    Input,
    Cascader,
    message,
} from 'antd';
import axios from 'axios';

const { Option } = Select;
const residences = [
    {
      value: 'California',
      label: 'California',
      children: [
        {
          value: 'Santa Clara',
          label: 'Santa Clara',
          children: [
            {
              value: 'San Jose',
              label: 'San Jose',
            },
          ],
        },
      ],
    },
    {
      value: 'Washington',
      label: 'Washington',
      children: [
        {
          value: 'Seattle',
          label: 'Seattle',
          children: [
            {
              value: 'Redmond',
              label: 'Redmond',
            },
          ],
        },
      ],
    },
  ];
  
class UploadModels extends React.Component {

    handleSubmit =  (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("type", values.type);
                formData.append("switch", values.switch);
                formData.append("file",values.upload[0].originFileObj);
                // http://axios-js.com/zh-cn/docs/index.html
                let res = await axios.post(`${process.env.REACT_APP_API_URL}/models/?user_id=${this.props.user_id}&project_title=${this.props.project}`, formData);
                message.success("Upload Model Success!")
                console.log(res);     
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item label="Add classic Model">
                <span className="ant-form-text"> Keras Model(.h5) Only </span>
            </Form.Item>


            <Form.Item label="Model Title">
            {getFieldDecorator('title', {
              rules: [{
                  required: true,
                  message: 'Please Model Title!',
              }],
            })(
              <Input placeholder="Please Model Title" />
            )}
            </Form.Item>

            <Form.Item label="Description">
                {getFieldDecorator('description', {
                rules: [{
                    required: false,
                    message: 'Please input your description!',
                }],
                })(
                <Input placeholder="Please input description" />
                )}
            </Form.Item>

            <Form.Item label="Type">
                {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Please select type!' }],
                })(
                    <Select defaultValue="Classification"
                    placeholder="Select a option and change input text above"
                    // onChange={this.handleSelectChange}
                    >
                    <Option value="Classification">Classification</Option>
                    <Option value="Detection">Detection</Option>
                    </Select>,
                )}
            </Form.Item>
            
            <Form.Item label="Location">
                {getFieldDecorator('residence', {
                initialValue: ['California', 'Santa Clara', 'San Jose'],
                rules: [
                    { type: 'array', required: false, message: 'Please select your habitual residence!' },
                ],
                })(<Cascader options={residences} />)}
            </Form.Item>

            <Form.Item label="public">
                {getFieldDecorator('switch', { valuePropName: 'Public' })(<Switch />)}
            </Form.Item>
    
            <Form.Item label="Upload" extra="longgggggggggggggggggggggggggggggggggg">
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
}

const WrappedUploadModels = Form.create({ name: 'validate_other' })(UploadModels);
export default WrappedUploadModels;