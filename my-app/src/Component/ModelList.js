import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: url => <a>{url}</a>,
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Public',
    dataIndex: 'isPublic',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

class ModelList extends React.Component {
    state= {
      modelList: [],
    }

    async componentDidMount() {
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/models/?user_id=${this.props.user_id}&project_title=${this.props.project}`);
        console.log(res.data);
        res.data.map(current => {
            if(current.isPublic) {
              current.isPublic = "True";
            } else {
              current.isPublic = "False";
            }
        })
        console.log(res.data);
        this.setState({modelList: res.data});
    }

    render() {
        console.log("*****************");
        console.log(this.state.modelList);
        return (
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.modelList} />
        ) 
    };
}

export default ModelList;