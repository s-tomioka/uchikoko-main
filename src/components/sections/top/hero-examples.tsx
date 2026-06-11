"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImagePreviewDialog } from "@/components/ui/image-preview-dialog";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

type HeroExampleItem = {
  title: string;
  image: string;
  src?: string;
};

type HeroExampleTab = {
  key: string;
  label: string;
  items: HeroExampleItem[];
};

const heroExampleTabs: HeroExampleTab[] = [
  {
    key: "dog",
    label: "いぬ",
    items: [
      { title: "柴犬・赤", image: "dog-01.png", src: "/images/top/example/dog/dog-01.png" },
      { title: "トイプードル・アプリコット", image: "dog-02.png", src: "/images/top/example/dog/dog-02.png" },
      { title: "豆柴・黒", image: "dog-03.png", src: "/images/top/example/dog/dog-03.png" },
      { title: "ゴールデンレトリバー", image: "dog-04.png", src: "/images/top/example/dog/dog-04.png" },
      { title: "フレンチブルドッグ", image: "dog-05.png", src: "/images/top/example/dog/dog-05.png" },
      { title: "ミニチュアダックスフンド", image: "dog-06.png", src: "/images/top/example/dog/dog-06.png" },
    ],
  },
  {
    key: "cat",
    label: "ねこ",
    items: [
      { title: "スコティッシュフォールド・三毛", image: "cat-01.png", src: "/images/top/example/cat/cat-01.png" },
      { title: "アメリカンショートヘア", image: "cat-02.png", src: "/images/top/example/cat/cat-02.png" },
      { title: "白猫", image: "cat-03.png", src: "/images/top/example/cat/cat-03.png" },
      { title: "黒猫", image: "cat-04.png", src: "/images/top/example/cat/cat-04.png" },
      { title: "マンチカン", image: "cat-05.png", src: "/images/top/example/cat/cat-05.png" },
      { title: "ロシアンブルー", image: "cat-06.png", src: "/images/top/example/cat/cat-06.png" },
    ],
  },
  {
    key: "bird",
    label: "鳥",
    items: [
      { title: "セキセイインコ", image: "bird-01.png", src: "/images/top/example/bird/bird-01.png" },
      { title: "オカメインコ", image: "bird-02.png", src: "/images/top/example/bird/bird-02.png" },
      { title: "文鳥", image: "bird-03.png", src: "/images/top/example/bird/bird-03.png" },
    ],
  },
  {
    key: "rabbit",
    label: "うさぎ",
    items: [
      { title: "ホーランドロップ", image: "rabit-01.png", src: "/images/top/example/rabit/rabit-01.png" },
      { title: "ネザーランドドワーフ", image: "rabit-02.png", src: "/images/top/example/rabit/rabit-02.png" },
    ],
  },
  {
    key: "turtle",
    label: "亀",
    items: [
      { title: "リクガメ", image: "turtle-01.png", src: "/images/top/example/turtle/turtle-01.png" },
      { title: "ミドリガメ", image: "turtle-02.png", src: "/images/top/example/turtle/turtle-02.png" },
    ],
  },
];

export function HeroExamples() {
  const [activeKey, setActiveKey] = useState(heroExampleTabs[0].key);
  const activeTab =
    heroExampleTabs.find((tab) => tab.key === activeKey) ?? heroExampleTabs[0];
  const galleryScrollRef = useRef<HTMLDivElement>(null);

  const [preview, setPreview] = useState<{
    images: { src: string; alt: string }[];
    index: number;
  } | null>(null);

  useEffect(() => {
    setPreview(null);
    const el = galleryScrollRef.current;
    if (el) {
      el.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [activeKey]);

  function openPreview(item: HeroExampleItem) {
    if (!item.src) return;
    const images = activeTab.items
      .filter((i): i is HeroExampleItem & { src: string } => Boolean(i.src))
      .map((i) => ({ src: i.src, alt: i.title }));
    const index = images.findIndex((i) => i.src === item.src);
    if (index < 0) return;
    setPreview({ images, index });
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="ペットの種類"
        className="mb-10 flex flex-wrap justify-center gap-2 md:mb-12 md:gap-3"
      >
        {heroExampleTabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(tab.key)}
              className={cn(
                "rounded-full px-5 py-2 text-[12px] tracking-[0.06em] transition-colors md:text-[13px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2",
                isActive
                  ? "bg-foreground text-white"
                  : "bg-bg-subtle text-text-sub hover:bg-foreground/10",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div key={activeKey} className="hero-examples-tab-panel">
        <div
          ref={galleryScrollRef}
          role="region"
          aria-label={`${activeTab.label}のフォトギャラリー。横にスワイプして他の写真を表示できます。`}
          className={cn(
            "flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-px md:overflow-visible md:snap-none [&::-webkit-scrollbar]:hidden",
            "max-md:-mx-6 max-md:w-[calc(100%+3rem)] max-md:scroll-px-6 md:mx-0 md:w-full",
          )}
        >
          <div className="max-md:w-6 max-md:shrink-0 md:hidden" aria-hidden />
          {activeTab.items.map((item) =>
            item.src ? (
              <div
                key={item.image}
                className="relative aspect-[4/3] w-[85vw] max-w-[min(85vw,100%)] shrink-0 snap-start overflow-hidden md:w-full md:max-w-none md:min-w-0 md:snap-normal md:shrink"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => openPreview(item)}
                  className="absolute inset-0 cursor-zoom-in bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
                  aria-label={`${item.title}の写真を拡大表示`}
                />
              </div>
            ) : (
              <ImagePlaceholder
                key={item.image}
                className="aspect-[4/3] w-[85vw] max-w-[min(85vw,100%)] shrink-0 snap-start md:w-full md:max-w-none md:min-w-0 md:snap-normal md:shrink"
                label={item.image}
              />
            ),
          )}
          <div className="max-md:w-6 max-md:shrink-0 md:hidden" aria-hidden />
        </div>
      </div>

      <ImagePreviewDialog
        images={preview?.images ?? null}
        startIndex={preview?.index ?? 0}
        onClose={() => setPreview(null)}
      />
    </div>
  );
}
