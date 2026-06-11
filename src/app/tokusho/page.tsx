import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | うちここ",
  description: "うちここの特定商取引法に基づく表記です。",
};

export default function TokushoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <article className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="text-2xl font-semibold tracking-wide text-neutral-900 md:text-3xl mb-8">
            特定商取引法に基づく表記
          </h1>
          <p className="text-sm text-neutral-600 mb-10">
            特定商取引に関する法律第11条（通信販売についての広告）に基づき、以下のとおり表記いたします。
          </p>
          <dl className="divide-y divide-neutral-200 border-y border-neutral-200">
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">販売事業者</dt>
              <dd className="text-[15px] text-neutral-800">株式会社ChopsTech</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">運営統括責任者</dt>
              <dd className="text-[15px] text-neutral-800">冨岡 周平</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">所在地</dt>
              <dd className="text-[15px] text-neutral-800">〒150-0001 東京都渋谷区神宮前3-24-1 原宿鈴木ビル3階・4階</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">電話番号</dt>
              <dd className="text-[15px] text-neutral-800">ご請求があれば遅滞なく開示いたします。お問い合わせはメールにて承ります。</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">メールアドレス</dt>
              <dd className="text-[15px] text-neutral-800">shop@chopstech.co.jp</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">販売URL</dt>
              <dd className="text-[15px] text-neutral-800">https://www.uchikoko.com/</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">販売価格</dt>
              <dd className="text-[15px] text-neutral-800">各商品ページに記載の価格（消費税込）といたします。</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">商品代金以外の必要料金</dt>
              <dd className="text-[15px] text-neutral-800">送料：無料／決済手数料：ご利用いただく決済方法によっては手数料が発生する場合があります。</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">お支払い方法</dt>
              <dd className="text-[15px] text-neutral-800">クレジットカード（Visa / Mastercard / JCB / Diners Club / American Express）、Apple Pay</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">代金のお支払時期</dt>
              <dd className="text-[15px] text-neutral-800">ご注文確定時にお支払いが成立いたします。</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">商品の引渡し時期</dt>
              <dd className="text-[15px] text-neutral-800">本商品はお客様からご提供いただく写真に基づく受注制作品です。ご入金確認後、おおむね約3〜5週間で発送いたします。</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">返品・交換について</dt>
              <dd className="text-[15px] text-neutral-800">受注制作品の性質上、お客様のご都合による返品・交換・キャンセルはお受けできません。不良品・配送中の破損・誤配送の場合は、商品到着後7日以内にメールにてご連絡ください。当方の費用負担にて良品との交換または再制作のうえお届けいたします。</dd>
            </div>
            <div className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[200px_1fr] md:gap-8">
              <dt className="text-sm font-medium text-neutral-500">受注のキャンセルについて</dt>
              <dd className="text-[15px] text-neutral-800">ご注文後48時間以内、かつ制作着手前まではキャンセルを承ります。</dd>
            </div>
          </dl>
          <p className="mt-10 text-xs text-neutral-500">最終更新日：2026年5月26日</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
