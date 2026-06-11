import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "診断・相談 — うちここ",
  description: "3つの質問で、おすすめの供養セットをご案内します。",
};

export default function DiagnosisPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container py-40 text-center text-text-muted">
          <p className="text-2xl font-light text-foreground mb-4">診断・相談</p>
          <p className="text-sm">デザイン実装準備完了。</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
