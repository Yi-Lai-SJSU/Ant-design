import React from 'react';
import ImageList from './ImageList';
import ImageClassList from './ImageClassList';

class ViewImages extends React.Component {
    state = {
        isClassView: this.props.isClassList,
        filteredImages: [],
    };

    backToClassList = () => {
        this.setState({isClassView: true});
    }

    chooseOneClass = filteredImages => {
        this.setState({filteredImages: filteredImages, isClassView: false});
    }

    render() {
        if (this.state.isClassView) {
            return <ImageClassList chooseClass={this.chooseOneClass} isUpload={false} />;
        } else {
            return <ImageList isUpload={false} files={this.state.filteredImages} backToClassList={this.backToClassList}/>;
        }
    }
}

export default ViewImages;