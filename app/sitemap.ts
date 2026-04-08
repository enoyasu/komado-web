import type { MetadataRoute } from "next";
import { chapters, getPublishedWorks } from "@/lib/mock-data";

const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const works = getPublishedWorks();
  const marketingRoutes = ["", "/works", "/login", "/signup"];

  const staticRoutes = marketingRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const workRoutes = works.flatMap((work) => {
    const chapterRoutes = chapters
      .filter((chapter) => chapter.workId === work.id && chapter.status === "published")
      .map((chapter) => ({
        url: `${baseUrl}/works/${work.slug}/chapters/${chapter.slug}`,
        lastModified: new Date(chapter.publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));

    return [
      {
        url: `${baseUrl}/works/${work.slug}`,
        lastModified: new Date(work.updatedAt),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      ...chapterRoutes,
    ];
  });

  return [...staticRoutes, ...workRoutes];
}
