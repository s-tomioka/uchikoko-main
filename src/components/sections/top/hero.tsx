import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroExamples } from "@/components/sections/top/hero-examples";
import { LINE_URL } from "@/lib/constants";

const HERO_IMAGE_PC = "/images/top/hero/top-hero.png";
const HERO_IMAGE_SP = "/images/top/hero/top-hero-sp.png";

export function HeroSection() {
  return (
    <section className="pt-[72px]">
      <div
        id="top-hero"
        className="relative h-[calc(55vh+300px)] w-full overflow-hidden md:h-[calc(80vh+100px)]"
      >
        <Image
          src={HERO_IMAGE_SP}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src={HERO_IMAGE_PC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />
        <div className="absolute inset-0 flex items-start pt-20">
          <div className="container">
            <div className="max-w-md max-md:mx-auto max-md:text-center md:-ml-8 md:text-left">
              <h1 className="mb-6 text-[28px] font-extralight leading-[1.5] tracking-[0.04em] text-white md:text-[38px]">
                <span className="md:hidden">
                  大切なうちの子に
                  <br />
                  毎日手を合わせる
                </span>
                <span className="hidden md:block">
                  大切なうちの子に、
                  <br />
                  毎日手を合わせる。
                </span>
              </h1>
              <p className="mb-10 max-md:mb-6 text-[13px] leading-[2] tracking-wide text-white md:text-[14px]">
                写真を送るだけで世界にひとつだけの
                <br />
                ペット仏壇をお届けします。
              </p>
              <p className="mb-8 text-[20px] font-extralight tracking-[0.06em] text-white md:text-[24px] max-md:flex max-md:flex-col max-md:items-center">
                <span className="inline-flex items-baseline gap-2">
                  <span>¥54,000</span>
                  <span className="text-[12px] tracking-wide text-white md:text-[13px]">
                    税込
                  </span>
                </span>
              </p>
              <div className="flex flex-wrap gap-3 max-md:justify-center md:justify-start">
                <Button
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="bg-line text-white hover:bg-line/85 active:bg-line/90"
                >
                  LINEで無料相談
                </Button>
                <Button
                  href="/single"
                  variant="primary"
                  className="bg-white text-foreground hover:bg-white/85 active:bg-white/90"
                >
                  注文する
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-24 md:py-32">
        <div className="fade-up mx-auto mb-16 max-w-lg md:mb-20 md:text-center">
          <p className="text-[13px] leading-[2.4] tracking-wide text-text-sub md:text-[14px]">
            うちここは、写真1枚からつくるオリジナルペット陶器です。
            <br className="hidden md:block" />
            瀬戸焼の老舗工房で一点ずつ丁寧に制作し、
            <br className="hidden md:block" />
            仏壇・位牌・供養小物とまとめて揃えることで、
            <br className="hidden md:block" />
            あなたの暮らしの中に、祈りの空間をつくります。
          </p>
        </div>

        <div className="fade-up">
          <HeroExamples />
        </div>
      </div>
    </section>
  );
}
