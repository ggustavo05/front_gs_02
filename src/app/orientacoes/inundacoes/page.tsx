"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export default function InundacoesPage() {
  const [conteudo, setConteudo] = useState({
    titulo: "",
    descricao: "",
    alertas: "",
    acoesAntes: "",
    acoesDurante: "",
    acoesDepois: "",
  });

  useEffect(() => {
    fetch("/api/evento/4")
      .then((res) => res.json())
      .then((data) =>
        setConteudo({
          titulo: data.nomeEvento,
          descricao: data.descricaoEvento,
          alertas: data.alertas,
          acoesAntes: data.acoesAntes,
          acoesDurante: data.acoesDurante,
          acoesDepois: data.acoesDepois,
        })
      )
      .catch((err) => console.error("Erro ao buscar evento:", err));
  }, []);

  return (
    <main className="bg-[#f7f7f7] min-h-screen pb-10 flex flex-col items-center">
      <div className="w-full bg-[#446EA4] py-4 px-4 flex justify-between items-center relative">
        <Link href="/orientacoes">
          <div className="w-10 h-10 flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src={logo} alt="Logo SOS Localiza" width={200} height={40} />
        </div>
        <div className="w-10 h-10" />
      </div>

      <h1 className="text-[#F67300] font-bold text-xl mt-6">{conteudo.titulo}</h1>

      <img
        src="/assets/img-inundacoes.jpg"
        alt="Imagem de inundações"
        className="mt-4 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-md"
      />

      <div className="bg-[#1B547D] rounded-full w-16 h-16 -mt-8 mb-4 flex items-center justify-center shadow-md">
        <img src="/assets/icone-casa.svg" alt="Ícone casa" className="w-10 h-10" />
      </div>

      <div className="px-6 text-justify space-y-4 text-sm md:text-base lg:text-lg max-w-md lg:max-w-3xl text-[#446EA4] font-semibold">
        <p>{conteudo.descricao}</p>

        <div>
          <h2 className="text-[#F67300] font-bold mb-1">Fique alerta:</h2>
          <p>{conteudo.alertas}</p>
        </div>

        <div>
          <h2 className="text-[#F67300] font-bold mb-1">O que fazer antes:</h2>
          <p>{conteudo.acoesAntes}</p>
        </div>

        <div>
          <h2 className="text-[#F67300] font-bold mb-1">O que fazer durante:</h2>
          <p>{conteudo.acoesDurante}</p>
        </div>

        <div>
          <h2 className="text-[#F67300] font-bold mb-1">O que fazer depois:</h2>
          <p>{conteudo.acoesDepois}</p>
        </div>
      </div>
    </main>
  );
}