"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full divide-y divide-border-faint", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="w-full">
            <button
              type="button"
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[14px] tracking-wide text-foreground transition-colors hover:text-text-sub focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 md:py-7 md:text-[15px]"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.question}</span>
              {isOpen ? (
                <Minus size={14} className="shrink-0 text-text-faint" aria-hidden />
              ) : (
                <Plus size={14} className="shrink-0 text-text-faint" aria-hidden />
              )}
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "max-h-[min(80vh,600px)] pb-7" : "max-h-0",
              )}
            >
              <p className="pr-10 text-[13px] leading-[2] tracking-wide text-text-muted">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
