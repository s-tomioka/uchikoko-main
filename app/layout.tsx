import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://uchikoko.com"),
  title: "うちここ | 大切な家族との思い出をかたちに",
  description:
    "お気に入りの写真を１枚選んだら、その写真をもとに毛並みや表情を忠実に再現し、瀬戸焼の陶器としてお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-sans antialiased"
        style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
