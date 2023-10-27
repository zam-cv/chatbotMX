function Example({ content }: { content: String }) {
  return (
    <div className="bg-slate-400 p-5 rounded-md">
      <div>{content}</div>
    </div>
  )
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

export default function Chat({ init }: { init: boolean }) {
  if (init) {
    return preview();
  }

  return <div className="content-center"></div>;
}
