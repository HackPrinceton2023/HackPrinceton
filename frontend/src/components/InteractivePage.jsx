import React, {useState} from "react";
import CameraPage from "./CameraPage";
import Select from 'react-select';
import styles from './styles/WelcomePage.module.css'
import { useLocation } from "react-router-dom";

const InteractivePage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lang = urlParams.get('prop1');
  const fullLang = urlParams.get('prop2');
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
      // const cleanedTransQ = translatedQuestion.replace(/[^a-zA-Z0-9\s?]/g, "").trim();
      // const cleanedQ = question.replace(/[^a-zA-Z0-9\s?]/g, "").trim();
      // console.log(cleanedTransQ);
      // setTranslatedQuestion(cleanedTransQ);
      // setQuestion(cleanedQ);
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

  return (
    <div>
      <h2 style={{fontFamily:"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"}}>Look around you! Take a picture of ONE item :{")"}</h2>
      <h3 style={{fontFamily:"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"}}>For best results, include objects only</h3>
      {capture ? (
        <div>
            <img src={capture} alt="captured image" />
            <div >
              {translatedQuestion?<div style={{flexDirection:"column"}}><h1>{translatedQuestion.substr(1)}</h1><button onClick={handleShowEnglishQ}>English Translation</button></div>:null}
              {showEnglish?<h1>{question.substr(3)}</h1>:null}
            </div>
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
      {responseVar?<h1>Your Response in English: {responseVar}</h1>:null}
      {similarityIndex!=null?<h1>Result:{similarityIndex>=0.6?`You got it correct!! Here's another way of answering this question ${actualAnswer}`:`You got it wrong :( Here's the correct answer ${actualAnswer}`}</h1>:null}
    </div>
  );
};

export default function WrappedInteractivePage() {
  const navbarHeight = 110; // set this to the height of your navbar
  return (
    <div style={{ marginTop: `${navbarHeight}px` }}>
      <InteractivePage />
    </div>
  );
}
