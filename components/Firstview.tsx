import Link from "next/link";

export function Firstview() {
  return (
    <section className="py-16 lg:py-20 bg-cream">
      <div className="w-full max-w-[1512px] mx-auto px-6 md:px-16 lg:px-[200px] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
      <div className="flex flex-col gap-8 order-2 lg:order-1 max-w-[540px]">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-[56px] text-text-dark flex flex-col gap-6">
          <span>大切な家族との</span>
          <span>思い出をかたちに。</span>
        </h1>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-lg leading-[1.6] text-text-dark">
            お気に入りの写真を１枚選んだら、
            <br />
            その写真をもとに毛並みや表情を忠実に再現し、
            <br />
            瀬戸焼の陶器としてお届けします。
          </p>
          <p className="font-bold text-lg leading-[1.6] text-text-dark">
            大切な<span className="text-[#E38056]">うち</span>の子がいつでも<span className="text-[#E38056]">ここ</span>にいる
          </p>
        </div>
        <Link
          href="#order"
          className="inline-flex items-center justify-center w-full max-w-[257px] px-6 py-5 rounded-full bg-orange text-white font-bold text-xl hover:opacity-90 transition-opacity"
        >
          注文する
        </Link>
      </div>
      <div className="w-full max-w-[524px] order-1 lg:order-2 shrink-0">
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "524/700" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/firstview-image.png"
            alt="陶器のイメージ"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
      </div>
    </section>
  );
}
