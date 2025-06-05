"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  cor: "verde" | "vermelho";
}

export default function ModalResultado({ open, onClose, children, cor }: Props) {
  if (!open) return null;

  const bgColor = cor === "vermelho" ? "bg-red-600" : "bg-green-600";

  return (
   <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">

      <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full mx-4">
        <div className={`text-white text-center text-lg font-semibold p-3 rounded-t-xl ${bgColor}`}>
          Resultado da Verificação
        </div>
        <div className="p-4 text-center text-gray-800 text-base">{children}</div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
