import React, {useState, useRef} from "react";
import Webcam from 'react-webcam'
import styles from './styles/CameraPage.module.css'
const CameraPage = ({onImageCapture}) => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [showLiveFeed, setShowLiveFeed] = useState(true);

    const switchCamera = () => {
      const video = webcamRef.current.video;
      const facingMode = video.facingMode === 'user' ? 'environment' : 'user';
      const constraints = { ...video.constraints, facingMode };
      video.srcObject.getTracks().forEach((track) => track.stop());
      navigator.mediaDevices.getUserMedia({ video: constraints }).then((stream) => {
        video.srcObject = stream;
      });
    };
  
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
      <div className={styles.cameraContainer}>
        {showLiveFeed ? (
          <div>
            <div className={styles.webcamWrapper}>
              <Webcam audio={false} ref={webcamRef} />
            </div>
            <button className={styles.switchCamera} onClick={switchCamera}>
              Switch camera
            </button>
            <button onClick={captureImage}>
              Capture
            </button>
          </div>
        ) : (
          <div>
            <div className={styles.captureImage}>
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