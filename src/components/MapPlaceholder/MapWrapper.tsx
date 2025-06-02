// src/components/MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const MapaRisco = dynamic(() => import('./MapaRisco'), {
  ssr: false, // 👈 Desativa SSR para evitar erro de 'window is not defined'
});

export default function MapWrapper() {
  return <MapaRisco />;
}
