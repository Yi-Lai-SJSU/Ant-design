import React from 'react';
import '../App.css';
import { Breadcrumb } from 'antd';

class MyBreadcrumb extends React.Component {
  render() {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item> {this.props.current_project} </Breadcrumb.Item>
        </Breadcrumb>
    );
  }
}

export default MyBreadcrumb;
