import Image from "next/image";
import { Button } from "@/components/ui/button";

const cards = [
  { title: "瀬戸焼で一点ずつ制作", body: "やわらかな表情や存在感を大切にしながら、一点ずつ丁寧につくります。" },
  { title: "毛並みや表情をもとに立体化", body: "いただいたお写真をもとに、その子らしさが伝わるよう形にしていきます。" },
  { title: "確認後のお支払いで安心", body: "制作前に内容を確認しながら進めるため、はじめての方でも安心です。" },
  { title: "劣化しない陶器素材", body: "陶器素材のため樹脂に比べて、劣化しづらく、日当たり、乾燥・湿気を気にせずご利用できます。" },
];

export function FeatureSection() {
  return (
    <section id="feature" className="bg-bg-subtle fade-up">
      <div className="container py-28 md:py-36">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-5 text-[20px] font-extralight tracking-[0.06em] md:text-[24px]">
              写真１枚から、
              <br className="md:hidden" />
              うちの子の姿を陶器に
            </h2>
            <p className="mb-6 text-[13px] leading-[2.2] tracking-wide text-text-muted md:mb-8">
              うちここは、ただの置物ではありません。
              <br />
              大切な姿や表情を思い出しながら、
              <br className="hidden sm:block" />
              そばに感じられるかたちへと丁寧に仕上げます。
            </p>
            <div className="relative mb-10 aspect-[4/5] w-full overflow-hidden rounded-sm lg:hidden">
              <Image
                src="/images/top/feature/top-feature.png"
                alt="オリジナルペット陶器「うちここ」"
                fill
                sizes="(max-width: 1023px) 100vw, 480px"
                className="object-cover"
              />
            </div>
            <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
              {cards.map((c) => (
                <div key={c.title}>
                  <h3 className="mb-2 text-[14px] tracking-wide">{c.title}</h3>
                  <p className="text-[12px] leading-[1.85] tracking-wide text-text-muted md:text-[13px]">{c.body}</p>
                </div>
              ))}
            </div>
            <Button href="/single" variant="outline">
              単品の詳細を見る
            </Button>
          </div>
          <div className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-sm lg:block">
            <Image
              src="/images/top/feature/top-feature.png"
              alt="オリジナルペット陶器「うちここ」"
              fill
              sizes="(min-width: 1024px) 480px, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
