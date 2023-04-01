import React, {useState} from "react";
import CameraPage from "./CameraPage";
import Select from 'react-select';
import styles from './styles/WelcomePage.module.css'
import { useLocation } from "react-router-dom";

const InteractivePage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lang = urlParams.get('prop1');
  const [capture, setCapture] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answer, setAnswer] = useState('');
  const [answerCapture, setAnswerCapture] = useState(null);
  const [response, setResponse] = useState(null);
  const options = [
    { value: 'Type out my answer', label: 'Type out my answer' },
    { value: 'Write out my answer', label: 'Write out my answer' },
  ]

  const handleChange = (option) => {
    setSelectedOption(option);
  }

  const handleImageCapture = (image) => {
    setCapture(image);
  }

  const handleImageProcessing = async (image) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/extract-translate', {
        method: 'POST',
        body: JSON.stringify({ image, lang }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setResponse(data.translateText);
    } catch (error) {
      console.error(error);
    }
  };

  const textTranslate = async (textSubmit) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/translate', {
        method: 'POST',
        body: JSON.stringify({ textSubmit }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setResponse(data.translateText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerCapture = (image) => {
    setAnswerCapture(image);
    handleImageProcessing(image);
  }

  const handleTextChange = (e) => {
    setAnswer(e.target.value);
  }
  
  const handleTextSubmit = () => {
    console.log(answer);
    textTranslate(answer);
  }

  return (
    <div>
      {capture ? (
        <div>
            <img src={capture} alt="captured image" />
            <p>Select an Option:</p>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                className={styles.dropdown}
            />
            {selectedOption?(selectedOption.value=='Type out my answer'?<div><input type="text" value={answer} onChange={handleTextChange} /><button type="submit" onClick={handleTextSubmit}>Submit</button></div>:(selectedOption.value=='Write out my answer'?<CameraPage onImageCapture={handleAnswerCapture} />:null)):null}
        </div>
      ) : (
        <CameraPage onImageCapture={handleImageCapture} />
      )}
      {response?<h1>{response}</h1>:null}
    </div>
  );
};

export default InteractivePage;
