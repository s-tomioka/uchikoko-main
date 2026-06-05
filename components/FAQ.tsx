"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "3Dプレビューと実際の陶器は同じですか?",
    answer:
      "3Dプレビューは仕上がりイメージの参考としてご確認いただくものです。実際の陶器は職人が一点一点手作りするため、色味や質感に若干の個体差が生じる場合がございます。",
  },
  {
    question: "どんな写真が必要ですか?",
    answer:
      "全身がはっきり写っている写真が最適です。正面を向いた写真を推奨しています。",
  },
  {
    question: "撮影した写真は保存されますか?",
    answer:
      "制作に必要な期間のみ安全に保管し、制作完了後は適切に削除いたします。個人情報の取り扱いには十分配慮しております。",
  },
  {
    question: "制作期間はどのくらいですか?",
    answer:
      "ご注文からお届けまで、約4〜6週間を目安としています。繁忙期により前後する場合がございます。",
  },
  {
    question: "犬猫以外のペットも対応していますか?",
    answer:
      "はい、ウサギやハムスターなど、犬猫以外のペットもお作りできます。お気軽にご相談ください。",
  },
  {
    question: "壊れやすくないですか?",
    answer:
      "瀬戸焼の陶器は高温で焼成しているため、一般的な陶器と同様の強度がありますが、落としたり物がぶつかった場合、割れてしまう可能性があります。",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-20 bg-[#FFFFFF]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-[200px]">
        <h2 className="font-bold text-2xl md:text-3xl text-text-dark text-center mb-12">
          よくあるご質問
        </h2>
        <div className="rounded-2xl border-2 border-text-dark/20 bg-gray-100/50 overflow-hidden">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-text-dark/20 last:border-b-0"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/50 transition-colors"
              >
                <span className="font-bold text-text-dark">{item.question}</span>
                <span
                  className={`shrink-0 text-text-dark transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-text-dark leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
