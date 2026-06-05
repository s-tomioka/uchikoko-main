import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-[#E8E4DF] bg-white">
      <div className="flex-1" />
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt=""
          width={58}
          height={58}
          className="shrink-0 w-[58px] h-[58px]"
        />
        <span className="font-bold text-2xl text-orange">
          うちここ
        </span>
      </Link>
      <div className="flex-1 flex justify-end">
      <Link
        href="#order"
        className="flex items-center justify-center px-6 py-3 rounded-full bg-orange text-white font-bold text-lg hover:opacity-90 transition-opacity shrink-0"
      >
        注文する
      </Link>
      </div>
    </header>
  );
}
