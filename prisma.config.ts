import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env", override: true });

export default defineConfig({
  schema: "db/schema.prisma",
});
