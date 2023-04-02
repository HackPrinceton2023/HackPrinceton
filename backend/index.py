from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import pytesseract
from langdetect import detect
from googletrans import Translator
import base64
import io
import torch
import numpy as np
import matplotlib.pyplot as plt
import openai
import sentence_transformers

optimal_psm = {
    'eng': 3,
    'ara': 13,
    'ben': 3,
    'chi_sim': 6,
    'chi_tra': 6,
    'jpn': 6,
    'kor': 6,
    'fra': 3,
    'deu': 3,
    'ita': 3,
    'por': 3,
    'spa': 3,
    'rus': 3,
    'tur': 3,
    'nld': 3,
    'nor': 3,
    'fin': 3,
    'swe': 3,
    'dan': 3,
    'ell': 3,
    'hin': 3,
    'heb': 13,
    'pol': 3,
    'ces': 3,
    'slv': 3,
    'hrv': 3,
    'ron': 3,
    'srp': 3,
    'ukr': 3,
    'bul': 3,
    'lav': 3,
    'lit': 3,
    'est': 3,
    'vie': 6,
    'ind': 3,
    'mal': 3,
    'kat': 6,
    'pan': 3,
    'tam': 3,
    'tel': 3,
    'urd': 3,
    'fas': 13,
    'pus': 13,
    'ron_frak': 3,
    'srp_latn': 3,
    'srp_glagol': 3,
    'tha': 6,
    'amh': 13,
    'tir': 13,
    'som': 13,
    'swa': 13,
    'zul': 13,
    'yor': 13,
    'ibo': 13,
    'hau': 13,
    'aze': 3,
    'aze_cyrl': 3,
    'kat_old': 6,
    'kat_vert': 6,
    'kor_vert': 6,
    'mri': 13,
    'nep': 3,
    'ori': 3,
    'sin': 3,
    'eus': 3,
    'cat': 3,
    'gle': 3,
    'glg': 3,
    'slk': 3,
    'sqi': 3,
    'uzb': 3,
    'uzb_cyrl': 3,
    'bel': 3,
    'bos': 3,
    'mar': 3,
    'mya': 6,
    'kat_ek': 6,
    'sdn': 13,
    'sun': 3,
    'tgk': 3,
    'yor_cyrl': 13
}
lang_dict = {
    'Afrikaans': 'af',
    'Albanian': 'sq',
    'Amharic': 'am',
    'Arabic': 'ar',
    'Armenian': 'hy',
    'Azerbaijani': 'az',
    'Basque': 'eu',
    'Belarusian': 'be',
    'Bengali': 'bn',
    'Bosnian': 'bs',
    'Bulgarian': 'bg',
    'Catalan': 'ca',
    'Cebuano': 'ceb',
    'Chinese (Simplified)': 'zh-CN',
    'Chinese (Traditional)': 'zh-TW',
    'Corsican': 'co',
    'Croatian': 'hr',
    'Czech': 'cs',
    'Danish': 'da',
    'Dutch': 'nl',
    'English': 'en',
    'Esperanto': 'eo',
    'Estonian': 'et',
    'Finnish': 'fi',
    'French': 'fr',
    'Frisian': 'fy',
    'Galician': 'gl',
    'Georgian': 'ka',
    'German': 'de',
    'Greek': 'el',
    'Gujarati': 'gu',
    'Haitian Creole': 'ht',
    'Hausa': 'ha',
    'Hawaiian': 'haw',
    'Hebrew': 'he',
    'Hindi': 'hi',
    'Hmong': 'hmn',
    'Hungarian': 'hu',
    'Icelandic': 'is',
    'Igbo': 'ig',
    'Indonesian': 'id',
    'Irish': 'ga',
    'Italian': 'it',
    'Japanese': 'ja',
    'Javanese': 'jv',
    'Kannada': 'kn',
    'Kazakh': 'kk',
    'Khmer': 'km',
    'Kinyarwanda': 'rw',
    'Korean': 'ko',
    'Kurdish': 'ku',
    'Kyrgyz': 'ky',
    'Lao': 'lo',
    'Latin': 'la',
    'Latvian': 'lv',
    'Lithuanian': 'lt',
    'Luxembourgish': 'lb',
    'Macedonian': 'mk',
    'Malagasy': 'mg',
    'Malay': 'ms',
    'Malayalam': 'ml',
    'Maltese': 'mt',
    'Maori': 'mi',
    'Marathi': 'mr',
    'Mongolian': 'mn',
    'Myanmar (Burmese)': 'my',
    'Nepali': 'ne',
    'Norwegian': 'no',
    'Nyanja (Chichewa)': 'ny',
    'Odia (Oriya)': 'or',
    'Pashto': 'ps',
    'Persian': 'fa',
    'Polish': 'pl',
    'Portuguese (Portugal, Brazil)': 'pt',
    'Punjabi': 'pa',
    'Romanian': 'ro',
    'Russian': 'ru',
    'Samoan': 'sm',
    'Scots Gaelic': 'gd',
    'Serbian': 'sr',
    'Sesotho': 'st',
    'Shona': 'sn',
    'Sindhi': 'sd',
    'Sinhala (Sinhalese)': 'si',
    'Slovak': 'sk',
    'Slovenian': 'sl',
    'Somali': 'so',
    'Spanish': 'es',
    'Sundanese': 'su',
    'Swahili': 'sw',
    'Swedish': 'sv',
    'Tagalog (Filipino)': 'tl',
    'Tajik': 'tg',
    'Tamil': 'ta',
    'Tatar': 'tt',
    'Telugu': 'te',
    'Thai': 'th',
    'Turkish': 'tr',
    'Turkmen': 'tk',
    'Ukrainian': 'uk',
    'Urdu': 'ur',
    'Uyghur': 'ug',
    'Uzbek': 'uz',
    'Vietnamese': 'vi',
    'Welsh': 'cy',
    'Xhosa': 'xh',
    'Yiddish': 'yi',
    'Yoruba': 'yo',
    'Zulu': 'zu'
    }

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/api')
def hello():
    return 'Hello, World!'

