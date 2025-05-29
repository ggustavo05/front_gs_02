//Texto + botão “Enviar SMS”
// src/components/SmsBanner.tsx
import { FiMessageSquare } from "react-icons/fi";

export default function SmsBanner() {
  return (
    <div className="flex flex-col items-center text-center mt-8 space-y-4 px-6 pb-10">
      <p className="text-[#446EA4] font-semibold text-base">
        Está em uma área de risco?<br />Estamos aqui para ajudar.
      </p>
      <button className="bg-[#8B0000] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:brightness-110 transition flex items-center">
        Enviar SMS
        <FiMessageSquare className="ml-2 text-white" />
      </button>
    </div>
  );
}



