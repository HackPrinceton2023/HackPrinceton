import React, {useState} from "react";
import Select from 'react-select';
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [answer, setAnswer] = useState('');
  const [response, setResponse] = useState(null);
  const options = [
    { value: 'Type out my answer', label: 'Type out my answer' },
    { value: 'Write out my answer', label: 'Write out my answer' },
  ]

  const handleChange = (option) => {
    setSelectedOption(option);
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

  // var imagesList = [{candle}, {car}, {camera}, {cloud}, {cone}, {blue_cup}, {apple}, {book}]
  // var imagesList = [candle, car, camera, cloud, cone, blue_cup, apple, book]
  // const indexGenerator = parseInt(Math.random() * imagesList.length)
  // console.log("indexGenerator = ",indexGenerator)
  // var generated_img = 

  return (
    <div>
      {/* /Users/deepansha/HackPrinceton/dataset/car.jpeg */}
        <div>

            <img src={imagesList[index_ ]} alt="generated image" height="60%" width="60%" />
            {/* writing or typing option */}
            <p>Select an Option:</p>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                className={styles.dropdown}
            />
            {selectedOption?(selectedOption.value=='Type out my answer'?<div><input type="text" value={answer} onChange={handleTextChange} /><button type="submit" onClick={handleTextSubmit}>Submit</button></div>:(selectedOption.value=='Write out my answer'?<CameraPage onImageCapture={handleAnswerCapture} />:null)):null}
        </div>
      {response?<h1>{response}</h1>:null}
    </div>
  );
};

export default RegularPage;
