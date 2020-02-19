import React from 'react';
import '../App.css';
import { Breadcrumb } from 'antd';

class MyBreadcrumb extends React.Component {
  render() {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Projects</Breadcrumb.Item>
            <Breadcrumb.Item>Project 1</Breadcrumb.Item>
            <Breadcrumb.Item>View Assets</Breadcrumb.Item>
        </Breadcrumb>
    );
  }
}

export default MyBreadcrumb;
