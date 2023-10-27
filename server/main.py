import os
import openai

os.environ["OPENAI_API_KEY"] = ""

openai.organization = "org-ZUpYMTHhum6EVRWVWNIYhheJ"
openai.api_key = os.getenv("OPENAI_API_KEY")

prompt = "Dame 10 nombres de paises"

response = openai.Completion.create(
  model="text-davinci-003",
  prompt=prompt,
  temperature=0.7,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

print(response)