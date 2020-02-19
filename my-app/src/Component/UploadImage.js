import React from 'react';
import ImageList from './ImageList';
import ImageClassList from './ImageClassList';

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
            return <ImageClassList chooseClass={this.chooseOneClass} isUpload={true}/>;
        } else {
            return <ImageList imageClass={this.state.imageClass} isUpload={true}/>;
        }
    }
}

export default UploadImage;