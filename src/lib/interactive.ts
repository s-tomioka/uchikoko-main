import type { MouseEvent } from "react";

/** カード全体がリンクのときのフォーカス・ホバー用 */
export const cardLinkClass =
  "group block rounded-sm outline-none transition-[opacity,box-shadow] focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/**
 * ハッシュリンク( /#sets や #faq など )を、現在URLと同じハッシュでも確実にスクロールさせるためのonClickハンドラを生成する。
 *
 * 背景: Next.jsの<Link>はURLが変わらない場合ナビゲーションをスキップするため、
 *       一度ハッシュ位置にいる状態で同じリンクを再クリックしてもスクロールしない問題がある。
 *       この関数を介すことで、同一ページのハッシュ移動を明示的に scrollIntoView で実行する。
 *
 * @param href リンク先のhref値( "/#sets" など )
 * @param originalOnClick 既存のonClickがあれば渡す(クローズなど他の処理を引き継ぐため)
 */
export function makeHashScrollHandler(
  href: string,
  originalOnClick?: (e: MouseEvent<HTMLAnchorElement>) => void,
) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    originalOnClick?.(e);
    if (e.defaultPrevented) return;

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const hash = href.slice(hashIndex + 1);
    if (!hash) return;

    // /#sets → "/", #sets → "" のように、リンク先のパスを抽出
    const targetPath = href.slice(0, hashIndex);
    const onSamePage =
      targetPath === "" ||
      targetPath === window.location.pathname ||
      (targetPath === "/" && window.location.pathname === "/");

    if (!onSamePage) return; // 別ページ遷移はNext.jsの<Link>に任せる

    const target = document.getElementById(hash);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (window.location.hash !== `#${hash}`) {
      history.replaceState(null, "", `#${hash}`);
    }
  };
}
