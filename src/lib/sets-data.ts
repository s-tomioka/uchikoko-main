export interface SetItem {
  name: string;
  desc: string;
}

export interface SetDetail {
  id: string;
  name: string;
  tagline: string;
  intro: string;
  price: string;
  priceNote: string;
  badge?: string;
  tags: string[];
  contents: string;
  dimensions: string;
  items: SetItem[];
  targets: string[];
  features: string[];
  shippingNote: string;
  faq: { question: string; answer: string }[];
}

export const setsData: Record<string, SetDetail> = {
  single: {
    id: "single",
    name: "オリジナルペット陶器",
    tagline: "写真1枚から、瀬戸焼の老舗工房で一点ずつ丁寧につくるオリジナルペット陶器です。",
    intro:
      "すでにご自宅にある仏壇やこれからご購入する別の仏壇と組み合わせることができます。毛並みや表情をもとに立体化し、素焼き・彩色・本焼きの工程を経て仕上げます。",
    price: "¥54,000",
    priceNote: "税込・送料無料",
    badge: "おすすめ",
    tags: [],
    contents: "オリジナルペット陶器 8cm",
    dimensions: "オリジナルペット陶器 縦8cm",
    items: [
      {
        name: "オリジナルペット陶器「うちここ」8cm",
        desc: "お写真をもとに、瀬戸焼の老舗工房で一点ずつ制作。毛並みや表情をもとに立体化し、素焼き・彩色・本焼きの工程を経て仕上げます。",
      },
    ],
    targets: [],
    features: [
      "陶器素材のため樹脂に比べて、劣化しづらい",
      "置く場所の日当たり、乾燥・湿気を気にせずご利用可能",
      "制作前の3Dモデル確認ありで安心",
    ],
    shippingNote:
      "ご注文からお届けまで約30〜40日が目安です。制作状況は随時メールにてお知らせいたします。",
    faq: [
      {
        question: "犬猫以外でも対応できますか？",
        answer:
          "お写真をもとにご相談いただければ、犬猫以外の子についても対応可否をご案内いたします。",
      },
      {
        question: "写真は何枚必要ですか？",
        answer:
          "まずは1枚からご相談いただけます。より正確な再現のため、追加でお願いする場合がございます。",
      },
      {
        question: "お届けまでどれくらいかかりますか？",
        answer:
          "制作に約30日。全体で約30〜40日が目安です。",
      },
      {
        question: "返品・交換はできますか？",
        answer:
          "オーダーメイド商品のため原則として返品はお受けしておりませんが、制作前の確認工程でイメージのすり合わせを行います。",
      },
    ],
  },
};

export const allSetIds = Object.keys(setsData).filter((id) => id !== "single");

export function getSet(id: string): SetDetail | undefined {
  return setsData[id];
}
