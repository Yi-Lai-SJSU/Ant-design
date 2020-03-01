import React from "react";
import axios from 'axios';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Alert,
    message
  } from 'antd';
  
  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
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
  
  class AddProjectForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
      user_id: this.props.user_id,
    };
  
    handleSubmit = (e) => {
      var that = this;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll( async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let data = {
            user_id: this.props.user_id,
            title: values.title,
            description: values.description,
            type: values.type
          }
          console.log(data);
          await axios.post(`${process.env.REACT_APP_API_URL}/projects/`, data)
          .then(function (response) {
            message.info("Succuss!");
            console.log(response);
            e = {
              key:values.title
            };
            console.log(e);
            console.log(that.props);
            that.props.automatic_jump(e);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      });
    };

    handleSelectChange = value => {
      console.log(value);
      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '+1',
      })(
        <Select style={{ width: 70 }}>
          <Option value="86">+1</Option>
          <Option value="87">+86</Option>
        </Select>,
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        
          <Form.Item label="Project Title">
            {getFieldDecorator('title', {
              rules: [{
                  required: true,
                  message: 'Please Project Title!',
              }],
            })(
              <Input placeholder="Please Project Title" />
            )}
          </Form.Item>

          <Form.Item label="Description">
            {getFieldDecorator('description', {
              rules: [{
                  required: false,
                  message: 'Please input your name!',
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
        
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add a new Project
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
const WrappedAddProjectForm = Form.create({ name: 'register' })(AddProjectForm);
export default WrappedAddProjectForm;