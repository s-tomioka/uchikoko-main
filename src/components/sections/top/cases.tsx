import Image from "next/image";

const cases = [
  {
    title: "棚の上に、コンパクトに",
    desc: "小さな棚の上にも置きやすく、毎日自然に手を合わせられる飾り方です。",
    src: "/images/top/cases/top-case-1.png",
  },
  {
    title: "リビングに自然になじむ",
    desc: "やさしい色合いのインテリアにもなじみやすく、暮らしの空気を崩しません。",
    src: "/images/top/cases/top-case-2.png",
  },
  {
    title: "陶器だからどこでも置ける",
    desc: "陶器素材のため、劣化しづらく、日当たり・湿気・乾燥は気にせずどこにでも置けます。",
    src: "/images/top/cases/top-case-3.png",
  },
];

export function CasesSection() {
  return (
    <section id="cases" className="fade-up">
      <div className="container py-28 md:py-36">
        <div className="mb-14 max-w-lg md:mb-16">
          <h2 className="mb-5 text-[20px] font-extralight tracking-[0.06em] md:text-[24px]">
            このように飾られています
          </h2>
          <p className="text-[13px] leading-[2] tracking-wide text-text-muted">
            大きなスペースがなくても、うちの子を想う場所を整えることができます。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
          {cases.map((c) => (
            <div key={c.title}>
              <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-sm md:mb-6">
                <Image
                  src={c.src}
                  alt={c.title}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mb-2 text-[14px] tracking-wide">{c.title}</h3>
              <p className="text-[12px] leading-[1.85] tracking-wide text-text-muted md:text-[13px]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
