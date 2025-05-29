// Espaço pro mapa + borda laranja
// src/components/MapPlaceholder.tsx
export default function MapPlaceholder() {
  return (
    <div className="mt-6 border-[6px] border-[#F57200] rounded-xl overflow-hidden w-[90%] h-52 bg-gray-100 flex items-center justify-center">
      <span className="text-[#446EA4] font-semibold text-sm">[Mapa interativo em breve]</span>
    </div>
  );
}
