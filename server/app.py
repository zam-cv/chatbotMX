from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Configure your OpenAI API key (it's better to use an environment variable for this in a production environment)
openai.api_key = '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'

@app.route('/api', methods=['POST'])
def api():
    # Get user input from the request
    user_input = request.json.get('user_input', '')

    # Send user input to OpenAI API
    completion = openai.Completion.create(
        engine="text-davinci-003",
        prompt=user_input,
        max_tokens=150
    )

    # Get the response from OpenAI API
    response_text = completion.choices[0].text.strip()

    # Return the response to the client
    return jsonify(response=response_text)

if __name__ == '_main_':
    app.run(debug=True)