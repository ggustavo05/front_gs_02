"use client";

import Link from "next/link";
import Image from "next/image";
import OrientationCard from "@/components/OrientationCard/orientationCard";
import logo from "@/assets/logo.png";

const casa = "/assets/icone-casa.svg";
const nuvem = "/assets/icone-nuvem.svg";

export default function OrientacoesPage() {
  return (
    <main className="bg-[#f7f7f7] min-h-screen flex flex-col items-center pb-10">
      {/* Header com seta e logo */}
      <div className="w-full bg-[#446EA4] py-4 px-4 flex items-center">
        <Link href="/">
          <button>
            <svg
              className="text-white w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>

        <div className="flex-1 flex justify-center -ml-6">
          <Image src={logo} alt="Logo SOS Localiza" width={200} height={40} />
        </div>
      </div>

      {/* Título e Texto */}
      <h1 className="text-[#446EA4] font-bold text-lg mt-6">Orientações de Segurança</h1>
      <p className="text-center text-[#446EA4] font-semibold text-sm px-6 mt-2 max-w-xs">
        O <span className="text-[#F57200]">S.O.S LOCALIZA</span> disponibiliza abaixo
        orientações sobre os principais eventos adversos para os devidos cuidados,
        a fim de evitar danos e prejuízos à população
      </p>

      {/* Cards */}
      <div className="mt-6 space-y-6">
        <OrientationCard
          titulo="Tempestades, raios e granizos"
          imagem={nuvem}
          href="/orientacoes/tempestades"
        />
        <OrientationCard
          titulo="Inundações"
          imagem={casa}
          href="/orientacoes/inundacoes"
        />
      </div>
    </main>
  );
}
