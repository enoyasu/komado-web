import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "komado",
    template: "%s | komado",
  },
  description: "個人漫画制作者のための公開Web漫画プラットフォーム",
  metadataBase: new URL(process.env.APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "komado",
    description: "個人漫画制作者のための公開Web漫画プラットフォーム",
    images: ["/brand/ogp.png"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/ogp.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
