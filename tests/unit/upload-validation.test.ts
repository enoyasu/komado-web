import { describe, expect, test } from "vitest";
import { uploadLimits, validateChapterUpload } from "@/server/uploads/validation";

describe("chapter upload validation", () => {
  test("accepts png files within limit", () => {
    const result = validateChapterUpload({
      files: [{ name: "001.png", mimeType: "image/png", size: 100_000 }],
    });
    expect(result.success).toBe(true);
  });

  test("rejects unsupported mime type", () => {
    const result = validateChapterUpload({
      files: [{ name: "001.gif", mimeType: "image/gif", size: 100_000 }],
    });
    expect(result.success).toBe(false);
  });

  test("rejects too many files", () => {
    const files = new Array(uploadLimits.maxFiles + 1)
      .fill(0)
      .map((_, index) => ({
        name: `${index}.png`,
        mimeType: "image/png",
        size: 100_000,
      }));

    const result = validateChapterUpload({ files });
    expect(result.success).toBe(false);
  });
});
