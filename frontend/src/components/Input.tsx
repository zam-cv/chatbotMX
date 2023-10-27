export default function Input() {
  return (
    <div className="flex justify-center items-center w-full h-full pr-5 pl-5">
      <div className="lg:w-[50%] md:w-[80%] sm:w-[100%] w-[100%] grid grid-rows-1 grid-cols-[1fr_80px] gap-5">
        <div className="bg-slate-300 p-3">input</div>
        <div className="bg-slate-300 p-3">send</div>
      </div>
    </div>
  );
}
