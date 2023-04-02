import React, {useState} from "react";
import styles from "./styles/WelcomePage.module.css"
import { Link } from 'react-router-dom';
import Select from 'react-select';

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
  const options = [
    { value: 'Interactive Learning', label: 'Interactive Learning' },
    { value: 'Regular Learning', label: 'Regular Learning' },
  ]

  const handleChange = (option) => {
    setSelectedOption(option);
    if (option.value == 'Interactive Learning'){
        setRedirect('/interactive');
    }else{
        setRedirect('/regularPage');
    }
  }

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    console.log(languages[e.target.value]);
    setSelectedLanguageID(languages[e.target.value]);
  };

  return (
    <>
    <div class={styles.container}>
        <h1 className={styles.element}>Welcome to the app!</h1>
        <p>Which language would you like to learn:</p>
        <select value={selectedLanguage} onChange={handleLanguageChange} c>
            <option value="">-- Select a language --</option>
            {Object.keys(languages).map((language) => (
            <option key={language} value={language}>
                {language}
            </option>
            ))}
        </select>
        {selectedLanguage && (
            <div>
                <p>You have selected the {selectedLanguage} language.</p>
                <div>
                    <p>Select an Option:</p>
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={options}
                        className={styles.dropdown}
                    />
                </div>
                <button><Link to={`${redirect}?prop1=${selectedLanguageID}`} style={{ color: '#FFFFFF' }}>Next</Link></button>
            </div>
        )}
    </div>
    </>
  );
};

export default WelcomePage;
