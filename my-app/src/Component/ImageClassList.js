import React from 'react';
import { List, Card } from 'antd';

const { Meta } = Card;
const data = [
    {
        title : "Cats",
    },
    {
        title : "Dogs",
    },
    {
        title : "Horses",
    },
    {
        title : "Spiders",
    },
    {
        title : "Birds",
    },
    {
        title : "Ants",
    },
]


class ImageClassList extends React.Component {

    handleClick = e => {
        console.log("ImageClassList:" + e.key);
        this.props.chooseClass("cat");
    }

    render() {
        return (
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
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