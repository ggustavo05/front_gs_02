"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import pinIcon from "@/../public/pin-laranja.png";

// Corrige os ícones padrões para evitar 404s
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "",
  iconUrl: "",
  shadowUrl: "",
});

const customIcon = new L.Icon({
  iconUrl: pinIcon.src,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

interface Risco {
  latitude: number;
  longitude: number;
  risco_previsto: string;
}

interface Props {
  localizacao?: { lat: number; lng: number };
  areasDeRisco: Risco[];
}

export default function MapaComRisco({ localizacao, areasDeRisco }: Props) {
  const center = localizacao ?? { lat: -23.55, lng: -46.63 }; // fallback: SP

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {localizacao && (
        <Marker position={[localizacao.lat, localizacao.lng]} icon={customIcon}>
          <Popup>Local do CEP</Popup>
        </Marker>
      )}

      {areasDeRisco.map((ponto, i) => (
        <Circle
          key={i}
          center={[ponto.latitude, ponto.longitude]}
          radius={200}
          pathOptions={{
            color:
              ponto.risco_previsto === "alto"
                ? "red"
                : ponto.risco_previsto === "médio"
                ? "orange"
                : "yellow",
            fillOpacity: 0.4,
          }}
        >
          <Popup>Risco: {ponto.risco_previsto}</Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
