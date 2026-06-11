"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

export interface SetGalleryImage {
  src?: string;
  alt: string;
}

interface SetGalleryProps {
  images: SetGalleryImage[];
}

export function SetGallery({ images }: SetGalleryProps) {
  const safeImages = images.length > 0 ? images : [{ alt: "" }];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = safeImages[activeIndex] ?? safeImages[0];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
        {activeImage.src ? (
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <ImagePlaceholder
            className="absolute inset-0 h-full w-full"
            label={activeImage.alt}
          />
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {safeImages.map((image, index) => {
          const isActive = index === activeIndex;
          const key = image.src ?? `${image.alt}-${index}`;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`画像を表示: ${image.alt}`}
              aria-pressed={isActive}
              className={cn(
                "relative block aspect-[4/3] w-full overflow-hidden rounded-sm transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2",
                isActive
                  ? "ring-2 ring-foreground/60 ring-offset-2"
                  : "opacity-90 hover:opacity-100",
              )}
            >
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 120px, 25vw"
                  className="object-cover"
                />
              ) : (
                <ImagePlaceholder
                  className="absolute inset-0 h-full w-full bg-bg-subtle"
                  label={image.alt}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
