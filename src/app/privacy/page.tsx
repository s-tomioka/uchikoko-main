import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー | うちここ",
  description:
    "うちここ（運営：株式会社ChopsTech）のプライバシーポリシーです。個人情報の取り扱いについて記載しています。",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <article className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <header className="mb-12 border-b border-neutral-200 pb-8">
            <p className="text-xs tracking-[0.2em] text-neutral-500">PRIVACY POLICY</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-wide text-neutral-900 md:text-3xl">
              プライバシーポリシー
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              株式会社ChopsTech（以下「当社」といいます）は、当社が運営する「うちここ」
              （以下「本サービス」といいます）におけるお客様の個人情報の取り扱いについて、
              以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
            </p>
          </header>

          <div className="space-y-10 text-[15px] leading-[1.9] text-neutral-800">
            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第1条（個人情報の定義）
              </h2>
              <p>
                本ポリシーにおいて「個人情報」とは、個人情報の保護に関する法律
                （以下「個人情報保護法」といいます）に定める「個人情報」、すなわち、生存する
                個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレスその他
                の記述等により特定の個人を識別できる情報、または個人識別符号が含まれるものを
                指します。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第2条（取得する個人情報）
              </h2>
              <p>
                当社は、本サービスにおける商品の販売・提供および各種サービスの提供にあたり、
                以下の個人情報を取得することがあります。
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>氏名、ご住所、電話番号、メールアドレス</li>
                <li>
                  ご注文内容、お支払いに関する情報（決済はクレジットカード会社等の決済代行
                  事業者を通じて行われ、当社はカード番号等を保有しません）
                </li>
                <li>お問い合わせ・ご相談（LINE等）の内容、やり取りの履歴</li>
                <li>
                  商品制作のためにお客様からご提供いただく写真および当該写真に付随する情報
                </li>
                <li>Cookie、IPアドレス、閲覧履歴、利用デバイス情報等の利用情報</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第3条（個人情報の利用目的）
              </h2>
              <p>当社は、取得した個人情報を以下の目的のために利用いたします。</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>商品の制作・発送、ならびにこれらに付随する業務の遂行</li>
                <li>ご注文内容の確認、お支払いに関するご連絡</li>
                <li>お問い合わせ・ご相談への対応</li>
                <li>本サービス・キャンペーン・新商品等のご案内</li>
                <li>本サービスの改善および新サービスの開発のための分析</li>
                <li>利用規約その他規約等に違反する行為への対応</li>
                <li>その他、上記利用目的に付随する目的</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第4条（個人情報の第三者提供）
              </h2>
              <p>
                当社は、次のいずれかに該当する場合を除き、あらかじめお客様の同意を得ることなく、
                個人情報を第三者に提供することはありません。
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                <li>法令に基づく場合</li>
                <li>
                  人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を
                  得ることが困難であるとき
                </li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、
                  お客様の同意を得ることが困難であるとき
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を
                  遂行することに対して協力する必要がある場合
                </li>
                <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第5条（個人情報の取扱いの委託）
              </h2>
              <p>
                当社は、利用目的の達成に必要な範囲内において、個人情報の取扱いの全部または
                一部を外部の事業者（決済代行、配送、商品制作、システム運用、データ保管等）に
                委託することがあります。この場合、当社は、委託先における個人情報の安全管理が
                適切に行われるよう、必要かつ適切な監督を行います。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第6条（安全管理措置）
              </h2>
              <p>
                当社は、個人情報の漏えい、滅失または毀損の防止その他の個人情報の安全管理のために、
                組織的・人的・物理的・技術的に必要かつ適切な措置を講じます。また、お客様から
                お預かりした写真データ等についても、商品制作の目的の範囲内で適切に管理いたします。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第7条（個人情報の開示・訂正・利用停止等）
              </h2>
              <p>
                お客様は、当社の保有するご自身の個人情報について、開示、訂正、追加、削除、
                利用停止または第三者提供の停止を請求することができます。ご請求にあたっては、
                第11条のお問い合わせ窓口までご連絡ください。法令に従い、ご本人であることを
                確認のうえ、合理的な期間内に対応いたします。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第8条（Cookieおよびアクセス解析ツールについて）
              </h2>
              <p>
                本サービスでは、サービス向上およびご利用状況の分析のためCookieを使用することが
                あります。また、Google LLCが提供するGoogle アナリティクス4、Google広告等の
                広告配信サービス、ならびに株式会社ユーザーローカルが提供するユーザーヒートを
                利用しており、これらのサービスはCookieを用いて匿名のトラフィックデータを
                収集します。
              </p>
              <p className="mt-3">
                これらのサービスにおけるデータの取扱いについては、各社のプライバシーポリシーを
                ご参照ください。お客様はブラウザの設定によりCookieの送受信を無効にすることが
                できますが、その場合、本サービスの一部の機能をご利用いただけないことがあります。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第9条（SSLによる暗号化）
              </h2>
              <p>
                本サービスでは、お客様の個人情報を安全にやり取りするためにSSL（Secure Socket Layer）
                による暗号化通信を利用しています。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第10条（プライバシーポリシーの変更）
              </h2>
              <p>
                当社は、法令の変更や運営上の必要に応じて、本ポリシーを変更することがあります。
                変更後の本ポリシーは、本サービス上に掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-base font-semibold text-neutral-900">
                第11条（お問い合わせ窓口）
              </h2>
              <p>本ポリシーに関するお問い合わせは、下記までお願いいたします。</p>
              <dl className="mt-4 space-y-2 rounded-md bg-neutral-50 px-5 py-4 text-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="w-32 shrink-0 text-neutral-500">事業者名</dt>
                  <dd>株式会社ChopsTech</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="w-32 shrink-0 text-neutral-500">サービス名</dt>
                  <dd>うちここ</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="w-32 shrink-0 text-neutral-500">所在地</dt>
                  <dd>〒150-0001 東京都渋谷区神宮前3-24-1 原宿鈴木ビル3階・4階</dd>
                </div>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <dt className="w-32 shrink-0 text-neutral-500">メール</dt>
                  <dd>
                    <a
                      href="mailto:shop@chopstech.co.jp"
                      className="underline underline-offset-2 hover:text-neutral-600"
                    >
                      shop@chopstech.co.jp
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <div className="border-t border-neutral-200 pt-6 text-sm text-neutral-500">
              制定日：2026年5月26日
              <br />
              最終改定日：2026年5月26日
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
