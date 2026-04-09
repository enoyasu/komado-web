import type { MetadataRoute } from "next";

const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/works", "/tags", "/readers", "/creators"],
        disallow: ["/admin", "/dashboard", "/settings", "/library", "/history"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
