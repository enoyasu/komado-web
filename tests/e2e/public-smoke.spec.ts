import { expect, test } from "@playwright/test";

const runE2E = process.env.RUN_E2E === "1";
const smoke = runE2E ? test : test.skip;

smoke("public routes are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("公開Web漫画プラットフォーム")).toBeVisible();

  await page.goto("/works");
  await expect(page.getByRole("heading", { name: "作品一覧" })).toBeVisible();

  await page.goto("/works/sample-work");
  await expect(page.getByRole("heading", { name: "サンプル連載：街角スケッチ" })).toBeVisible();

  await page.goto("/works/sample-work/chapters/chapter-1");
  await expect(page.getByText("縦スクロールビューア")).toBeVisible();
});
