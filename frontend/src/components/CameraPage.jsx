import React, {useState, useRef} from "react";
import Webcam from 'react-webcam'
const CameraPage = ({onImageCapture}) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [showLiveFeed, setShowLiveFeed] = useState(true);
  
    const captureImage = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setShowLiveFeed(false);
    };
  
    const handleRetake = () => {
      setImage(null);
      setShowLiveFeed(true);
    };

    const handleUse = () => {
      onImageCapture(image);
    };
  
    return (
      <div>
        {showLiveFeed ? (
          <div>
            <div>
              <Webcam audio={false} ref={webcamRef} />
            </div>
            <div>
              <button onClick={captureImage}>Capture</button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <img src={image} alt="captured image" />
            </div>
            <div>
              <button onClick={handleUse}>Use</button>
              <button onClick={handleRetake}>Retake</button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default CameraPage