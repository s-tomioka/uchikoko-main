"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SpFixedCta } from "@/components/layout/sp-fixed-cta";
import { HeroSection } from "@/components/sections/top/hero";
import { EmpathySection } from "@/components/sections/top/empathy";
import { WorkshopSection } from "@/components/sections/top/workshop";
import { FeatureSection } from "@/components/sections/top/feature";
import { ProductionFlowSection } from "@/components/sections/top/production-flow";
import { BottomCtaSection } from "@/components/sections/top/bottom-cta";

export default function Home() {
  // URLにハッシュが付いている状態でトップに到達した場合、
  // 該当セクションまでスクロールする（別ページからの遷移時に使用）
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 20) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    tryScroll();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <HeroSection />
        <EmpathySection />
        <WorkshopSection />
        <FeatureSection />
        <ProductionFlowSection />
        <BottomCtaSection />
      </main>
      <Footer />
      <SpFixedCta />
    </>
  );
}
