'use client';

import { MapContainer, TileLayer, Circle, useMap, Marker } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';

// Tipagem do ponto de risco
type PontoDeRisco = {
  latitude: number;
  longitude: number;
  risco_previsto: 'baixo' | 'medio' | 'alto';
};

// Cores por risco
const riscoCor: Record<PontoDeRisco['risco_previsto'], string> = {
  baixo: 'green',
  medio: 'orange',
  alto: 'red',
};

// Ícone personalizado para o usuário
const userIcon = L.icon({
  iconUrl: '/pin-usuario.png',
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

// Componente da legenda
function Legenda() {
  const map = useMap();

  useEffect(() => {
    const legenda = (L.control as any)({ position: 'bottomright' });

    legenda.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend') as HTMLElement;
      div.innerHTML = `
        <div style="
          background: white;
          padding: 6px 10px;
          border-radius: 6px;
          box-shadow: 0 0 6px rgba(0,0,0,0.1);
          font-size: 12px;
          line-height: 1.4;
          color: black;
        ">
          <strong style="display:block; margin-bottom:4px;">Risco de Alagamento</strong>
          <div><i style="background: green; width: 10px; height: 10px; display: inline-block; margin-right: 6px;"></i>Baixo</div>
          <div><i style="background: orange; width: 10px; height: 10px; display: inline-block; margin-right: 6px;"></i>Médio</div>
          <div><i style="background: red; width: 10px; height: 10px; display: inline-block; margin-right: 6px;"></i>Alto</div>
        </div>
      `;
      return div;
    };

    legenda.addTo(map);

    return () => {
      legenda.remove();
    };
  }, [map]);

  return null;
}

export default function MapaRisco() {
  const [dados, setDados] = useState<PontoDeRisco[]>([]);
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);

  // Carregar pontos de risco do JSON
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

  // Obter localização do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => {
        console.error('Erro ao obter localização do usuário:', err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="relative z-0 mt-6 border-[6px] border-[#F57200] rounded-xl overflow-hidden w-[90%] h-[400px] bg-gray-100">
      <MapContainer
        center={[-23.55, -46.63]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <Legenda />

        {/* Localização do usuário */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon} />
        )}

        {/* Pontos de risco */}
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
