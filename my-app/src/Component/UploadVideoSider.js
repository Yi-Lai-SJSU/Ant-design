import { Upload, Button, Icon, message } from 'antd';
import reqwest from 'reqwest';
import React from 'react';

class UploadVideoSider extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('video', file);
        });

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: `http://localhost:8000/videos/?user_id=${this.props.user_id}&project_title=${this.props.project}`,
            method: 'post',
            processData: false,
            data: formData,
            success: (res) => {
                message.success('upload successfully.');
                this.setState({ fileList: [], uploading: false});
                console.log(res);
                this.props.handleUploadSucceed(res);
            },
            error: () => {
                this.setState({uploading: false});
                message.error('upload failed.');
            },
        });
    };

    render() {
        const { uploading, fileList } = this.state;
        const props = {
        onRemove: file => {
            this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                    fileList: newFileList,
                };
            });
        },
        beforeUpload: file => {
            this.setState(state => ({
                fileList: [...state.fileList, file],
            }));
            return false;
        },
        fileList,
        };

        return (
            <div>
                <Upload {...props}>
                <Button>
                    <Icon type="upload" /> Select File
                </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                    >
                {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </div>
        );
    }
}

export default UploadVideoSider;