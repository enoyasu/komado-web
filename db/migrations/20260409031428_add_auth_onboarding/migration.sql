-- CreateEnum
CREATE TYPE "OnboardingTrack" AS ENUM ('reader', 'creator');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingTrack" "OnboardingTrack",
ADD COLUMN     "passwordHash" TEXT;
