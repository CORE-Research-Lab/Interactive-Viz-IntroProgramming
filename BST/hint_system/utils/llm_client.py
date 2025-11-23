import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

#Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_hints(prompt_text):
    """
    Function that will call the LLM model to generate a response, creating the 
    required hints
    """
    try:
        model = genai.GenerativeModel(
            "gemini-2.5-flash-lite",
            generation_config={
                "temperature": 0.7,
                "max_output_tokens": 1000,
            })
        response = model.generate_content(prompt_text)
        return response.text.strip()
    except Exception as e:
        print(f"Error generating hints: {e}")
        return f"Error generating hints: {str(e)}"