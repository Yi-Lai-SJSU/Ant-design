import React from 'react';
import { List, Card } from 'antd';
import { Drawer, Button, Divider } from 'antd';

import axios from 'axios';

import { Form, Icon, Input } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const { Meta } = Card;

class ImageClassListInner extends React.Component {
    state = {
        res: [],
        data: [],
        drawer: false,
    };

    componentDidMount() {
        const url = `${process.env.REACT_APP_API_URL}/images/?user_id=${this.props.user_id}&project_title=${this.props.project}`;
        axios.get(url).then(res => {
            console.log(res.data);
            var allTypes = res.data.map(current => {
                return current.type;
            });
            var uniqueTypes = Array.from(new Set(allTypes));
            var data = uniqueTypes.map(current => {
                return {
                    title: current,
                    url: this.getTheRepresentImage(res.data, current),
                };
            });
            this.setState({res: res.data, data: data});
            console.log(this.state.data);
        }).catch(err => console.log(err));
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    getTheRepresentImage = (res, type) => {
        var result;
        res.forEach(current => {
            if (current.type === type) {
                result =  current.url;
            }
        });
        return result;
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.setState({
                data: [
                    ...this.state.data,
                    {title: values.username, 
                     url:"https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png"}
                ]
            });
          }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        return (
            <React.Fragment>
                <Button type="primary" onClick={this.showDrawer}>
                    Add a new Class
                </Button>
                <Drawer
                    title="Add a New Class"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>

                <Divider> </Divider>
            
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.state.data}
                    renderItem = {item => (
                        <List.Item 
                            actions= {[
                                <a onClick={() => {
                                    console.log(item.title);
                                    var filteredData = this.state.res.filter(data => data.type === item.title);
                                    console.log(filteredData);
                                    this.props.chooseClass(filteredData, item.title);
                                }}>
                                    { this.props.isUpload ? "Upload" : "View" }
                                </a>,
                                <a key="list-loadmore-more">Edit</a>
                            ]}
                        >
                            <Card
                                hoverable
                                style={{ width: 160 }}
                                cover={<img alt="example" src={item.url} />}
                            >
                                <Meta title={item.title} style={{ textAlign: "center" }} />
                            </Card>
                        </List.Item>
                    )}
                />
            </React.Fragment>
        ) 
    };
}

const ImageClassList= Form.create({ name: 'horizontal_login' })(ImageClassListInner);
export default ImageClassList;