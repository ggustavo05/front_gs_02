"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrientationCard from "@/components/OrientationCard/orientationCard";
import logo from "@/assets/logo.png";

// Caminho para os SVGs (armazenados em /public/assets)
const casa = "/assets/icone-casa.svg";
const nuvem = "/assets/icone-nuvem.svg";

export default function OrientacoesPage() {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // Detecta se há histórico de navegação (simples)
    setHasHistory(window.history.length > 2);
  }, []);

  const handleBack = () => {
    if (hasHistory) {
      router.back(); // Volta para a página anterior, se existir
    } else {
      router.push("/"); // Se entrou direto no link, vai para a home
    }
  };

  return (
    <main className="bg-[#f7f7f7] min-h-screen flex flex-col items-center pb-10">
      <div className="w-full bg-[#446EA4] py-4 px-4 flex justify-between items-center relative">
      {/* 🔙 Seta de voltar com área clicável centralizada */}
      <Link href="/">
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


      {/* Título da tela */}
      <h1 className="text-[#446EA4] font-bold text-lg mt-6">Orientações de Segurança</h1>

      {/* Texto explicativo com destaque em laranja */}
      <p className="text-center text-[#446EA4] font-semibold text-sm px-6 mt-2 max-w-xs">
        O <span className="text-[#F57200]">S.O.S LOCALIZA</span> disponibiliza abaixo
        orientações sobre os principais eventos adversos para os devidos cuidados,
        a fim de evitar danos e prejuízos à população
      </p>

      {/* Cards com botões "saiba mais" */}
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
