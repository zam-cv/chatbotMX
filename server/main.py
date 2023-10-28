from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Configure your OpenAI API key (it's better to use an environment variable for this in a production environment)
openai.api_key = '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'

@app.route('/api', methods=['POST'])
def api():
    # Get user input from the request
    user_input = request.json.get('input', '')

    # Send user input to OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": user_input}
        ]
    )

    response_message = response["choices"][0]["message"]

    return jsonify(response=response_message)

app.run(debug=True)