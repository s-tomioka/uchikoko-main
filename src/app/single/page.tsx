import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SetGallery } from "@/components/sections/sets/set-gallery";
import { setsData } from "@/lib/sets-data";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "オリジナルペット陶器のみ — 写真1枚から、うちの子の姿を陶器に",
  description:
    "うちここは、大切な家族の姿をそのままに、一点ずつ丁寧につくる陶器のオブジェです。",
};

const product = setsData["single"];

const galleryImages = [1, 2, 3, 4].map((n) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/detail/single/hero/sets-a-hero-${num}.png`,
    alt: `オリジナルペット陶器「うちここ」商品画像 ${n}`,
  };
});

const aboutGallery = [1, 2, 3].map((n) => {
  const num = String(n).padStart(2, "0");
  return {
    src: `/images/detail/single/gallary/single-gallary-${num}.png`,
    alt: `オリジナルペット陶器「うちここ」ギャラリー ${n}`,
  };
});

export default function SinglePage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px]">
        {/* Hero */}
        <section className="container pt-8 pb-10 md:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="fade-up">
              <SetGallery images={galleryImages} />
            </div>

            <div className="fade-up">
              {product.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-block rounded-full bg-bg-subtle px-3 py-1 text-[10px] tracking-[0.06em] text-text-sub"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="mb-2 text-[22px] font-extralight tracking-[0.04em] md:text-[28px]">
                {product.name}
              </h1>
              <p className="mb-6 text-[13px] leading-relaxed tracking-wide text-text-muted">
                {product.tagline}
              </p>

              <div className="mb-6">
                <p className="text-[28px] tracking-wide md:text-[32px]">
                  {product.price}
                </p>
                <p className="text-[11px] tracking-wide text-text-faint">
                  {product.priceNote}
                </p>
              </div>

              <Button
                href="/single/order"
                variant="primary"
                className="w-full md:w-auto md:min-w-[220px]"
              >
                こちらで注文する
              </Button>

              <div className="mt-8 space-y-3 border-t border-border-faint pt-8">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 shrink-0 whitespace-nowrap text-[11px] tracking-wide text-text-faint">
                    サイズ
                  </span>
                  <span className="min-w-0 text-[12px] leading-[1.7] tracking-wide text-text-sub">
                    {product.dimensions}
                  </span>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 shrink-0 whitespace-nowrap text-[11px] tracking-wide text-text-faint">
                    素材
                  </span>
                  <span className="min-w-0 text-[12px] leading-[1.7] tracking-wide text-text-sub">
                    陶器（瀬戸焼）
                  </span>
                </div>
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 shrink-0 whitespace-nowrap text-[11px] tracking-wide text-text-faint">
                    送料
                  </span>
                  <span className="text-[12px] leading-[1.7] tracking-wide text-text-sub">
                    無料
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* この商品について */}
        <section className="bg-bg-subtle fade-up">
          <div className="container py-16 md:py-20">
            <h2 className="mb-6 text-[18px] font-extralight tracking-[0.06em] md:text-[20px]">
              この商品について
            </h2>
            <p className="mb-8 max-w-2xl text-[13px] leading-[2.2] tracking-wide text-text-muted">
              {product.intro}
            </p>

            <div className="mb-12">
              <p className="mb-3 text-[11px] font-medium tracking-[0.08em] text-text-faint">
                特徴
              </p>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-[13px] leading-[1.8] tracking-wide text-text-muted"
                  >
                    <span className="text-text-faint" aria-hidden>·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none [&::-webkit-scrollbar]:hidden",
                "max-md:-mx-6 max-md:w-[calc(100%+3rem)] max-md:scroll-px-6 md:mx-0 md:w-full",
              )}
            >
              <div className="max-md:w-6 max-md:shrink-0 md:hidden" aria-hidden />
              {aboutGallery.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/3] w-[85vw] max-w-[min(85vw,100%)] shrink-0 snap-start overflow-hidden md:w-full md:max-w-none md:min-w-0 md:snap-normal md:shrink"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 85vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="max-md:w-6 max-md:shrink-0 md:hidden" aria-hidden />
            </div>
          </div>
        </section>

        {/* お届け・サポート */}
        <section className="fade-up">
          <div className="container py-16 md:py-20">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-10 text-[18px] font-extralight tracking-[0.06em] md:text-[20px]">
                お届け・サポート
              </h2>
              <div className="space-y-8">
                <div>
                  <p className="mb-2 text-[14px] tracking-wide">配送について</p>
                  <p className="text-[13px] leading-[2] tracking-wide text-text-muted">
                    ご注文からお届けまで約30〜40日が目安です。制作状況は随時メールにてお知らせいたします。
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[14px] tracking-wide">支払い方法</p>
                  <p className="text-[13px] leading-[2] tracking-wide text-text-muted">
                    クレジットカード（VISA / Mastercard / JCB / AMEX）をご利用いただけます。
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[14px] tracking-wide">返品・交換</p>
                  <p className="text-[13px] leading-[2] tracking-wide text-text-muted">
                    オーダーメイド商品のため、原則として返品・キャンセルはお受けしておりません。制作前に3Dモデルの確認工程でイメージのすり合わせを行います。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-bg-subtle fade-up">
          <div className="container py-16 md:py-20">
            <h2 className="mb-10 text-[18px] font-extralight tracking-[0.06em] md:text-[20px]">
              よくある質問
            </h2>
            <FaqAccordion items={product.faq} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
