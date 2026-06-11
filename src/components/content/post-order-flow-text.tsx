import { cn } from "@/lib/utils";

export function PostOrderFlowText({ className }: { className?: string }) {
  return (
    <p className={cn("text-[13px] leading-[2.2] tracking-wide text-text-muted", className)}>
      ご注文内容を確認し、
      <br className="md:hidden" />
      担当者よりメールにてご連絡いたします。
      <br />
      頂いたメールアドレスに3Dデータと
      <br className="md:hidden" />
      お支払い手続きのURLをお送りいたします。
      <br />
      お支払い後、制作を開始致します。
    </p>
  );
}
