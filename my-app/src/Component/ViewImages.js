import React from 'react';
import ImageList from './ImageList';
import ImageClassList from './ImageClassList';

class ViewImages extends React.Component {
    state = {
        isClassView: this.props.isClassList,
        imageClass: '',
    };

    chooseOneClass = imageClass => {
        this.setState({imageClass: imageClass, isClassView: false});
    }

    render() {
        if (this.state.isClassView) {
            return <ImageClassList chooseClass={this.chooseOneClass} isUpload={false}/>;
        } else {
            return <ImageList imageClass={this.state.imageClass} isUpload={false}/>;
        }
    }
}

export default ViewImages;