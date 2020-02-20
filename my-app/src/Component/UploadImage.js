import React from 'react';
import ImageList from './ImageList';
import ImageClassList from './ImageClassList';

const imagesTest = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ];

class UploadImage extends React.Component {
    state = {
        isClassView: true,
        imageClass: '',
    };

    chooseOneClass = imageClass => {
        this.setState({imageClass: imageClass, isClassView: false});
    }

    render() {
        if (this.state.isClassView) {
            return <ImageClassList chooseClass={this.chooseOneClass} isUpload={true} />;
        } else {
            return <ImageList imageClass={this.state.imageClass} isUpload={true} files={imagesTest} />;
        }
    }
}

export default UploadImage;