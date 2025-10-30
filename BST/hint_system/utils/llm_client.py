"the llm function that will be used generating the hints"

import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_hints(code_context, node_state, previous_hints, hint_number):
    pass
