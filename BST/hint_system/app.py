"""
notes: flask backend 

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
from utils.response_parser import parse_hints


app = Flask(__name__)
CORS(app)

@app.route("/generate_hint", methods=["POST"])
def generate_hint():
    """ 
    Function that will generate a hint for the current node in the BST.
    """
    # Extract the data from the input
    data = request.get_json()
    code_context = data.get("code_context")
    current_node = data.get("current_node")
    print(f'current node: {current_node}')
    
    previous_hints = data.get("previous_hints")
    print(f'previous hints: {previous_hints}')

    # Build the prompt for the LLM
    build_prompt = llm_prompt(code_context, current_node, previous_hints)
    # Call the LLM agent with the prompt
    llm_output = generate_hints(build_prompt)
    print(f'llm output: {llm_output}')
    # Split the hints output into a dictionary
    hints_dict = parse_hints(llm_output)

    return jsonify({"hint_output": hints_dict})


if __name__ == "__main__":
    app.run(debug=True)
