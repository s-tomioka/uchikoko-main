"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type PreviewImageItem = {
  src: string;
  alt: string;
};

type ImagePreviewDialogProps = {
  images: PreviewImageItem[] | null;
  startIndex?: number;
  onClose: () => void;
};

export function ImagePreviewDialog({
  images,
  startIndex = 0,
  onClose,
}: ImagePreviewDialogProps) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    if (!images?.length) return;
    setIndex(Math.min(Math.max(0, startIndex), images.length - 1));
  }, [images, startIndex]);

  const current = images?.[index];
  const canPrev = images && images.length > 1 && index > 0;
  const canNext = images && images.length > 1 && index < images.length - 1;

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (images ? Math.min(images.length - 1, i + 1) : i));
  }, [images]);

  useEffect(() => {
    if (!images?.length) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images?.length, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!images?.length) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [images?.length]);

  if (!images?.length || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-label="写真プレビュー"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 bg-black/75"
        aria-label="プレビューを閉じる"
        onClick={onClose}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center p-4">
        <div
          className="pointer-events-auto relative flex max-h-[85vh] max-w-full flex-col items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[80vh] max-w-full object-contain"
          />
          {images.length > 1 && (
            <p className="text-center text-[11px] tracking-wide text-white/80">
              {index + 1} / {images.length}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        className="pointer-events-auto absolute right-4 top-4 z-[2] flex size-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition-colors hover:bg-white"
        onClick={onClose}
        aria-label="閉じる"
      >
        <X className="size-5" strokeWidth={1.5} />
      </button>

      {images.length > 1 && canPrev && (
        <button
          type="button"
          className="pointer-events-auto absolute left-2 top-1/2 z-[2] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition-colors hover:bg-white md:left-6 md:size-12"
          onClick={goPrev}
          aria-label="前の写真"
        >
          <ChevronLeft className="size-6" strokeWidth={1.5} />
        </button>
      )}

      {images.length > 1 && canNext && (
        <button
          type="button"
          className="pointer-events-auto absolute right-2 top-1/2 z-[2] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm transition-colors hover:bg-white md:right-6 md:size-12"
          onClick={goNext}
          aria-label="次の写真"
        >
          <ChevronRight className="size-6" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
