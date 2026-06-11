import type { LucideIcon } from "lucide-react";
import { Image, CircleHelp, Layers2, LayoutTemplate } from "lucide-react";

const concerns: { lines: string[]; icon: LucideIcon }[] = [
  { icon: Image, lines: ["写真だけでは", "少し寂しい気がする"] },
  { icon: CircleHelp, lines: ["家のどこに供養すれば", "良いのかわからない"] },
  { icon: Layers2, lines: ["仏壇や位牌を別々に", "探すのが大変"] },
  { icon: LayoutTemplate, lines: ["統一感ある供養スペースを", "整えたい"] },
];

export function EmpathySection() {
  return (
    <section id="empathy" className="bg-bg-subtle fade-up">
      <div className="container py-24 md:py-32">
        <div className="mx-auto max-w-xl md:text-center">
          <h2 className="mb-6 text-[20px] font-extralight tracking-[0.06em] md:text-[24px]">
            こんなお気持ちはありませんか？
          </h2>
          <p className="mb-16 text-[13px] leading-[2.2] tracking-wide text-text-muted md:mb-20">
            写真だけでは少し寂しい。けれど、何をどう揃えればよいか分からない。
            <br className="hidden md:block" />
            そんな方のために、うちここを中心にした供養の形をご提案します。
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 md:mb-14 md:grid-cols-4 md:gap-4 lg:gap-5">
          {concerns.map(({ lines, icon: Icon }) => (
            <div
              key={lines[0]}
              className="flex items-center gap-3 rounded-sm border border-border bg-white px-5 py-4 md:flex-col md:items-center md:gap-4 md:px-4 md:py-6 md:text-center"
            >
              <Icon
                className="size-5 shrink-0 text-accent md:size-6"
                strokeWidth={1.2}
                aria-hidden
              />
              <p className="text-[12px] leading-[1.8] tracking-wide text-text-sub md:text-[13px]">
                {lines.map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br className="hidden md:block" />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto max-w-xl md:text-center text-[13px] leading-[2.2] tracking-wide text-text-sub md:text-[14px]">
          うちここは、うちの子の姿を形に残すだけでなく、
          <br className="hidden sm:block" />
          祈る場所を整えるための供養セットをお届けします。
        </p>
      </div>
    </section>
  );
}
