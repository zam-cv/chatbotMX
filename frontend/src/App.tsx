import "./App.css";
import { useState, useRef } from "react";
import Input from "./components/Input";
import Chat from "./components/Chat";

function App() {
  const [init, setInit] = useState(false);
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (content !== "") {
      console.log(content);
      setContent("");

      if (inputRef.current) {
        inputRef.current.textContent = "";
      }
    }
  };

  return (
    <div className="app h-[calc(100dvh)]">
      <header className="p-3 bg-pink-600">
        <h1 className="text-xl text-center text-white font-bold">ChatBot MX</h1>
      </header>
      <div className="content overflow-auto h-full">
        <div className="chat bg-slate-200 p-10 overflow-auto">
          <Chat init={init} />
        </div>
        <div className="input">
          <Input
            setContent={setContent}
            sendMessage={sendMessage}
            inputRef={inputRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
