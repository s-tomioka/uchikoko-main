import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { PageTransition } from "@/components/layout/page-transition";
import { ScrollObserver } from "@/components/layout/scroll-observer";
import { GA4_MEASUREMENT_ID, GOOGLE_ADS_ID } from "@/lib/constants";

export const metadata: Metadata = {
  title: "うちここ — 大切なうちの子を、思い出だけで終わらせない。",
  description:
    "写真からつくる陶器のオブジェ「うちここ」と、仏壇・位牌・供養小物をまとめて揃えられます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <meta name="google-site-verification" content="LDfqGkedx6mKKP_ezgAvAG0GyyHJLfLDkFPxBojTexE" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <Script id="user-heat-init" strategy="afterInteractive">
          {`
            (function(add, cla){window['UserHeatTag']=cla;window[cla]=window[cla]||function(){(window[cla].q=window[cla].q||[]).push(arguments)},window[cla].l=1*new Date();var ul=document.createElement('script');var tag = document.getElementsByTagName('script')[0];ul.async=1;ul.src=add;tag.parentNode.insertBefore(ul,tag);})('//uh.nakanohito.jp/uhj2/uh.js', '_uhtracker');_uhtracker({id:'uhgpRwK3jY'});
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <ScrollObserver />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
