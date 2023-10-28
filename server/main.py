from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = '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'

@app.route('/api', methods=['POST'])
def api():
    user_input = request.json.get('input', '')

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": user_input}
        ]
    )

    response_message = response["choices"][0]["message"]

    return jsonify(response=response_message)

app.run(debug=True)