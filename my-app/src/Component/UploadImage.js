import React from 'react';
import ImageList from './ImageList';
import ImageClassList from './ImageClassList';

class UploadImage extends React.Component {
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
                        isUpload={true} 
                        user_id={this.props.user_id}
                        project={this.props.project}
                    />;
        } else {
            return <ImageList 
                        isUpload={true} 
                        type={this.state.choosenType} 
                        files={this.state.filteredImages} 
                        backToClassList={this.backToClassList}
                        user_id={this.props.user_id}
                        project={this.props.project}
                    />;
        }
    }
}

export default UploadImage;