import "./App.css";
import { useState, useRef, useEffect } from "react";
import Input from "./components/Input";
import Chat from "./components/Chat";
import Assets from "./components/Assets";
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
  const [isLoad, setIsLoad] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const historyParentRef = useRef<HTMLDivElement>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
  }, [id]);

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

      let image = "";

      if (imgRef.current) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = imgRef.current.width;
        canvas.height = imgRef.current.height;

        ctx.drawImage(imgRef.current, 0, 0);

        const data = canvas.toDataURL("image/png");
        const base64Image = data.split(",")[1];
        image = base64Image;
      }

      axios
        .post(`${import.meta.env.VITE_APP_HOST_SERVER}/api/input`, {
          input: content,
          image,
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
          setIsLoad(false);
        });
    }
  };

  return (
    <div className="app h-[calc(100dvh)]">
      <header
        className="p-3 flex relative justify-center"
        style={{
          backgroundColor: "#e10298",
          boxShadow: "#808080c4 1px -5px 20px 15px",
        }}
      > 
        <div className="absolute left-0" style={{ paddingLeft: "5px", marginLeft: "5px" }}>
          <img src="/liverpool.png" width={40} height={30} />
        </div>
        <h1 className="text-2xl text-center text-white font-bold">
          ChatBot MX
        </h1>
      </header>
      <div
        ref={historyParentRef}
        className="content overflow-auto h-full relative"
      >
        <div ref={historyRef} className="chat flex justify-center overflow-auto p-5 pt-10">
          <Chat init={init} history={history} />
        </div>
        <div>
          <Assets />
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
            fileRef={fileRef}
            imgRef={imgRef}
            isLoad={isLoad}
            setIsLoad={setIsLoad}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
