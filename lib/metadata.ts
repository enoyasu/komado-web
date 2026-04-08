import type { Metadata } from "next";

const appName = "komado";
const defaultDescription = "個人漫画制作者のための公開Web漫画プラットフォーム";
const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

export function buildMetadata(input: {
  title: string;
  description?: string;
  path?: string;
  imagePath?: string;
}): Metadata {
  const path = input.path ?? "/";
  const url = new URL(path, baseUrl).toString();
  const description = input.description ?? defaultDescription;
  const image = new URL(input.imagePath ?? "/brand/ogp.png", baseUrl).toString();

  return {
    title: `${input.title} | ${appName}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: `${input.title} | ${appName}`,
      description,
      images: [image],
      siteName: appName,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} | ${appName}`,
      description,
      images: [image],
    },
  };
}
