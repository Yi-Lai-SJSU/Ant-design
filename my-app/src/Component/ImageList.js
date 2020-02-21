import React from 'react';
import { Upload, Icon, Modal, Button } from 'antd';
import "../App.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ImageList extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.isUpload ?  [] : this.props.files.map((currElement) => {
      return ({
          uid: currElement.id,
          url: currElement.url,
      })
    }),
  };


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  backToClassList = (e) => {
    console.log(e);
    this.props.backToClassList();
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          { this.props.isUpload ? uploadButton : null }
        </Upload>
        <Modal 
          visible={previewVisible} 
          footer={null} 
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div>
          <Button type="link" onClick={this.backToClassList}> Back </Button>
        </div>
      </div>
    );
  }
}

export default ImageList;
