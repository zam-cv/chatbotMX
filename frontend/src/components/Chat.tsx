import { MessageType } from "../App";

function Example({ content }: { content: String }) {
  return (
    <div className="shadow-lg p-5 rounded-md">
      <div>{content}</div>
    </div>
  );
}

function Feature({ title, content }: { title: string; content: string }) {
  return (
    <div
      className="shadow-xl p-5 rounded-md"
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="text-1xl font-bold mb-3">{title}</div>
      <div>{content}</div>
    </div>
  );
}

function preview() {
  return (
    <div className="flex items-center flex-col md:w-[100%] lg:w-[70%]">
      <div className="flex items-center text-4xl font-bold mb-5 text-center">
        Bienvenido al ChatBot de BYD
      </div>
      <div className="text-2xl font-bold mb-10 mt-5">Caracteristicas</div>
      <div className="grid md:grid-rows-1 md:grid-cols-3 gap-5 mb-10 sm:grid-cols-1 sm:grid-rows-3">
        <Feature
          title="Reconocimiento de imagen"
          content="Utilizando técnicas avanzadas de visión por computadora e inteligencia artificial, nuestro ChatBot puede analizar e interpretar imágenes, permitiéndole entender y responder a consultas relacionadas con el contenido visual."
        />
        <Feature
          title="Lenguaje natural"
          content="Nuestro ChatBot procesa y comprende el lenguaje humano de manera fluida y natural, facilitando una interacción amigable y eficiente. Esto incluye el análisis de la intención, la comprensión del contexto y la generación de respuestas coherentes y relevantes."
        />
        <Feature
          title="Contexto"
          content="La capacidad de entender y recordar el contexto de una conversación es crucial. Nuestro ChatBot mantiene un seguimiento del diálogo para proporcionar respuestas más precisas y personalizadas, mejorando la experiencia del usuario de forma significativa."
        />
      </div>
      <div className="text-2xl font-bold mb-10">Ejemplos</div>
      <div className="grid grid-cols-1 gap-5">
        <Example content="¿Que tanta seguridad tiene mi coche tang?" />
        <Example content="¿Como saber si mi cinturon de seguridad esta bien colocado en mi yuan?" />
        <Example content="¿Cuando se puede activar mi airbag?" />
      </div>
    </div>
  );
}

export function Message({ content, role }: { content: String; role: String }) {
  const isBot = role === "bot" || role === "system";
  const align = isBot ? "justify-end" : "justify-start";

  return (
    <div className={"flex " + align}>
      <div className="bg-slate-200 p-5 rounded-md max-w-[60%]">
        <div>{content}</div>
      </div>
    </div>
  );
}

export default function Chat({
  init,
  history,
}: {
  init: boolean;
  history: MessageType[];
}) {
  if (init) {
    return preview();
  }

  return (
    <div className="md:w-[100%] lg:w-[70%]">
      <div className="flex flex-col gap-5">
        {history.map((message, index) => (
          <Message key={index} content={message.content} role={message.role} />
        ))}
      </div>
    </div>
  );
}
