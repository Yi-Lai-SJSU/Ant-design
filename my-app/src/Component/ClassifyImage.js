import React from 'react';
import ClassifyImageCard from './ClassifyImageCard';
import '../App.css';

const ClassifyImage = (props) => {
    const images = props.files.map(image => {
        console.log("ClassifyImage:" + image);
        return (
            <ClassifyImageCard key={image.id} image={image} />
        )
    });

    return (
        <div className="image-list">{ images }</div>
    )
}

export default ClassifyImage;