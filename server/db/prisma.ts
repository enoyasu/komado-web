import { PrismaClient } from "@prisma/client";

declare global {
  var __komadoPrisma: PrismaClient | undefined;
}

export const prisma = global.__komadoPrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__komadoPrisma = prisma;
}
