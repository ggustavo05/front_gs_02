"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import dados from "@/../public/dados_para_mapa.json";
import ModalResultado from "@/components/ModalResultado/modalResultado";
import Header from "@/components/Header/header";

const Mapa = dynamic(() => import("@/components/MapPlaceholder/mapaComRisco"), { ssr: false });

function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // raio da Terra em metros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function AdicionarArea() {
  const [cep, setCep] = useState("");
  const [coordenadas, setCoordenadas] = useState<{ lat: number; lng: number } | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [cor, setCor] = useState<"verde" | "vermelho">("verde");

  async function buscarCep() {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      const endereco = `${data.logradouro}, ${data.localidade}, ${data.uf}`;
      const geo = await fetch(`/api/geocode?q=${encodeURIComponent(endereco)}`);
      const geoData = await geo.json();

      if (!geoData.length) throw new Error("Localização não encontrada");

      setCoordenadas({
        lat: parseFloat(geoData[0].lat),
        lng: parseFloat(geoData[0].lon),
      });
    } catch (err) {
      alert("Erro ao localizar CEP");
    }
  }

  function conferirArea() {
    if (!coordenadas) return;

    const pontoProximo = dados.find((ponto) => {
      const distancia = calcularDistancia(
        coordenadas.lat,
        coordenadas.lng,
        ponto.latitude,
        ponto.longitude
      );
      return distancia <= 200;
    });

    if (pontoProximo) {
      setMensagem(`⚠️ Área de risco detectada! Nível: ${pontoProximo.risco_previsto}`);
      setCor("vermelho");
    } else {
      setMensagem("✅ Você está em uma área segura!");
      setCor("verde");
    }

    setModalAberto(true);
  }

  return (
    <div className="bg-white min-h-screen pt-20 px-4">
      <Header />

      <div className="flex flex-col gap-y-6">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Digite o seu CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="rounded-full px-4 py-2 shadow w-full"
          />
          <button
            onClick={buscarCep}
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            🔍
          </button>
        </div>

        <div className="border-2 border-orange-500 rounded-lg overflow-hidden">
          <div className="h-[300px] w-full">
            <Mapa localizacao={coordenadas ?? undefined} areasDeRisco={dados} />
          </div>
        </div>

        <button
          onClick={conferirArea}
          className="bg-orange-500 text-white px-6 py-2 rounded-full w-full"
        >
          Conferir área ➕
        </button>
      </div>

      <ModalResultado open={modalAberto} onClose={() => setModalAberto(false)} cor={cor}>
        {mensagem}
      </ModalResultado>
    </div>
  );
}
