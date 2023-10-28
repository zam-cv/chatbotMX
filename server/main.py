from flask import Flask, request, jsonify
from flask_cors import CORS
from search import search
from recognition.system import predict
import openai
import json
import base64
from PIL import Image
from io import BytesIO
import uuid
import os

myuuid = uuid.uuid4()
app = Flask(__name__)
CORS(app)

openai.api_key = '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'

context = """Saludos, te presento tu función. Eres un chatbot denominado ChatbotMX, diseñado para optimizar la comunicación entre los clientes de Liverpool y BYD. Tu objetivo principal es simplificar tanto el proceso de preventa como el de postventa. Durante la preventa, si un cliente solicita una cita para una prueba de manejo, debes proporcionar una ubicación ficticia en un establecimiento de Liverpool dentro de México. Además, cuentas con acceso a tres manuales técnicos de los vehículos BYD disponibles en Liverpool. Si un cliente requiere información técnica, consulta estos manuales para resolver sus dudas. En la etapa de postventa, tu función es asistir a los clientes en comprender cualquier situación relacionada con su vehículo y las garantías asociadas."""
memory = {}
history = {}

@app.route('/api/history', methods=['POST'])
def his():
    id = request.json.get('id', '')
    return jsonify(response=history.get(id, []))

@app.route('/api/session', methods=['POST'])
def session():
    id = request.json.get('id', '')
    memory[id] = [
        {"role": "system", "content": context}
    ]
    history[id] = []
    
    return jsonify(response="")

@app.route('/api/input', methods=['POST'])
def api():
    data = request.json
    id = data.get('id', '')
    user_input = data.get('input', '')
    image = data.get('image', '')
    tags = []

    if image != '':
        image_data = base64.b64decode(image)

        image_directory = os.path.join(os.getcwd(), "storage")
        image_path = os.path.join(image_directory, f"{myuuid}.jpg")

        with Image.open(BytesIO(image_data)) as img:
            img.convert('RGB').save("../storage/" + str(myuuid) + ".jpg", 'JPEG')
            predictions = predict.predict("../storage/" + str(myuuid) + ".jpg")
            
            for prediction in predictions:
                tags.append(prediction["tagName"])

    # childrens = json.load(open("../assets/data/tang.json"))
    childrens = json.load(open("../assets/data/all.json"))
    sections = [
        { "file": "tang-ev.pdf", "content": childrens[1]["childrens"] },
        { "file": "han-ev.pdf", "content": childrens[0]["childrens"] },
        { "file": "yuan-plus-ev.pdf", "content": childrens[2]["childrens"] },
    ]

    data1 = search(user_input, sections[0]["content"], openai, sections[0]["file"])
    data2 = search(user_input, sections[1]["content"], openai, sections[1]["file"])
    data3 = search(user_input, sections[2]["content"], openai, sections[2]["file"])

    data = data1 + data2 + data3

    if id not in memory:
        memory[id] = []

    if id not in history:
        history[id] = []

    if len(tags) > 0:
        print("TAGS")
        memory[id].append({"role": "user", "content": "Simula que se te envia una imagen, ofrece detalles sobre ella con los siguientes tags: " + ", ".join(tags)})

    memory[id].append(
        {"role": "user", "content": "Considera la siguiente informacion para responder la pregunta del usuario: " + "\n".join(data)})
    memory[id].append(
        {"role": "user", "content": user_input})
    history[id].append({"role": "user", "content": user_input})

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=memory[id]
    )

    response_message = response["choices"][0]["message"]
    memory[id].append({"role": "system", "content": response_message.content})
    history[id].append({"role": "system", "content": response_message.content})

    return jsonify(response=response_message)

@app.route('/api/clear', methods=['POST'])
def clear():
    id = request.json.get('id', '')

    memory[id] = [
        {"role": "system", "content": context}
    ]
    history[id] = []

    return jsonify(response="")

app.run(debug=True)