from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from PIL import Image
import pytesseract
from langdetect import detect
from googletrans import Translator
import base64
import io
import numpy as np

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

# def main():
#     print(extractandtranslate())

if __name__ == "__main__":
    app.run(debug=True)
