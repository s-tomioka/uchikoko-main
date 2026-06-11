import { Button } from "@/components/ui/button";
import { LINE_URL } from "@/lib/constants";

export function BottomCtaSection() {
  return (
    <section className="fade-up">
      <div className="container py-28 md:py-36 md:text-center">
        <h2 className="mb-4 text-[20px] font-extralight leading-[1.65] tracking-[0.06em] md:text-[24px]">
          あなたらしい祈りの空間を、
          <br />
          一緒にととのえませんか。
        </h2>
        <p className="mb-12 max-w-md text-[13px] leading-[2.2] tracking-wide text-text-muted md:mx-auto md:mb-14">
          ご不明点などございましたら、
          <br />
          いつでもお気軽にLINEからご相談ください。
        </p>
        <div className="flex flex-wrap md:justify-center gap-3">
          <Button
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="bg-line text-white hover:bg-line/85 active:bg-line/90"
          >
            LINEで無料相談
          </Button>
          <Button href="/single" variant="primary">
            注文する
          </Button>
        </div>
      </div>
    </section>
  );
}
