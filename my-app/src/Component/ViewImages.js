import React from 'react';
import ImageList from './ImageList';
import ImageClassList from './ImageClassList';

class ViewImage extends React.Component {
    state = {
        isClassView: this.props.isClassList,
        filteredImages: [],
        choosenType: "unclassified",
    };

    backToClassList = () => {
        this.setState({isClassView: true});
    };

    chooseOneClass = (filteredImages, type) => {
        this.setState({
                filteredImages: filteredImages, 
                choosenType: type,
                isClassView: false}
        );
    };

    render() {
        if (this.state.isClassView) {
            return  <ImageClassList 
                        chooseClass={this.chooseOneClass} 
                        isUpload={false} 
                    />;
        } else {
            return <ImageList 
                        isUpload={false} 
                        type={this.state.choosenType} 
                        files={this.state.filteredImages} 
                        backToClassList={this.backToClassList}
                    />;
        }
    }
}

export default ViewImage;