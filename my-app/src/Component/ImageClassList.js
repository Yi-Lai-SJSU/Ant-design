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
        const url = 'http://localhost:8000/videoToFrames/testing/images/';
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

    getTheRepresentImage(res, type) {
        var result;
        res.forEach(current => {
            if (current.type === type) {
                result =  current.location;
            }
        });
        return result;
    }

    handleClick = e => {
        console.log("ImageClassList:" + e.key);
        this.props.chooseClass("cat");
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
                                this.props.chooseClass(item.title);
                            }}>
                                { this.props.isUpload ? "Upload" : "View" }
                            </a>,
                            <a key="list-loadmore-more">Edit</a>
                        ]}
                    >
                        <Card
                            hoverable
                            style={{ width: 160 }}
                            cover={<img alt="example" src="https://resize.hswstatic.com/w_907/gif/animal-stereotype-1.jpg" />}
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