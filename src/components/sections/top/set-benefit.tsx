const benefits = [
  { num: "01", title: "飾る場所が完成する", desc: "うちここだけでなく、祈るための空間までまとめて整えられます。" },
  { num: "02", title: "色味や素材感を合わせやすい", desc: "組み合わせに迷いにくく、統一感のある供養スペースがつくれます。" },
  { num: "03", title: "別々に探す手間が減る", desc: "仏壇・位牌・小物を一つひとつ探さなくても、まとめて選べます。" },
  { num: "04", title: "届いたその日から始めやすい", desc: "準備で悩みすぎず、うちの子を想う時間に気持ちを向けられます。" },
];

export function SetBenefitSection() {
  return (
    <section id="set-benefit" className="bg-bg-subtle fade-up">
      <div className="container py-28 md:py-36">
        <div className="mx-auto mb-16 max-w-lg md:mb-20 md:text-center">
          <h2 className="mb-5 text-[20px] font-extralight tracking-[0.06em] md:text-[24px]">
            セットで揃えるメリット
          </h2>
          <p className="text-[13px] leading-[2] tracking-wide text-text-muted">
            別々に探すより、迷いにくく、整えやすく。
            <br className="hidden sm:block" />
            うちの子を想う場所を、届いたその日から始めやすくなります。
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {benefits.map((b) => (
            <div key={b.num}>
              <span className="mb-3 inline-block text-[28px] font-extralight tracking-wide text-accent md:text-[32px]">
                {b.num}
              </span>
              <h3 className="mb-2 text-[15px] tracking-wide">{b.title}</h3>
              <p className="text-[12px] leading-[1.85] tracking-wide text-text-muted md:text-[13px]">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
