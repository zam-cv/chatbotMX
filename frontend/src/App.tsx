import "./App.css";
import { useState } from "react";
import Input from "./components/Input";
import Chat from "./components/Chat";

function App() {
  const [init, setInit] = useState(false);

  return (
    <div className="app h-[calc(100dvh)]">
      <header className="p-3 bg-pink-600">
        <h1 className="text-xl text-center text-white font-bold">
          ChatBot MX
        </h1>
      </header>
      <div className="content">
        <div className="chat bg-slate-200 p-10">
          <Chat init={init} />
        </div>
        <div className="input">
          <Input />
        </div>
      </div>
    </div>
  );
}

export default App;
