import React, { useState } from 'react';
import CameraComponent from './camera';

const AddItemWithRecognition = ({ onCapture }) => {
  const [recognizedItem, setRecognizedItem] = useState('');

  const handleCapture = async (dataUri) => {
    try {
      const response = await fetch('/api/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataUri }),
      });
      const data = await response.json();
      setRecognizedItem(data.label);
      onCapture(data.label);
    } catch (error) {
      console.error('Error recognizing image:', error);
    }
  };

  return (
    <div>
      <CameraComponent onCapture={handleCapture} />
      {recognizedItem && (
        <div>
          <p>Recognized Item: {recognizedItem}</p>
        </div>
      )}
    </div>
  );
};

export default AddItemWithRecognition;
