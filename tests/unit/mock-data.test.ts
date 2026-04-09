import { describe, expect, test } from "vitest";
import {
  getReadersAlsoLike,
  getRecommendedByGenre,
  getWeeklyTrendingWorks,
  resolveChapterAccess,
  chapters,
} from "@/lib/mock-data";

describe("mock-data recommendation and access helpers", () => {
  test("weekly trending is sorted by growth desc", () => {
    const trending = getWeeklyTrendingWorks(5);
    expect(trending.length).toBeGreaterThan(0);

    for (let index = 1; index < trending.length; index += 1) {
      expect(trending[index - 1].weeklyGrowthScore).toBeGreaterThanOrEqual(
        trending[index].weeklyGrowthScore,
      );
    }
  });

  test("same-genre recommendations exclude current work", () => {
    const targetSlug = "sample-work";
    const recommended = getRecommendedByGenre(targetSlug, 4);
    expect(recommended.some((work) => work.slug === targetSlug)).toBe(false);
  });

  test("readers-also-like returns fallback results", () => {
    const result = getReadersAlsoLike("sample-work", 4);
    expect(result.length).toBe(4);
    expect(result.some((work) => work.slug === "sample-work")).toBe(false);
  });

  test("guest receives preview for partial or paid chapters", () => {
    const chapter = chapters.find((item) => item.accessModel === "partial_preview");
    expect(chapter).toBeDefined();
    if (!chapter) {
      return;
    }

    const access = resolveChapterAccess(chapter, { role: "guest", isLoggedIn: false });
    expect(access.canReadFull).toBe(false);
    expect(access.requiresPurchase).toBe(true);
    expect(access.visiblePages.length).toBe(chapter.freePageCount);
  });

  test("creator can read paid chapters fully", () => {
    const chapter = chapters.find((item) => item.accessModel === "paid");
    expect(chapter).toBeDefined();
    if (!chapter) {
      return;
    }

    const access = resolveChapterAccess(chapter, { role: "creator", isLoggedIn: true });
    expect(access.canReadFull).toBe(true);
    expect(access.visiblePages.length).toBe(chapter.pages.length);
  });
});
