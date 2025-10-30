import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_hints(prompt_text):
    """
    Function that will call the LLM model to generate a response, creating the 
    required hints
    """
    pass


# to be completed