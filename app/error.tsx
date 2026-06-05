"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-8">
      <h2 className="text-xl font-bold text-text-dark mb-4">問題が発生しました</h2>
      <p className="text-text-dark mb-6">ページの読み込み中にエラーが発生しました。</p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full bg-orange text-white font-bold hover:opacity-90"
      >
        再試行
      </button>
    </div>
  );
}
