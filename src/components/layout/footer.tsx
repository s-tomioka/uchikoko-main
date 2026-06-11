import Link from "next/link";

const links = [
  { href: "/single", label: "オリジナルペット陶器のみ" },
  { href: "/#faq", label: "よくある質問" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokusho", label: "特定商取引法に基づく表記" },
];

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <div>
            <div className="mb-3">
              <img src="/uchikoko_logo.svg" alt="うちここ" width={100} height={39} style={{ filter: "brightness(0) invert(1)" }} />
            </div>
            <p className="max-w-[260px] text-[11px] leading-[2] tracking-wide text-white/60">
              写真からつくる陶器のオブジェ「うちここ」と、供養空間をまとめて揃えられるサービスです。
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.08em] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-14 text-[10px] tracking-wide text-white/35 md:mt-16">
          Copyright © ChopsTech Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
