"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "sans-serif", padding: "2rem", background: "#FDF5EF" }}>
        <h2>問題が発生しました</h2>
        <p>ページの読み込み中にエラーが発生しました。</p>
        <button
          onClick={reset}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            background: "#E38056",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          再試行
        </button>
      </body>
    </html>
  );
}
