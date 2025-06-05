// src/components/Header.tsx
//Título + logo SOS LOCALIZA


"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // pode trocar por outro se preferir
import logo from "@/assets/logo.png";

export default function Header() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] bg-[#446EA4] py-4 flex items-center justify-between px-4 max-w-[480px] mx-auto">
      <button onClick={() => router.back()} className="text-white p-2">
        <ArrowLeft size={24} />
      </button>

      <div className="flex-1 flex justify-center">
        <Image src={logo} alt="SOS Localiza Logo" width={200} height={40} />
      </div>

      <div className="w-[40px]" /> {/* espaço fantasma para equilibrar layout */}
    </div>
  );
}


