import { MessageType } from "../App";

function Example({ content }: { content: String }) {
  return (
    <div className="bg-slate-400 p-5 rounded-md">
      <div>{content}</div>
    </div>
  );
}

function Feature({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-slate-400 p-10 rounded-md">
      <div className="text-1xl font-bold">{title}</div>
      <div>{content}</div>
    </div>
  );
}

function preview() {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="text-2xl font-bold mb-10">Bienvenido a ChatBot MX</div>
      <div className="grid grid-rows-1 grid-cols-3 gap-10 mb-10">
        <Feature title="Estadísticas" content="Contenido" />
        <Feature title="Imagenes" content="Contenido" />
        <Feature title="Noticias" content="Contenido" />
      </div>
      <div className="text-2xl font-bold mb-10">Ejemplos</div>
      <div className="grid grid-cols-1 gap-10">
        <Example content="¿.......................?" />
        <Example content="¿.......................?" />
        <Example content="¿.......................?" />
      </div>
    </div>
  );
}

export function Message({ content, role }: { content: String; role: String }) {
  const isBot = role === "bot" || role === "system";
  const align = isBot ? "justify-end" : "justify-start";

  return (
    <div className={"flex " + align}>
      <div className="bg-slate-400 p-5 rounded-md">
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
    <div className="md:w-[100%] lg:w-[70%] m-auto">
      <div className="flex flex-col gap-5">
        {history.map((message, index) => (
          <Message key={index} content={message.content} role={message.role} />
        ))}
      </div>
    </div>
  );
}
