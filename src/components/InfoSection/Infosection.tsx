// Texto + botão “Orientações”
// src/components/InfoSection.tsx
import Link from "next/link";

export default function InfoSection() {
  return (
    <div className="flex flex-col items-center text-center mt-6 space-y-4 px-6">
      <Link href="/orientacoes">
        <button className="bg-[#F57200] text-white font-bold px-5 py-2 rounded-full shadow-md hover:brightness-110 transition">
          Orientações
        </button>
      </Link>
      <p className="text-[#446EA4] font-semibold text-base leading-snug max-w-xs">
        Saiba como agir diante dos principais eventos adversos com{" "}
        <span className="text-[#F57200]">orientações e cuidados essenciais</span>.
      </p>
    </div>
  );
}
