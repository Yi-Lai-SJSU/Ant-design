import React from 'react';
import ImageList from './ImageList';
import ImageClassList from './ImageClassList';

class UploadImage extends React.Component {
    state = {
        isClassView: this.props.isClassList,
        filteredImages: [],
    };

    backToClassList = () => {
        console.log("^^^^^^^^^^^^^^^^^^^^^^^");
        this.setState({isClassView: true});
    }

    chooseOneClass = filteredImages => {
        this.setState({filteredImages: filteredImages, isClassView: false});
    }

    render() {
        if (this.state.isClassView) {
            return <ImageClassList chooseClass={this.chooseOneClass} isUpload={true} />;
        } else {
            return <ImageList isUpload={true} files={this.state.filteredImages} backToClassList={this.backToClassList}/>;
        }
    }
}

export default UploadImage;