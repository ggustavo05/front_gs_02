import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

interface Props {
  titulo: string;
  imagem: string;
  href: string;
}

export default function OrientationCard({ titulo, imagem, href }: Props) {
  return (
    <div className="bg-[#446EA4] text-white rounded-2xl px-6 py-8 w-[305px] h-[337px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col items-center text-center justify-between">
      <h2 className="font-semibold text-lg">{titulo}</h2>

      <img src={imagem} alt={titulo} className="w-20 h-20" />

      <Link href={href}>
        <button className="bg-[#1E3D61] font-semibold text-base px-6 py-2.5 rounded-full shadow-md flex items-center gap-2 hover:brightness-110 transition">
          saiba mais
          <FiPlusCircle className="text-[#F57200] text-xl" />
        </button>
      </Link>
    </div>
  );
}
