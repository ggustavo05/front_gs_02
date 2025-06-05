// src/components/Header.tsx
//Título + logo SOS LOCALIZA


"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-[#446EA4] py-4 px-4 md:px-10 lg:px-20">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Botão voltar */}
        <button
          onClick={() => router.back()}
          className="text-white p-2 hover:bg-[#3b5e8d] rounded-full transition"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Logo centralizada */}
        <div className="flex-1 flex justify-center">
          <Image
            src={logo}
            alt="SOS Localiza Logo"
            width={200}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Espaço para balancear layout */}
        <div className="w-[40px]" />
      </div>
    </header>
  );
}

