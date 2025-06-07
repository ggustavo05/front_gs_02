import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { getDistance } from 'geolib';

// Ícone do usuário
const userIcon = L.icon({
  iconUrl: '/pin-usuario.png',
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

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
function ZoomHandler({ setZoom }: { setZoom: (z: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const onZoom = () => setZoom(map.getZoom());
    map.on('zoomend', onZoom);
    return () => {
      map.off('zoomend', onZoom);
    };
  }, [map, setZoom]);
  return null;
}
export default function MapaRisco() {
  const [dados, setDados] = useState<PontoDeRisco[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(11); // Definindo o estado de zoom com valor inicial
  const [mensagemRisco, setMensagemRisco] = useState<{ texto: string; cor: string }>({
    texto: '',
    cor: '',
  });

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

  // Função para calcular risco
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
        texto: `Área de risco próxima a ${(menorDistancia / 1000).toFixed(1)} km: ${nivelRisco.toUpperCase()}`,
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
        setUserLocation([latitude, longitude]);
        calcularRisco([latitude, longitude]);
      },
      (err) => {
        console.error('Erro ao obter localização do usuário:', err);
      },
      { enableHighAccuracy: true }
    );
  }, [dados]);

  // Controle do zoom com useMap
   // Agora 'map' é a dependência do useEffect

  return (
    <>
      <div className="relative z-0 mt-6 border-[6px] border-[#F57200] rounded-xl overflow-hidden w-[90%] h-[400px] bg-gray-100">
        <MapContainer
  center={userLocation}
  zoom={zoom}
  minZoom={3}
  maxZoom={18}
  style={{ height: '100%', width: '100%' }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; OpenStreetMap"
  />
  <ZoomHandler setZoom={setZoom} /> {/* ADICIONE ESTA LINHA */}
  {userLocation && <Marker position={userLocation} icon={userIcon} />}
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
      {/* Exibindo a mensagem de risco */}
      {mensagemRisco.texto && (
        <div className="mt-4 bg-[#446EA4] text-white px-6 py-4 rounded-xl shadow-md text-center w-[90%]">
          <p className="text-sm">Você está em uma área de:</p>
          <p className={`text-lg font-bold mt-1 ${mensagemRisco.cor}`}>{mensagemRisco.texto}</p>
        </div>
      )}
    </>
  );
}
