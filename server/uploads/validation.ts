import { z } from "zod";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const maxFileSizeBytes = 10 * 1024 * 1024;
const maxFiles = 120;

const uploadFileSchema = z.object({
  name: z.string().min(1),
  mimeType: z.string().refine((mime) => allowedMimeTypes.includes(mime), {
    message: "未対応のファイル形式です",
  }),
  size: z.number().max(maxFileSizeBytes, "ファイルサイズが上限を超えています"),
});

export const chapterUploadSchema = z.object({
  files: z.array(uploadFileSchema).min(1).max(maxFiles),
});

export function validateChapterUpload(input: unknown) {
  return chapterUploadSchema.safeParse(input);
}

export const uploadLimits = {
  allowedMimeTypes,
  maxFileSizeBytes,
  maxFiles,
};
