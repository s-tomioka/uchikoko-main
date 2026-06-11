import { FaqAccordion } from "@/components/ui/faq-accordion";

const faqItems = [
  {
    question: "仏壇や位牌は後から追加できますか？",
    answer: "はい、まずはうちここだけをお作りいただき、あとから仏壇や位牌などを追加して整えていくことも可能です。",
  },
  {
    question: "犬猫以外でも対応できますか？",
    answer: "お写真をもとにご相談いただければ、犬猫以外の子についても対応可否をご案内いたします。",
  },
  {
    question: "インテリアになじむ色味は選べますか？",
    answer: "空間に合わせやすい色味や雰囲気についてもご相談いただけます。ご自宅の雰囲気に近い事例をご案内することも可能です。",
  },
  {
    question: "写真が1枚でも大丈夫ですか？",
    answer: "はい、まずは1枚からご相談いただけます。必要に応じて追加でお写真をお願いする場合があります。",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-bg-subtle fade-up">
      <div className="container py-28 md:py-36">
        <div className="mb-12 max-w-lg md:mb-14">
          <h2 className="mb-5 text-[20px] font-extralight tracking-[0.06em] md:text-[24px]">
            よくあるご質問
          </h2>
          <p className="text-[13px] leading-[2] tracking-wide text-text-muted">
            はじめての方からよくいただくご質問をまとめました。
          </p>
        </div>

        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}
