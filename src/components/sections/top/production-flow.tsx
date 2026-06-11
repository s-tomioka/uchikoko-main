const steps = [
  { num: "01", title: "写真を送る", desc: "お気に入りの写真を1〜3枚お送りください。" },
  { num: "02", title: "3Dモデリング", desc: "写真から3Dデータを作成し、確認いただきます。", duration: "約5日" },
  { num: "03", title: "3Dプリント", desc: "精密な原型を3Dプリンターで出力します。", duration: "約3日" },
  { num: "04", title: "素焼き", desc: "陶器の素地を約800℃で焼成します。", duration: "約7日" },
  { num: "05", title: "彩色", desc: "職人が写真を見ながら一筆ずつ着彩します。", duration: "約5日" },
  { num: "06", title: "本焼き・仕上げ", desc: "1250℃で焼成し、検品のうえお届けします。", duration: "約7日" },
];

export function ProductionFlowSection() {
  return (
    <section id="flow" className="fade-up">
      <div className="container py-28 md:py-36">
        <div className="mb-16 max-w-lg md:mb-20">
          <h2 className="mb-5 text-[20px] font-extralight tracking-[0.06em] md:text-[24px]">
            写真1枚から、約30日でお届け
          </h2>
          <p className="text-[13px] leading-[2] tracking-wide text-text-muted">
            はじめての方でも迷わないように、
            <br className="hidden sm:block" />
            写真を送るところからお届けまでの流れをご説明します。
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className={`flex items-start gap-8 pb-10 ${
                i < steps.length - 1
                  ? "mb-10 border-b border-border-faint"
                  : ""
              }`}
            >
              <span className="shrink-0 w-10 pt-[3px] text-[28px] font-extralight leading-none tracking-wide text-text-faint md:w-14 md:text-[32px]">
                {s.num}
              </span>
              <div className="flex-1 pt-[2px]">
                <h3 className="mb-2 text-[15px] leading-tight tracking-wide">{s.title}</h3>
                <p className="text-[12px] leading-relaxed tracking-wide text-text-muted md:text-[13px]">
                  {s.desc}
                </p>
              </div>
              {s.duration && (
                <span className="shrink-0 pt-[6px] text-[11px] tracking-wide text-text-faint">
                  {s.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
