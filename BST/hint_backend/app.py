"""
flask backend 

-will accept request containign the line, step, code state
- containing the previous hints history?
- calls the llm
- returns 5 structured hints 
- returns as json to the frontend

"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.llm_client import generate_hints

app = Flask(__name__)
CORS(app)

@app.route("/generate_hint", methods=["POST"])
def generate_hint():
    """
    function docstring
    """
    pass




if __name__ == "__main__":
    app.run(debug=True)
