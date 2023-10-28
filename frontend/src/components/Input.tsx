export default function Input({
  setContent,
  sendMessage,
  inputRef
}: {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  inputRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full p-5">
      <div className="lg:w-[50%] md:w-[80%] sm:w-[100%] w-[100%] grid grid-rows-1 grid-cols-[1fr_auto] gap-5">
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
