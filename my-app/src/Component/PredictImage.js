import { Upload, Button, Icon, message } from 'antd';
import React from "react";
import '../App.css';

const fileList = [];
message.config({
  top: 200,
  duration: 2,
  maxCount: 3,
});

class PredictImage extends React.Component {
  handleChange = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log("uploading");
    }
    if (status === 'done') {
      message.success(`Predict class: ${info.file.response}.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const props = {
      action: 'http://localhost:8000/predict/image/',
      listType: 'picture',
      defaultFileList: [...fileList],
      onChange: this.handleChange,
    };

    return(
      <div style={{width:500}}>
        <Upload {...props} >
          <Button>
            <Icon type="upload" /> Upload Image to Predict
          </Button>
        </Upload>
      </div>
    )
  }
}

export default PredictImage;