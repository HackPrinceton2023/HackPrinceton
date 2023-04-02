import React, {useState} from "react";
import Select from 'react-select';
import CameraPage from "./CameraPage";
import styles from './styles/WelcomePage.module.css'
import { useLocation } from "react-router-dom";
import candle from '../../../dataset/candle.jpeg';
import car from '../../../dataset/car.jpeg';
import camera from '../../../dataset/camera.jpeg';
import cloud from '../../../dataset/cloud.jpeg';
import cone from '../../../dataset/cone.jpeg';
import blue_cup from '../../../dataset/blue-cup.jpeg';
import apple from '../../../dataset/apple.jpeg';
import book from '../../../dataset/book.png';


var imagesList = [candle, car, camera, cloud, cone, blue_cup, apple, book]
const index_ =parseInt(Math.random() * imagesList.length)

const RegularPage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lang = urlParams.get('prop1');
  const fullLang = urlParams.get('prop2');
  const imgUrl = urlParams.get('prop3');
  const [capture, setCapture] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answer, setAnswer] = useState('');
  const [answerCapture, setAnswerCapture] = useState(null);
  const [responseVar, setResponse] = useState(null);
  const [actualAnswer, setActualAnswer] = useState(null);
  const [question, setQuestion] = useState(null);
  const [translatedQuestion, setTranslatedQuestion] = useState(null);
  const [showEnglish, setShowEnglish] = useState(false);
  const [similarityIndex, setSimilarityIndex] = useState(null);
  const options = [
    { value: 'Type out my answer', label: 'Type out my answer' },
    { value: 'Write out my answer', label: 'Write out my answer' },
  ]

  const handleChange = (option) => {
    setSelectedOption(option);
  }

  const handleImageCapture = (image) => {
    setCapture(image);
    handleObjectDescription(image);
  }

  const handleObjectDescription = async (imageURL) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate', {
        method: 'POST',
        body: JSON.stringify({ imageURL }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setQuestion(data.questions);
      setActualAnswer(data.answer);
      textTranslateToLang(data.questions);
      console.log(data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageProcessing = async (image) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/extract-translate', {
        method: 'POST',
        body: JSON.stringify({ image }),
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

  const textTranslateToLang = async (textSubmit) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/translate-to-lang', {
        method: 'POST',
        body: JSON.stringify({ textSubmit, fullLang }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setTranslatedQuestion(data.translateText);
    } catch (error) {
      console.error(error);
    }
  };

  const checkAnswer = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/check', {
        method: 'POST',
        body: JSON.stringify({ responseVar, actualAnswer }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setSimilarityIndex(data.similarityIndex);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAnswerCapture = (image) => {
    setAnswerCapture(image);
    handleImageProcessing(image);
    checkAnswer()
  }

  const handleTextChange = (e) => {
    setAnswer(e.target.value);
  }
  
  const handleTextSubmit = () => {
    textTranslate(answer);
    checkAnswer()
  }

  const handleShowEnglishQ = () => {
    setShowEnglish(!showEnglish)
  }

  const handleQuestionGenerate = () => {
    handleObjectDescription(imagesList[index_ ])
  }


  return (
    <div>
      {(
        <div>
            <img src={imgUrl?imgUrl:imagesList[index_ ]} alt="generated image" height="30%" width="30%" style={{ width: '30%', height: '30%', borderRadius: '50%', border: '2px solid black', display: 'block', margin: 'auto' }}/>
            <button onClick={handleQuestionGenerate} >Generate Question</button>
            <div >
              {translatedQuestion?<div><h1>{translatedQuestion.substr(1)}</h1><button onClick={handleShowEnglishQ}>English Translation</button></div>:null}
              {showEnglish?<h1>{question.substr(2)}</h1>:null}
            </div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                className={styles.dropdown}
            />
            {selectedOption?(selectedOption.value=='Type out my answer'?<div><input type="text" value={answer} onChange={handleTextChange} /><button type="submit" onClick={handleTextSubmit}>Submit</button></div>:(selectedOption.value=='Write out my answer'?<CameraPage onImageCapture={handleAnswerCapture} />:null)):null}
        </div>
      )}
      {responseVar?<h1>Your Response in English: {responseVar}</h1>:null}
      {similarityIndex!=null?<h1>Result:{similarityIndex>=0.6?`You got it correct!! Here's another way of answering this question ${actualAnswer}`:`You got it wrong :( Here's the correct answer ${actualAnswer}`}</h1>:null}
    </div>
  );
};

export default RegularPage;
// <img src={imagesList[index_ ]} alt="generated image" height="60%" width="60%" />