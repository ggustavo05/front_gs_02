// src/components/Header.tsx
//Título + logo SOS LOCALIZA


import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-[#446EA4] py-4 flex justify-center items-center">
      <div className="w-full max-w-[480px] flex justify-center">
        <Image src={logo} alt="SOS Localiza Logo" width={200} height={40} />
      </div>
    </div>
  );
}

