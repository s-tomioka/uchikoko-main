import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F5] border-t border-[#E8E4DF]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-[200px] py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-bold text-lg text-text-dark">
              株式会社ChopsTech
            </p>
            <p className="text-sm text-text-dark/70">
              ペットの思い出を陶器のかたちでお届けする「うちここ」を運営
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="#"
              className="text-text-dark/70 hover:text-text-dark transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="#"
              className="text-text-dark/70 hover:text-text-dark transition-colors"
            >
              特定商取引法に基づく表記
            </Link>
            <Link
              href="#"
              className="text-text-dark/70 hover:text-text-dark transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-[#E8E4DF] text-center">
          <p className="text-sm text-text-dark/60">
            © {currentYear} ChopsTech Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
