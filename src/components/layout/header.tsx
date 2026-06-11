"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { makeHashScrollHandler } from "@/lib/interactive";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/#workshop", label: "うちここについて" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // トップページにいる時だけアンカースクロール処理を有効化。
  // 他ページ（/privacy, /tokusho など）では通常のリンク遷移に任せる。
  const isTopPage = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/85 backdrop-blur-xl border-b border-transparent">
      <div className="container flex items-center justify-between h-[72px]">
        <Link
          href="/"
          className="hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2"
        >
          <img src="/uchikoko_logo.svg" alt="うちここ" width={100} height={39} />
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="メイン">
          {navLinks.map((link) =>
            isTopPage ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={makeHashScrollHandler(link.href)}
                className={cn(
                  "text-[11px] tracking-[0.1em] text-text-muted hover:text-foreground transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2",
                  pathname === link.href && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.1em] text-text-muted hover:text-foreground transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <button
          className="md:hidden p-2 -mr-2 text-text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border-faint pb-8">
          <div className="container pt-6 space-y-1">
            {navLinks.map((link) =>
              isTopPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[13px] text-text-sub tracking-wide py-3.5 hover:text-foreground transition-colors"
                  onClick={makeHashScrollHandler(link.href, () => setOpen(false))}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[13px] text-text-sub tracking-wide py-3.5 hover:text-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ),
            )}
            <div className="pt-5 space-y-3">
              <Link
                href="/single"
                className="block text-center text-[11px] tracking-wide text-white bg-dark py-3 hover:bg-dark/85 transition-all"
                onClick={() => setOpen(false)}
              >
                注文する
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
