// Espaço pro mapa + borda laranja
// src/components/MapPlaceholder.tsx
'use client';

import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { useEffect, useState } from 'react';

type PontoDeRisco = {
  latitude: number;
  longitude: number;
  risco_previsto: 'baixo' | 'medio' | 'alto';
};

const riscoCor: Record<PontoDeRisco['risco_previsto'], string> = {
  baixo: 'green',
  medio: 'orange',
  alto: 'red',
};

export default function MapPlaceholder() {
  const [dados, setDados] = useState<PontoDeRisco[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch('/dados_para_mapa.json');
        const data = await response.json();
        setDados(data);
      } catch (err) {
        console.error('Erro ao carregar dados do mapa:', err);
      }
    };

    fetchDados();
  }, []);

  return (
    <div className="mt-6 border-[6px] border-[#F57200] rounded-xl overflow-hidden w-[90%] h-[400px] bg-gray-100">

      <MapContainer
        center={[-23.55, -46.63]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        {dados.map((ponto, idx) => (
          <Circle
            key={idx}
            center={[ponto.latitude, ponto.longitude]}
            radius={300}
            pathOptions={{
              color: riscoCor[ponto.risco_previsto],
              fillOpacity: 0.5,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

