import React from 'react';
import { Collapse } from 'antd';
import ImageClassList from './ImageClassList';
import ModelList from './ModelList';
import VideoList from './VideoList';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

class Topshow extends React.Component {
    render() {
        return (
            <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="Images" key="1">
                    <ImageClassList />
                </Panel>
                <Panel header="Videos" key="3">
                    <VideoList />
                </Panel>
                <Panel header="Visual Regonition Models" key="2">
                    <ModelList />
                </Panel>
            </Collapse>
        )
    };
}

export default Topshow;