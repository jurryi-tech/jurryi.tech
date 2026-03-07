"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import PatentBackground from "@/components/ui/PatentBackground";
import CustomCursor from "@/components/ui/CustomCursor";

const Preloader = dynamic(() => import("@/components/sections/Preloader"), { ssr: false });
const Header = dynamic(() => import("@/components/sections/Header"), { ssr: false });
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const JurisdictionTriptych = dynamic(() => import("@/components/sections/JurisdictionTriptych"), { ssr: false });
const DataFlow = dynamic(() => import("@/components/sections/DataFlow"), { ssr: false });
const ClaimsEngine = dynamic(() => import("@/components/sections/ClaimsEngine"), { ssr: false });
const OfficeActionTheater = dynamic(() => import("@/components/sections/OfficeActionTheater"), { ssr: false });
const SecurityVault = dynamic(() => import("@/components/sections/SecurityVault"), { ssr: false });
const ProductCards = dynamic(() => import("@/components/sections/ProductCards"), { ssr: false });
const PatentDrawings = dynamic(() => import("@/components/sections/PatentDrawings"), { ssr: false });
const CostCalculator = dynamic(() => import("@/components/sections/CostCalculator"), { ssr: false });
const SocialProof = dynamic(() => import("@/components/sections/SocialProof"), { ssr: false });
const CTASection = dynamic(() => import("@/components/sections/CTASection"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: false });

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useLenis();

  return (
    <>
      <CustomCursor />
      <PatentBackground />
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <div style={{ opacity: preloaderDone ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Header />
        <Hero />
        <JurisdictionTriptych />
        <DataFlow />
        <ClaimsEngine />
        <OfficeActionTheater />
        <SecurityVault />
        <ProductCards />
        <PatentDrawings />
        <CostCalculator />
        <SocialProof />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
