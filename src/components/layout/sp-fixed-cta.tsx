"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LINE_URL } from "@/lib/constants";

const FIXED_CTA_PATHS = ["/"];

export function SpFixedCta() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);

  const isEnabled = FIXED_CTA_PATHS.includes(pathname);

  useEffect(() => {
    if (!isEnabled) {
      setPastHero(false);
      return;
    }

    const el = document.getElementById("top-hero");
    if (!el) {
      setPastHero(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-[200] border-t border-border-faint bg-white/90 px-5 py-3 backdrop-blur-xl transition-transform duration-300 ease-out",
        pastHero ? "translate-y-0" : "translate-y-full pointer-events-none",
      )}
    >
      <div className="flex">
        <Link
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-line py-3 text-center text-[11px] font-medium tracking-[0.06em] text-white transition-colors hover:bg-line/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2"
        >
          LINEで無料相談
        </Link>
      </div>
    </div>
  );
}
