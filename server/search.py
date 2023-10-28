import PyPDF2

description_content = "La siguiente pregunta la deberás de resolver en base a la información proporcionada."
description_sub = "Dame los números de los índices que tienen mayor relación con la pregunta siguiente del usuario, debes darlo con números enteros separados por comas. Los índices son los siguientes:"

def readPDF(file, fromPage, toPage):
    try:
        with open(file, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            return "\n".join([reader.pages[page].extract_text() for page in range(fromPage - 1, toPage) if page < len(reader.pages)])
    except (PyPDF2.PdfReaderError, FileNotFoundError) as e:
        print(f"Error al leer el archivo: {e}")
        return ""

def verifySub(question, subs, openai):
    formatted_subs = [f"{i}. {sub}" for i, sub in enumerate(subs.split(", "))]
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": description_sub + "\n" + "\n".join(formatted_subs)},
            {"role": "user", "content": question}
        ]
    )

    subs_indices = response["choices"][0]["message"].content.split(",")
    return [int(sub.strip()) for sub in subs_indices if sub.strip().isdigit()]

def search(question, childrens, openai):
    subs = [child["sub"] for child in childrens if "sub" in child]
    selected_indices = verifySub(question, ", ".join(subs), openai)

    data = []
    for i in selected_indices:
        child = childrens[i]
        if "keywords" in child:
            info = readPDF("../assets/pdfs/" + file, *child["content"])
            info2 = readPDF("../assets/pdfs/" + file2, *child["content"])
            info3 = readPDF("../assets/pdfs/" + file3, *child["content"])
            if info:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {"role": "user", "content": description_content},
                        {"role": "user", "content": "La siguiente información habla del modelo tang-ev: " + info},
                        {"role": "user", "content": question}
                    ]
                )
                data.append(response["choices"][0]["message"].content)
            elif info2:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {"role": "user", "content": description_content},
                        {"role": "user", "content": "La siguiente información habla del modelo han-ev: " + info},
                        {"role": "user", "content": question}
                    ]
                )
                data.append(response["choices"][0]["message"].content)
            elif info3:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {"role": "user", "content": description_content},
                        {"role": "user", "content": "La siguiente información habla del modelo yuan-plus-ev: " + info},
                        {"role": "user", "content": question}
                    ]
                )
                data.append(response["choices"][0]["message"].content)
        else:
            data.extend(search(question, child.get("childrens", []), openai))

    return data

file = "tang-ev.pdf"
file2 = "han-ev.pdf"
file3 = "yuan-plus-ev.pdf"