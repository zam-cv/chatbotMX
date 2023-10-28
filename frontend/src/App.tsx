import "./App.css";
import { useState, useRef, useEffect } from "react";
import Input from "./components/Input";
import Chat from "./components/Chat";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface MessageType {
  content: string;
  role: "bot" | "user" | "system";
}

function App() {
  const [id, setId] = useState<string | null>(null);
  const [init, setInit] = useState(true);
  const [history, setHistory] = useState<MessageType[]>([]);
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const historyParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_APP_HOST_SERVER}/api/history`, { id })
      .then(({ request }) => {
        let json = request?.response ? JSON.parse(request.response) : [];

        if (json.response[0]?.role === "system") {
          json.response.shift();
        }

        setHistory(json.response);
      });
  }, [id])

  useEffect(() => {
    if (!id) {
      let _id = localStorage.getItem("id");

      if (_id) {
        setId(_id);
        setInit(false);
      } else {
        let _id = uuidv4();
        setId(_id);

        axios
          .post(`${import.meta.env.VITE_APP_HOST_SERVER}/api/session`, {
            id: _id,
          })
          .then((_) => {});
      }
    }
  }, []);

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
      setInit(false);
      if (id) localStorage.setItem("id", id);

      setHistory((prev) => [...prev, { content, role: "user" }]);
      setHistory((prev) => [...prev, { content: "...", role: "bot" }]);

      if (inputRef.current) {
        inputRef.current.textContent = "";
      }

      axios
        .post(`${import.meta.env.VITE_APP_HOST_SERVER}/api/input`, {
          input: content,
          id,
        })
        .then(({ request }) => {
          setContent("");
          const json = JSON.parse(request.response);
          setHistory((prev) => prev.slice(0, prev.length - 1));
          setHistory((prev) => [
            ...prev,
            { content: json.response.content, role: "bot" },
          ]);
        });
    }
  };

  return (
    <div className="app h-[calc(100dvh)]">
      <header className="p-3 bg-pink-600">
        <h1 className="text-xl text-center text-white font-bold">ChatBot MX</h1>
      </header>
      <div
        ref={historyParentRef}
        className="content overflow-auto h-full relative"
      >
        <div ref={historyRef} className="chat overflow-auto p-5">
          <Chat init={init} history={history} />
        </div>
        <div className="input">
          <Input
            init={init}
            setContent={setContent}
            sendMessage={sendMessage}
            inputRef={inputRef}
            content={content}
            setHistory={setHistory}
            setInit={setInit}
            id={id}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
