"""
flask backend 

- will accept request containign the line, step, code state
- containing the previous hints history?
- calls the llm
- returns 5 structured hints 
- returns as json to the frontend
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.llm_client import generate_hints
from utils.prompt_builder import llm_prompt

app = Flask(__name__)
CORS(app)

@app.route("/generate_hint", methods=["POST"])
def generate_hint():
    """
    function docstring
    """
    # Extract the data from the input
    data = request.get_json()
    code_context = data.get("code_context")
    current_node = data.get("current_node")
    previous_hints = data.get("previous_hints")

    # Build the LLM prompt
    prompt = llm_prompt(code_context, current_node, previous_hints)


if __name__ == "__main__":
    app.run(debug=True)
