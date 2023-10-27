import "./App.css";
import Input from "./components/Input";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <header className="p-5 bg-pink-600 m">
        <h1 className="text-3xl text-center text-white font-bold">
          ChatBot MX
        </h1>
      </header>
      <div className="content">
        <div className="chat">
          <Chat />
        </div>
        <div className="input">
          <Input />
        </div>
      </div>
    </>
  );
}

export default App;
