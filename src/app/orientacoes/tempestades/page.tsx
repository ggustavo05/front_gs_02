"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function TempestadesPage() {
  return (
    <main className="bg-[#f7f7f7] min-h-screen pb-10 flex flex-col items-center">
      {/* Header com layout mais seguro para o clique funcionar */}
<div className="w-full bg-[#446EA4] py-4 px-4 flex justify-between items-center relative">
  {/* Seta */}
  <Link href="/orientacoes">
    <div className="w-10 h-10 flex items-center justify-center text-white">
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  </Link>

  {/* Logo centralizada */}
  <div className="absolute left-1/2 transform -translate-x-1/2">
    <Image src={logo} alt="Logo SOS Localiza" width={200} height={40} />
  </div>

  {/* Espaço pra equilibrar a seta no lado direito */}
  <div className="w-10 h-10" />
</div>


      {/* Título */}
      <h1 className="text-[#F67300] font-bold text-xl mt-6">TEMPESTADES</h1>

      {/* Imagem da tempestade */}
      <img
        src="/assets/img-tempestades.jpg"
        alt="Imagem de tempestades"
        className="mt-4 w-[90%] rounded-md"
      />

      {/* Ícone da nuvem em círculo azul escuro */}
      <div className="bg-[#1B547D] rounded-full w-16 h-16 -mt-8 mb-4 flex items-center justify-center shadow-md">
        <img src="/assets/icone-nuvem.svg" alt="Ícone nuvem" className="w-10 h-10" />
      </div>

      {/* Texto explicativo */}
      <div className="px-6 text-justify space-y-4 text-sm max-w-md">
        <p className="text-[#446EA4] font-semibold">
          Tempestades são marcadas por ventos fortes e intensa precipitação. São características
          do verão, podendo vir acompanhadas de trovoadas e raios, que são uma das principais
          causas de lesões e mortes devido a riscos relacionados ao clima.
        </p>
        <p className="text-[#446EA4] font-semibold">
          Os raios são mais comuns no verão, mas podem ocorrer no inverno e, ao contrário do que
          muitos pensam, podem cair duas ou mais vezes no mesmo lugar, normalmente atingindo o
          objeto mais alto de um determinado local.
        </p>
        <p className="text-[#446EA4] font-semibold">
          Já as chuvas de granizo acontecem devido à queda brusca de temperatura, responsável
          pela formação de pedras de gelo no interior das nuvens.
        </p>

        {/* O que fazer antes */}
        <div>
          <h2 className="text-[#F67300] font-bold mb-1">O que fazer antes:</h2>
          <ul className="list-disc text-[#446EA4] font-semibold ml-5 space-y-1">
            <li>
              Conheça o risco da sua região para tempestades. Na maioria dos lugares, elas podem
              ocorrer durante todo o ano e a qualquer hora;
            </li>
            <li>Conclua construções mal-acabadas;</li>
            <li>
              Evite cobrir edificações com telhas de zinco, pois são danificadas mais facilmente
              pelas chuvas;
            </li>
            <li>
              Faça manutenção no madeiramento do telhado para não ocorrer deslizamento em razão
              das chuvas;
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
