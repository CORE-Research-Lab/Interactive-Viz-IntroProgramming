from flask import Flask, request, jsonify
from flask_cors import CORS 
from utils.llm_client import generate_hints
from utils.prompt_builder import llm_prompt
from utils.response_parser import parse_hints
import os

app = Flask(__name__)
CORS(app) #allows for cross origin requests from the frontend

@app.route("/generate_hint", methods=["POST"])
def generate_hint():
    """ 
    API endpoint that generates scaffolded hints based on current BST search step.
    Receives code context, current node, and hint usage information.
    """
    #1. Extract the data from the input
    data = request.get_json()
    code_context = data.get("code_context")
    current_node = data.get("current_node")
    print(f'current node: {current_node}')
    previousAvgHintUsage = data.get("previousAvgHintUsage")
    print(f'Previous avg hint usage: {previousAvgHintUsage}')

    #2. Build the prompt for the LLM
    build_prompt = llm_prompt(code_context, current_node, previousAvgHintUsage)

    #3. Call the LLM agent with the prompt
    llm_output = generate_hints(build_prompt)
    print(f'llm output: {llm_output}')
    
    #4. Split the hints output into a dictionary
    hints_dict = parse_hints(llm_output)

    return jsonify({"hint_output": hints_dict})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
