import React, {useState} from "react";
import styles from "./styles/WelcomePage.module.css"
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {TypeAnimation} from 'react-type-animation';
import Card from "./Modal";
import interactive from '../assets/interactive.png'
import regular from '../assets/regular.png'

const WelcomePage = () => {

  const languages = {
    'Afrikaans': 'afr',
    'Amharic': 'amh',
    'Arabic': 'ara',
    'Assamese': 'asm',
    'Azerbaijani': 'aze',
    'Azerbaijani (Cyrillic)': 'aze_cyrl',
    'Belarusian': 'bel',
    'Bengali': 'ben',
    'Bosnian': 'bos',
    'Bulgarian': 'bul',
    'Catalan': 'cat',
    'Cebuano': 'ceb',
    'Cherokee': 'chr',
    'Chinese (Simplified)': 'chi_sim',
    'Chinese (Traditional)': 'chi_tra',
    'Corsican': 'cos',
    'Croatian': 'hrv',
    'Czech': 'ces',
    'Danish': 'dan',
    'Dutch': 'nld',
    'Dzongkha': 'dzo',
    'English': 'eng',
    'Esperanto': 'epo',
    'Estonian': 'est',
    'Finnish': 'fin',
    'French': 'fra',
    'Galician': 'glg',
    'Georgian': 'kat',
    'German': 'deu',
    'Greek': 'ell',
    'Gujarati': 'guj',
    'Haitian Creole': 'hat',
    'Hebrew': 'heb',
    'Hindi': 'hin',
    'Hungarian': 'hun',
    'Icelandic': 'isl',
    'Indonesian': 'ind',
    'Irish': 'gle',
    'Italian': 'ita',
    'Japanese': 'jpn',
    'Javanese': 'jav',
    'Kannada': 'kan',
    'Kazakh': 'kaz',
    'Khmer': 'khm',
    'Kinyarwanda': 'kin',
    'Korean': 'kor',
    'Kurdish': 'kur',
    'Kyrgyz': 'kir',
    'Lao': 'lao',
    'Latin': 'lat',
    'Latvian': 'lav',
    'Lithuanian': 'lit',
    'Luxembourgish': 'ltz',
    'Macedonian': 'mkd',
    'Malay': 'msa',
    'Malayalam': 'mal',
    'Maltese': 'mlt',
    'Maori': 'mri',
    'Marathi': 'mar',
    'Mongolian': 'mon',
    'Myanmar (Burmese)': 'mya',
    'Nepali': 'nep',
    'Norwegian': 'nor',
    'Occitan': 'oci',
    'Oriya': 'ori',
    'Oromo': 'orm',
    'Pashto': 'pus',
    'Persian': 'fas',
    'Polish': 'pol',
    'Portuguese': 'por',
    'Punjabi': 'pan',
    'Quechua': 'que',
    'Romanian': 'ron',
    'Russian': 'rus',
    'Sanskrit': 'san',
    'Scots Gaelic': 'gla',
    'Serbian': 'srp',
    'Sindhi': 'snd',
    'Sinhala': 'sin',
    'Slovak': 'slk',
    "Slovenian": "slv",
    "Serbian (Cyrillic)": "srp_cyrl",
    "Serbian (Latin)": "srp_latn",
    "Swahili": "swa",
    "Syriac": "syr",
    "Tagalog": "tgl",
    "Tajik": "tgk",
    "Tamil": "tam",
    "Tatar": "tat",
    "Telugu": "tel",
    "Thai": "tha",
    "Tigrinya": "tir",
    "Turkish": "tur",
    "Ukrainian": "ukr",
    "Urdu": "urd",
    "Uzbek (Cyrillic)": "uzb_cyrl",
    "Uzbek (Latin)": "uzb_latn",
    "Vietnamese": "vie",
    "Welsh": "cym",
    "Yiddish": "yid"
  }
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedLanguageID, setSelectedLanguageID] = React.useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [welcomeTranslated, setWelcomeTranslated] = useState('Welcome to your new language learning app!');
  const [selectedCard, setSelectedCard] = useState('');

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
    if (selectedCard == 'Interactive Learning'){
      setRedirect('/interactive');
    }else{
        setRedirect('/regularPage');
    }
    console.log(redirect);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setSelectedLanguageID(languages[e.target.value]);
    textTranslateToLang(e.target.value);
  };

  const textTranslateToLang = async (lang) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/translate-to-lang', {
        method: 'POST',
        body: JSON.stringify({ textSubmit:'Welcome to your new language learning app', fullLang:lang }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setWelcomeTranslated(data.translateText);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
    <div class={styles.container}>
      <h1 className={styles.element}>
          <TypeAnimation
            key={selectedLanguage} // Add key prop
            cursor={false}
            sequence={[welcomeTranslated, 2000]}
          />
        </h1>
        <p style={{fontFamily:"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"}}>Which language would you like to learn:</p>
        <select value={selectedLanguage} onChange={handleLanguageChange} className={styles.select}>
          <option value="">Select a language</option>
          {Object.keys(languages).map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        {selectedLanguage && (
            <div className="select-container">
                <div>
                    <p style={{fontFamily:"Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"}}>Choose your learning mode:</p>
                    {/* <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={options}
                        className={styles.dropdown}
                    /> */}
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <Card
                        imageSrc={interactive}
                        altText="Interactive Learning"
                        title="Interactive Learning"
                        text="Take a picture and receive a question about it!"
                        isSelected={selectedCard === 'Interactive Learning'}
                        onClick={() => handleCardClick('Interactive Learning')}
                      />
                      <Card
                        imageSrc={regular}
                        altText="Regular Learning"
                        title="Regular Learning"
                        text="See a picture from our library of 3M+ photos, along with a question"
                        isSelected={selectedCard === 'Regular Learning'}
                        onClick={() => handleCardClick('Regular Learning')}
                      />
                    </div>

                    <button><Link to={`${redirect}?prop1=${selectedLanguageID}&prop2=${selectedLanguage}`} style={{ color: '#FFFFFF' }}>Next</Link></button>
                </div>
            </div>
        )}
    </div>
    </>
  );
};

export default WelcomePage;
