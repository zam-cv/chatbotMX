import { useEffect, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const recognition = new window.webkitSpeechRecognition();

export default function Input({
  setContent,
  sendMessage,
  inputRef,
  content,
}: {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
  content: string;
}) {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.textContent = content + " " + transcript;
    }
  }, [transcript]);

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
      console.log("El reconocimiento de voz está activo.");
    };

    recognition.onerror = function (event: any) {
      console.error("Error en el reconocimiento de voz:", event.error);
    };

    recognition.onend = function () {
      console.log("El reconocimiento de voz ha finalizado.");
    };

    recognition.onresult = function (event: any) {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);
    };
  }, []);

  const start = () => {
    recognition.start();
    setListening(true);
  };

  const stop = () => {
    recognition.stop();
    setListening(false);

    setContent(content + " " + transcript);
    setTranscript("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-5">
      <div className="lg:w-[50%] md:w-[80%] sm:w-[100%] w-[100%] grid grid-rows-1 grid-cols-[auto_1fr_auto_auto] gap-5">
        <span className="bg-slate-300 p-3 h-fit cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </span>
        <div
          ref={inputRef}
          className="bg-slate-300 p-3 outline-none overflow-auto"
          contentEditable
          onInput={(e) => setContent(e.currentTarget.textContent || "")}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{ overflowWrap: "anywhere", maxHeight: "150px" }}
          placeholder="Escribe aquí..."
        ></div>
        <span
          className="bg-slate-300 p-3 h-fit cursor-pointer"
          onClick={!listening ? start : stop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </span>
        <span
          className="bg-slate-300 p-3 h-fit cursor-pointer"
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
