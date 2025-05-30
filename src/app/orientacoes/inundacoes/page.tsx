"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function InundacoesPage() {
  return (
    <main className="bg-[#f7f7f7] min-h-screen pb-10 flex flex-col items-center">
     <div className="w-full bg-[#446EA4] py-4 px-4 flex justify-between items-center relative">
      {/* 🔙 Seta de voltar com área clicável centralizada */}
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

      {/* 🧭 Logo centralizada com position absolute */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Image src={logo} alt="Logo SOS Localiza" width={200} height={40} />
      </div>

      {/* Espaço de equilíbrio do lado direito (mesmo tamanho da seta) */}
      <div className="w-10 h-10" />
    </div>
  );


      {/* Título principal */}
      <h1 className="text-[#F67300] font-bold text-xl mt-6">INUNDAÇÕES</h1>

      {/* Imagem do evento */}
      <img
        src="/assets/img-inundacoes.jpg"
        alt="Imagem de inundações"
        className="mt-4 w-[90%] rounded-md"
      />

     {/* Ícone da casa em círculo azul escuro, com mesmo tamanho anterior */}
<div className="bg-[#1B547D] rounded-full w-16 h-16 -mt-8 mb-4 flex items-center justify-center shadow-md">
  <img src="/assets/icone-casa.svg" alt="Ícone casa" className="w-10 h-10" />
</div>



      {/* Texto explicativo */}
      <div className="px-6 text-justify space-y-4 text-sm max-w-md">
        <p className="text-[#446EA4] font-semibold">
          Inundações consistem na concentração de águas de chuva devido à ineficiência de
          absorção pelo solo ou outras formas de escoamento. Algumas causas que contribuem
          para esse evento são o desmatamento de encostas; assoreamento dos rios; acúmulo
          de lixo nos bueiros e rios; insuficiência da rede de galerias pluviais; e
          pavimentação de ruas e construção de calçadas, reduzindo a superfície de infiltração.
        </p>

        {/* Fique alerta */}
        <div>
          <h2 className="text-[#F67300] font-bold mb-1">Fique alerta:</h2>
          <p className="text-[#446EA4] font-semibold">
            A elevação do nível da água ocorre rapidamente, não se arrisque! Procure um
            terreno ou andar mais alto; <br />
            Não ande ou dirija em áreas de inundação. Entrar nas águas pode resultar em
            ferimentos ou morte.
          </p>
        </div>

        {/* O que fazer antes */}
        <div>
          <h2 className="text-[#F67300] font-bold mb-1">O que fazer antes:</h2>
          <p className="text-[#446EA4] font-semibold">
            É importante ter definido um lugar seguro onde você e sua família possam se
            abrigar; <br />
            Coloque documentos e objetos de valor em sacos plásticos bem fechados e em local protegido. <br />
            Ao sinal de inundação, deixe móveis, eletrodomésticos, produtos de limpeza e
            alimentos fora do alcance da água;
          </p>
        </div>
      </div>
    </main>
  );
}
