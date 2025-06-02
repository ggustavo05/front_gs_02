'use client';

import {
  MapContainer,
  TileLayer,
  Circle,
  useMap,
  Marker,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import { getDistance } from 'geolib';

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

// Ícone do usuário
const userIcon = L.icon({
  iconUrl: '/pin-usuario.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

// Legenda fixa no mapa
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

// Recentraliza o mapa no usuário ao carregar
function RecenterMap({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 14);
  }, [position, map]);
  return null;
}

// Botão flutuante: voltar para minha localização
function BotaoLocalizacao({
  position,
}: {
  position: LatLngExpression | null;
}) {
  const map = useMap();

  const irParaLocalizacao = () => {
    if (position) {
      map.setView(position, 14);
    }
  };

  if (!position) return null;

  return (
    <button
      onClick={irParaLocalizacao}
      className="absolute bottom-4 left-4 bg-white text-[#446EA4] font-semibold px-4 py-2 rounded-full shadow-md hover:bg-[#f0f0f0] transition z-[999]"

    >
      📍 Minha localização
    </button>
  );
}

export default function MapaRisco() {
  const [dados, setDados] = useState<PontoDeRisco[]>([]);
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(
    null
  );

  const [mensagemRisco, setMensagemRisco] = useState<{
    texto: string;
    cor: string;
  }>({ texto: '', cor: '' });

  // Carregar dados locais
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

  // Cálculo de risco com base na posição
  const calcularRisco = ([lat, lon]: [number, number]) => {
    if (!dados || dados.length === 0) return;

    let encontrouAreaDireta = false;
    let menorDistancia = Infinity;
    let nivelRisco = '';

    for (const ponto of dados) {
      const distancia = getDistance(
        { latitude: lat, longitude: lon },
        { latitude: ponto.latitude, longitude: ponto.longitude }
      );

      if (distancia < 300) {
        encontrouAreaDireta = true;
        nivelRisco = ponto.risco_previsto;
        break;
      }

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        nivelRisco = ponto.risco_previsto;
      }
    }

    if (encontrouAreaDireta) {
      setMensagemRisco({
        texto: `Você está em uma área de risco: ${nivelRisco.toUpperCase()}`,
        cor:
          nivelRisco === 'alto'
            ? 'text-red-500'
            : nivelRisco === 'medio'
            ? 'text-orange-500'
            : 'text-green-500',
      });
    } else if (menorDistancia <= 2000) {
      setMensagemRisco({
        texto: `Área de risco próxima a ${(menorDistancia / 1000).toFixed(
          1
        )} km: ${nivelRisco.toUpperCase()}`,
        cor: 'text-yellow-400',
      });
    } else {
      setMensagemRisco({
        texto: 'Você está em uma área segura. Mantenha-se atento.',
        cor: 'text-green-400',
      });
    }
  };

  // Geolocalização do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords: [number, number] = [latitude, longitude];
        setUserLocation(coords);
        calcularRisco(coords);
      },
      (err) => {
        console.error('Erro ao obter localização do usuário:', err);
      },
      { enableHighAccuracy: true }
    );
  }, [dados]);

  return (
    <>
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

          {userLocation && <RecenterMap position={userLocation} />}
          {userLocation && <BotaoLocalizacao position={userLocation} />}
          <Legenda />

          {userLocation && (
            <Marker position={userLocation} icon={userIcon} />
          )}

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

      {/* Card de risco adaptativo */}
      {mensagemRisco.texto && (
        <div className="mt-4 bg-[#446EA4] text-white px-6 py-4 rounded-xl shadow-md text-center w-[90%]">
          <p className="text-sm">Você está em uma área de:</p>
          <p className={`text-lg font-bold mt-1 ${mensagemRisco.cor}`}>
            {mensagemRisco.texto}
          </p>
        </div>
      )}
    </>
  );
}
