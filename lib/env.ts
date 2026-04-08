import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  APP_URL: z.string().url(),
  AUTH_SECRET: z.string().min(16),
  EMAIL_FROM: z.string().email(),
  SMTP_URL: z.string().min(1),
  STORAGE_ENDPOINT: z.string().url(),
  STORAGE_BUCKET: z.string().min(1),
  STORAGE_ACCESS_KEY: z.string().min(1),
  STORAGE_SECRET_KEY: z.string().min(1),
  CDN_BASE_URL: z.string().url(),
  ANALYTICS_KEY: z.string().optional(),
  ERROR_TRACKING_DSN: z.string().optional(),
});

export type AppEnv = z.infer<typeof envSchema>;

export function parseEnv(input: Record<string, string | undefined>): AppEnv {
  return envSchema.parse(input);
}
