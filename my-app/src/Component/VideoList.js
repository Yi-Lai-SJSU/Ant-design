import { List, Avatar, Icon } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class VideoList extends React.Component {
    state ={
        listData: [],
    }

    componentDidMount() {
        const url = 'http://localhost:8000/videoToFrames/testing/videos/';
        axios.get(url).then(res => {
            this.setState({listData: res.data});
            console.log(this.state.listData);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <List 
                    size="small"
                    bordered="true"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 1,
                    }}
                    dataSource={this.state.listData}
                    renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                    <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                    <IconText type="message" text="2" key="list-vertical-message" />,
                                ]}
                                extra={
                                    <div style={{margin:"20 auto"}}>
                                        <ReactPlayer
                                            width={450}
                                            url={item.url}
                                            playing
                                            loop="true"
                                        />
                                    </div>
                                }
                            >
                                <List.Item.Meta
                                    title={<a>{item.title}</a>}
                                    description={"Description:" + item.description}
                                />
                                    {"Type:" + item.type}
                            </List.Item>
                    )}
                />
            </div>
        ) 
    };
}

export default VideoList;