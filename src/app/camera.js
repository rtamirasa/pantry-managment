import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css'

const CameraComponent = ({onCapture}) => {
    const handleTakePhoto = (dataUri) =>{
        onCapture(dataUri);
    };


return(
    <div>
        <Camera onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}/>
    </div>
);
};

export default CameraComponent;