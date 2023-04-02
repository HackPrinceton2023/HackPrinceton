ReadMe for HackPrinceton 2023 project repository

Steps to run the Flask app:
1) Navigate to the backend file, `cd backend/`
2) For MacOS/Unix, please create a virtual environment by running `python3 -m venv env`. For windows, please run `py -m venv env`
3) Please install all the requirements listed in the requirements file by running `pip install -r requirements.txt` command
4) Then, run `python index.py` to run the Flask App

For step 2 above, here are some additional instructions if you don't have virtualenv installed: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/

Steps to run the React app:
1) Navigate to the frontend file, `cd frontend/`
2) `npm install`
2) `npm install vite`
3) `npm run dev` to run the frontend  



Citations:
For this Python Flask app, we mainly utilized Python, HTML/CSS, Javascript (React). We specifically used various different  Python pretrained models from open source HuggingFace website. Please find below the citations for the pretrained models we used from HuggingFace and OpenAI. Additionally, we also worked with libraries like OpenCV (https://github.com/opencv/opencv/tree/4.7.0), pytesseract, langdetect, and googletrans.


SalesForce BLIP Image Captioning Model Citation from HuggingFace -https://huggingface.co/Salesforce/blip-image-captioning-base

@misc{https://doi.org/10.48550/arxiv.2201.12086,
  doi = {10.48550/ARXIV.2201.12086},
  
  url = {https://arxiv.org/abs/2201.12086},
  
  author = {Li, Junnan and Li, Dongxu and Xiong, Caiming and Hoi, Steven},
  
  keywords = {Computer Vision and Pattern Recognition (cs.CV), FOS: Computer and information sciences, FOS: Computer and information sciences},
  
  title = {BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation},
  
  publisher = {arXiv},
  
  year = {2022},
  
  copyright = {Creative Commons Attribution 4.0 International}
}


Sentence Similarity Model from HuggingFace - https://huggingface.co/hiiamsid/sentence_similarity_spanish_es
@inproceedings{CaneteCFP2020,
  title={Spanish Pre-Trained BERT Model and Evaluation Data},
  author={Cañete, José and Chaperon, Gabriel and Fuentes, Rodrigo and Ho, Jou-Hui and Kang, Hojin and Pérez, Jorge},
  booktitle={PML4DC at ICLR 2020},
  year={2020}
}

“Hiiamsid/sentence_similarity_spanish_es.” HuggingFace, https://huggingface.co/hiiamsid/sentence_similarity_spanish_es. 



OpenAI ChatGPT API - https://platform.openai.com/docs/guides/chat

OpenCV - https://github.com/opencv/opencv/tree/4.7.0

Tesseract - https://github.com/tesseract-ocr/tesseract
