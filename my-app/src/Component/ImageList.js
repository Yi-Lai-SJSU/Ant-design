//https://ant.design/components/upload-cn/
import React from 'react';
import { Upload, Icon, Modal, Button, message } from 'antd';
import "../App.css";
import axios from 'axios';

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
    type: this.props.type,
    fileList: this.props.isUpload ?  [] : this.props.files.map((currElement) => {
      return ({
          uid: currElement.id,
          url: currElement.url,
      })
    }),
    uploadData: null,
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

  handleChange = ({ fileList }) => {
      console.log(fileList);
      this.setState({ fileList })
  };

  backToClassList = (e) => {
    console.log(e);
    this.props.backToClassList();
  };

  uploadImages = async () => {

    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    
    let url = 'http://localhost:8000/images/image'

    console.log("*************************");
    console.log(this.state.fileList);
    let formData = new FormData();

    //https://stackoverflow.com/questions/54845951/react-antdesign-add-uploaded-images-to-formdata
    let uploadFiles = this.state.fileList.map(currentItem => {
      return currentItem.originFileObj;
    });
    
    //https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/append
    for (let i = 0; i < uploadFiles.length; i++) {
      console.log("index:" + i);
      formData.append('files', uploadFiles[i])
      console.log(uploadFiles[i].uid)
    }
    formData.append("type", this.state.type);

    //https://blog.csdn.net/NAMECZ/article/details/84585709
    console.log(formData.getAll("files"));

    if (this.state.fileList.length === 0) {
      message.error('Please upload at least one image')
      return;
    }
    let res = await axios.post(url, formData, {hearders: headers});
    console.log('res', res)
    if (res && res.status === 200) {
      message.success('Upload Succeed!');
    }
    console.log(res.data);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Add</div>
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          { this.props.isUpload ? uploadButton : null }
        </Upload>
        <div>
          <Button type="primary" onClick={this.uploadImages}>Submit</Button>
        </div>
        <Modal 
          visible={previewVisible} 
          footer={null} 
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div>
          <Button type="link" onClick={this.backToClassList}>Back</Button>
        </div>
      </div>
    );
  }
}

export default ImageList;
