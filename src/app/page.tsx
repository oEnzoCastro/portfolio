export default function Home() {
  return (
    <div className="text-white flex flex-col justify-center items-center">
      <div className="flex flex-col h-dvh justify-center items-center">
        <h1 className="font-bold text-[8dvw] md:text-[5dvw] text-nowrap">
          Enzo Castro Figueredo
        </h1>
        <div className="flex justify-between font-medium bg-black/25 text-center rounded">
          <h2 className="text-[2dvw] md:text-[1dvw]">
            Cientista da Computação
          </h2>
          <h2 className="text-[2dvw] md:text-[1dvw]">
            Desenvolvedor FullStack
          </h2>
          <h2 className="text-[2dvw] md:text-[1dvw]">Team Leader</h2>
          <h2 className="text-[2dvw] md:text-[1dvw]">Desenvolvedor Mobile</h2>
        </div>
      </div>
      <div className="h-dvh w-full backdrop-blur-md bg-black/25 border-t-2"></div>
    </div>
  );
}
