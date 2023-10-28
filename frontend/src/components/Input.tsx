import { MessageType } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const recognition = new window.webkitSpeechRecognition();

export default function Input({
  init,
  setContent,
  sendMessage,
  inputRef,
  content,
  setHistory,
  setInit,
  id,
  fileRef,
  imgRef,
  isLoad,
  setIsLoad,
}: {
  init: boolean;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
  content: string;
  setHistory: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setInit: React.Dispatch<React.SetStateAction<boolean>>;
  id: null | string;
  fileRef: React.MutableRefObject<HTMLInputElement | null>;
  imgRef: React.MutableRefObject<HTMLImageElement | null>;
  isLoad: boolean;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
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

  const clear = () => {
    if (!id) return;

    axios
      .post(`${import.meta.env.VITE_APP_HOST_SERVER}/api/clear`, { id })
      .then((_) => {
        setHistory([]);
        setInit(true);
        localStorage.removeItem("id");
      });
  };

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

  const loadImage = () => {
    if (fileRef.current) {
      fileRef.current.click();

      fileRef.current.onchange = () => {
        if (fileRef.current && imgRef.current) {
          const file = fileRef.current.files?.item(0);
          if (!file) return;

          const reader = new FileReader();

          reader.addEventListener("load", () => {
            imgRef.current!.src = reader.result as string;
          });

          reader.readAsDataURL(file);
          setIsLoad(true);
        }
      };
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  };

  let buttons = init
    ? "grid-cols-[auto_1fr_auto_auto]"
    : "grid-cols-[auto_auto_1fr_auto_auto]";

  return (
    <div className="flex justify-center items-center w-full h-full p-5">
      <div
        className={`lg:w-[55%] md:w-[90%] sm:w-[100%] w-[100%] grid grid-rows-1 ${buttons} gap-5`}
      >
        {!init ? (
          <span
            onClick={clear}
            className="bg-slate-200 p-3 h-fit cursor-pointer"
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </span>
        ) : null}
        <span
          onClick={loadImage}
          className={`bg-slate-200 p-3 h-fit cursor-pointer ${
            isLoad ? "text-blue-500" : ""
          }`}
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <input ref={fileRef} type="file" name="image" className="hidden" />
          <img ref={imgRef} className="hidden" />
        </span>
        <div
          ref={inputRef}
          className="bg-slate-200 p-3 outline-none overflow-auto"
          contentEditable
          onInput={(e) => setContent(e.currentTarget.textContent || "")}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          style={{ overflowWrap: "anywhere", maxHeight: "150px" }}
          placeholder="Escribe aquí..."
        ></div>
        <span
          className="bg-slate-200 p-3 h-fit cursor-pointer"
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
          className="bg-slate-200 p-3 h-fit cursor-pointer"
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
