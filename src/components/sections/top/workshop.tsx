import Image from "next/image";
import { Button } from "@/components/ui/button";

export function WorkshopSection() {
  return (
    <section id="workshop" className="fade-up">
      <div className="container py-28 md:py-36">
        <div className="mb-16 grid grid-cols-1 items-start gap-10 md:mb-20 md:grid-cols-2 md:gap-16 lg:gap-20">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
              <Image
                src="/images/top/workshop/top-workshop-main.png"
                alt="瀬戸の老舗工房"
                fill
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/top/workshop/top-workshop-sub-1.png"
                  alt="工房の様子"
                  fill
                  sizes="(min-width: 768px) 232px, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/top/workshop/top-workshop-sub-2.png"
                  alt="制作の様子"
                  fill
                  sizes="(min-width: 768px) 232px, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="md:pt-4">
            <p className="mb-5 text-[11px] tracking-[0.14em] text-text-faint uppercase">
              瀬戸・100年の歴史を持つ工房
            </p>
            <h2 className="mb-8 text-[20px] font-extralight leading-[1.65] tracking-[0.06em] md:text-[24px]">
              うちここは、陶芸の町・瀬戸の
              <br />
              老舗工房でひとつずつ焼かれます
            </h2>
            <p className="mb-6 text-[13px] leading-[2.2] tracking-wide text-text-muted">
              愛知県瀬戸市は、日本の陶磁器生産を1000年以上にわたって支えてきた、やきものの聖地です。「うちここ」は、その瀬戸で創業100年以上の歴史を持つ工房と連携して制作されています。
            </p>
            <p className="mb-10 text-[13px] leading-[2.2] tracking-wide text-text-muted">
              写真データを3Dモデルに変換し、3Dプリンターで精密に原型を成形。その後、素焼き・彩色・本焼きの工程は職人が手作業で仕上げます。
            </p>
            <Button href="/#flow" variant="outline">
              製作の流れを見る
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
