import "./App.css";
import Input from "./components/Input";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="app h-screen w-screen">
      <header className="p-5 bg-pink-600 m">
        <h1 className="text-3xl text-center text-white font-bold">
          ChatBot MX
        </h1>
      </header>
      <div className="content">
        <div className="chat bg-slate-200">
          <Chat />
        </div>
        <div className="input">
          <Input />
        </div>
      </div>
    </div>
  );
}

export default App;
