import React from 'react';
import { List, Card } from 'antd';

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
    render() {
        return (
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem = {item => (
                    <List.Item>
                        <Card title={item.title}> 
                            Card content
                        </Card>
                    </List.Item>
                )}
            />
        ) 
    };
}

export default ImageClassList;