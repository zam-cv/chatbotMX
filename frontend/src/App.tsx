import "./App.css";
import { useState, useRef, useEffect } from "react";
import Input from "./components/Input";
import Chat from "./components/Chat";
import axios from "axios";

export interface MessageType {
  content: string;
  type: "bot" | "user";
}

function App() {
  const [init, setInit] = useState(false);
  const [history, setHistory] = useState<MessageType[]>([]);
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const historyParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.textContent = content;
    }
  }, [content]);

  useEffect(() => {
    if (historyRef.current && historyParentRef.current) {
      historyRef.current.scrollTo(0, historyRef.current.scrollHeight);
    }
  }, [content]);

  const sendMessage = () => {
    if (content !== "") {
      setHistory((prev) => [...prev, { content, type: "user" }]);

      if (inputRef.current) {
        inputRef.current.textContent = "";
      }

      axios
        .post(`${import.meta.env.VITE_APP_HOST_SERVER}/api`, { input: content })
        .then(({ request }) => {
          setContent("");
          const json = JSON.parse(request.response);
          setHistory((prev) => [
            ...prev,
            { content: json.response.content, type: "bot" },
          ]);
        });
    }
  };

  return (
    <div className="app h-[calc(100dvh)]">
      <header className="p-3 bg-pink-600">
        <h1 className="text-xl text-center text-white font-bold">ChatBot MX</h1>
      </header>
      <div ref={historyParentRef} className="content overflow-auto h-full">
        <div ref={historyRef} className="chat bg-slate-200 overflow-auto p-5">
          <Chat init={init} history={history} />
        </div>
        <div className="input">
          <Input
            setContent={setContent}
            sendMessage={sendMessage}
            inputRef={inputRef}
            content={content}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
