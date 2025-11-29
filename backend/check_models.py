# Em: check_models.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega a chave de API do arquivo .env
load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    print("Erro: Chave GEMINI_API_KEY não encontrada no .env")
else:
    try:
        genai.configure(api_key=GEMINI_API_KEY)

        print("Buscando modelos disponíveis para sua chave de API...")
        print("="*30)

        # Lista todos os modelos que suportam 'generateContent'
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)

        print("="*30)
        print("Copie um dos nomes de modelo acima (ex: 'models/gemini-1.0-pro') e cole no seu main.py")

    except Exception as e:
        print(f"Ocorreu um erro ao buscar modelos: {e}")