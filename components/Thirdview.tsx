"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export function Thirdview() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  previewUrlRef.current = previewUrl;

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(file);
        });
      }
    },
    []
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleReset = useCallback(() => {
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  useEffect(
    () => () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    },
    []
  );

  return (
    <section className="flex flex-col items-center gap-12 lg:gap-16 px-6 md:px-16 lg:px-[200px] py-16 lg:py-20 bg-cream">
      <div className="flex flex-col items-center gap-8 w-full">
        <h2 className="font-bold text-2xl md:text-3xl leading-[1.5] text-text-dark text-center">
          大切な家族があなたのそばに。
        </h2>
        <div className="w-full max-w-[1074px]">
          <div className="flex flex-col md:flex-row justify-center" style={{ gap: 24 }}>
            <div className="relative w-full max-w-[326px] mx-auto md:mx-0 overflow-hidden rounded-2xl" style={{ aspectRatio: "326/434" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/family1.png"
                alt="陶器のイメージ1"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full max-w-[326px] mx-auto md:mx-0 overflow-hidden rounded-2xl" style={{ aspectRatio: "326/434" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/family2.png"
                alt="陶器のイメージ2"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="relative w-full max-w-[326px] mx-auto md:mx-0 overflow-hidden rounded-2xl" style={{ aspectRatio: "326/434" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/family3.png"
                alt="陶器のイメージ3"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="order" className="flex flex-col items-center gap-8 w-full scroll-mt-20">
        <h3 className="font-bold text-xl md:text-2xl leading-[1.5] text-text-dark text-center">
          お気に入りの写真でお手元に届く陶器のイメージをしてみませんか？
        </h3>
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-[15px] w-full max-w-[1013px]">
          {/* Upload area - Figma: 326x434, #FAE7DA */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="relative w-full max-w-[326px] min-h-[280px] md:min-h-[434px] mx-auto md:mx-0 rounded-2xl border-2 border-dashed border-[#E38056] bg-upload-bg cursor-pointer flex flex-col items-center justify-center gap-4 px-12 py-8"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="font-bold text-base text-[#E38056] text-center">
              写真をドラッグ&ドロップ
            </p>
            <div className="flex items-center justify-center px-6 py-3 rounded-full border border-[#E38056] bg-transparent">
              <span className="font-bold text-sm text-[#E38056]">
                ファイルからアップロード
              </span>
            </div>
          </div>

          {/* 右向き矢印 */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0 text-[#E38056]">
            <svg width="40" height="24" viewBox="0 0 34 16" fill="none" className="shrink-0">
              <path d="M0 8H30M30 8L22 2M30 8L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Preview area - Figma: 326x434 */}
          <div className="relative w-full max-w-[326px] min-h-[280px] md:min-h-[434px] mx-auto md:mx-0 rounded-2xl overflow-hidden" style={{ aspectRatio: "326/434" }}>
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="アップロードした写真"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 backdrop-blur-[20px] flex flex-col items-center justify-center gap-4 p-6">
                  <p className="font-bold text-base text-white text-center">
                    陶器イメージを作成します
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="text-sm text-white/90 underline"
                  >
                    別の写真を選ぶ
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/preview-placeholder.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 backdrop-blur-[20px] flex flex-col items-center justify-center p-6">
                  <p className="font-bold text-base text-white text-center">
                    陶器イメージを作成します
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
