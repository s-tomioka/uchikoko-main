export function Secondview() {
  return (
    <section className="py-8 lg:py-10 bg-salmon">
      <div className="w-full max-w-[1512px] mx-auto px-6 md:px-16 lg:px-[200px] flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="flex flex-col gap-4 max-w-[540px]">
        <h2 className="font-bold text-lg text-white">
          ご注文方法
        </h2>
        <p className="font-bold text-xl md:text-2xl text-white flex flex-col gap-4">
          <span>大切な家族の陶器を迎い入れるには</span>
          <span>お気に入りの思い出写真を選ぶだけ。</span>
          <span>それだけで手元に「うちのこ」をお届けします。</span>
        </p>
      </div>
      <div className="w-full max-w-[416px] shrink-0">
        <div className="relative aspect-[416/388] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/instructions-image.png"
            alt="ご注文方法のイメージ"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      </div>
    </section>
  );
}
