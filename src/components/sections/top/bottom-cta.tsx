import { Button } from "@/components/ui/button";

export function BottomCtaSection() {
  return (
    <section className="fade-up">
      <div className="container py-28 md:py-36 md:text-center">
        <p className="mb-12 max-w-md text-[13px] leading-[2.2] tracking-wide text-text-muted md:mx-auto md:mb-14">
          ご不明点などございましたら、
          <br />
          いつでもお気軽にお問い合わせください。
        </p>
        <div className="flex flex-wrap md:justify-center gap-3">
          <Button href="/single" variant="primary">
            注文する
          </Button>
        </div>
      </div>
    </section>
  );
}
