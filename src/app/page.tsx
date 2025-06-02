// src/app/page.tsx
import Header from "@/components/Header/header";
import ImageCard from "@/components/ImageCard/imagecard";
import InfoSection from "@/components/InfoSection/Infosection";
import MapWrapper from "@/components/MapPlaceholder/MapWrapper";
import SmsBanner from "@/components/SmsBanner/smsBanner";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white min-h-screen px-4 pt-20">
      <Header />
      <ImageCard />
      <InfoSection />
      <MapWrapper />
      <SmsBanner />
    </main>
  );
}