@app.route('/api/extract-translate', methods=['POST'])
def extractandtranslate():
    data = request.json
    data['image'] = data['image'][data['image'].find(',')+1:]
    # print(data)
    # decode the base64 string into binary data
    img_data = base64.b64decode(data['image'])
    # convert binary data into numpy array
    nparr = np.frombuffer(img_data, np.uint8)
    # decode numpy array into image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # Convert image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Apply thresholding to preprocess the image
    gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

    contours, _ = cv2.findContours(gray, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Get bounding box of largest contour
    largest_contour = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(largest_contour)

    # Crop image to bounding box
    cropped = gray[y:y+h, x:x+w]
    cv2.imwrite("image.jpg",cropped)
    # Perform OCR using Tesseract
    config = '--psm {}'.format(6) if optimal_psm[data['lang']] else '--psm 6'
    text = pytesseract.image_to_string(cropped, lang=data['lang'],config=config)
    # Detect language of the extracted text
    lang = detect(text)

    # Translate the text to English if it's not already in English
    if lang != 'en':
        translator = Translator()
        text = translator.translate(text, src=lang, dest='en').text
    # Print the extracted and translated text
    return jsonify({'translateText':text})

@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.json
    print(data)
    # Detect language of the extracted text
    lang = detect(data['textSubmit'])

    # Translate the text to English if it's not already in English
    if lang != 'en':
        translator = Translator()
        text = translator.translate(data['textSubmit'], src=lang, dest='en').text

    # Print the extracted and translated text
    return jsonify({'translateText':text})

@app.route('/api/translate-to-lang', methods=['POST'])
def translateToLang():
    data = request.json
    print(data)
    # Detect language of the extracted text
    lang = data['fullLang']
    print(lang)

    # Translate the text to English if it's not already in English
    translator = Translator()
    text = translator.translate(data['textSubmit'], src='en', dest=lang_dict[lang]).text

    # Print the extracted and translated text
    return jsonify({'translateText':text})

@app.route('/api/generate', methods=['POST'])
def qaGenerator():
    data = request.json
    print(data)
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
    
    if data['imageURL'].startswith('data:image/'):
        # image data is already in base64 format
        data['imageURL'] = data['imageURL'][data['imageURL'].find(',')+1:]
        img_data = base64.b64decode(data['imageURL'])
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    else:
        # image data is a regular file path
        temp = '..{}'.format(data['imageURL'].split("HackPrinceton")[1])
        img = Image.open(temp).convert('RGB')

    # convert binary data into numpy array

    # conditional image captioning
    # text = "a photography of"
    # inputs = processor(raw_image, text, return_tensors="pt")

    # out = model.generate(**inputs)
    # print(processor.decode(out[0], skip_special_tokens=True))
    # >>> a photography of a woman and her dog

    # unconditional image captioning
    inputs = processor(img, return_tensors="pt")

    out = model.generate(**inputs)
    info = processor.decode(out[0], skip_special_tokens=True)
    print(info)
    text = "A kindergardener is learning to identify objects. What is 1 simple question to ask about an image with" + str(info)+ "The question and answer should be in a single string split by --"

    openai.api_key = "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"

    response = openai.Completion.create(
        engine = "text-davinci-003",
        prompt = text,
        temperature = 0.6,
        max_tokens = 150,
    )
    print(response)

    question,answer = response.choices[0].text.split('--')
    print(question,answer)
    return jsonify({'questions':question, 'answer':answer})

@app.route('/api/check', methods=['POST'])
def answerChecking():
    data = request.json
    print(data)
    input_sentence = data['responseVar'] #ToDO Replace with user answer
    sentences = [input_sentence,data['actualAnswer']]
    model = sentence_transformers.SentenceTransformer('hiiamsid/sentence_similarity_spanish_es')
    embeddings = model.encode(sentences)

    s1 = sentences[0]
    v1 = embeddings[0]
    for i2 in range(1, 2):
        s = sentence_transformers.util.cos_sim(a=v1, b=embeddings[i2]).item()
        print(s)

    return jsonify({"similarityIndex":s})
# def main():
#     print(extractandtranslate())

if __name__ == "__main__":
    app.run(debug=True)
