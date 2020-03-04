import React from 'react';
import { List, Card } from 'antd';
import axios from 'axios';

const { Meta } = Card;

class ImageClassList extends React.Component {
    state = {
        res: [],
        data: [],
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

    getTheRepresentImage = (res, type) => {
        var result;
        res.forEach(current => {
            if (current.type === type) {
                result =  current.url;
            }
        });
        return result;
    }

    render() {
        return (
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
        ) 
    };
}

export default ImageClassList;