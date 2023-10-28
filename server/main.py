from flask import Flask, request, jsonify
from flask_cors import CORS
from search import search
import openai
import json

app = Flask(__name__)
CORS(app)


openai.api_key = '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'

verify = "tienes que verificar si en la conversacion se habla sobre coches, especificamente de los modelos han, tang, yuan de BYD, si es asi, me tienes que devolver la palabra 'True', de ser lo contrario devuelve 'False'"
context = """Lo siguiente es una conversación con un chatbot. El asistente es servicial, creativo, inteligente y muy amigable."""
memory = {}

@app.route('/api/history', methods=['POST'])
def history():
    id = request.json.get('id', '')
    return jsonify(response=memory.get(id, []))

@app.route('/api/session', methods=['POST'])
def session():
    id = request.json.get('id', '')
    memory[id] = [
        {"role": "system", "content": context}
    ]
    
    return jsonify(response="")

@app.route('/api/input', methods=['POST'])
def api():
    data = request.json
    id = data.get('id', '')
    user_input = data.get('input', '')

    response = openai.ChatCompletion.create(
          model="gpt-3.5-turbo-0613",
          messages=[
            {"role": "system", "content": verify},
            {"role": "user", "content": user_input},
          ]
      )

    is_auto = response["choices"][0]["message"].content

    if is_auto == "True":
        childrens = json.load(open("../assets/data/tang.json"))
        data = search(user_input, childrens, openai)
        print("DATA")
        print(data)

        if id not in memory:
            memory[id] = []
        
        memory[id].append(
            {"role": "system", "content": "Considera la siguiente informacion para responder la pregunta del usuari, la informacion proviene de un auto modelo tang: " + "\n".join(data)})
        memory[id].append(
            {"role": "user", "content": user_input})

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=memory[id]
        )

        response_message = response["choices"][0]["message"]
        memory[id].append({"role": "system", "content": response_message.content})

        return jsonify(response=response_message)
    else:
        return jsonify(response={ "content": "No puedo responder preguntas que no esten relacionadas con BYD" })    # return jsonify(response=response_message)

@app.route('/api/clear', methods=['POST'])
def clear():
    id = request.json.get('id', '')

    memory[id] = [
        {"role": "system", "content": context}
    ]

    return jsonify(response="")

app.run(debug=True)