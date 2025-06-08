//Imagem do escudo + texto + botão
// src/components/ImageCard.tsx
import Image from "next/image";
import escudo from "@/assets/escudo.png";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";

export default function ImageCard() {
  return (
    <div className="flex flex-col items-center text-center mt-6 space-y-4 px-6">
      <Image src={escudo} alt="Escudo SOS Localiza" width={110} height={110} />
      <p className="text-[#446EA4] font-semibold text-base leading-snug">
        Verifique o <span className="text-[#F57200]">CEP</span> de sua residência para ficar por dentro sobre eventos adversos em na região.
      </p>
      <Link href="/adicionar-area">
        <button className="bg-[#446EA4] text-white flex items-center px-4 py-2 rounded-full shadow-md hover:brightness-110 transition">
          Adicionar área <FiPlusCircle className="ml-2" />
        </button>
      </Link>
    </div>
  );
}

