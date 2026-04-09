import { PrismaClient } from "@prisma/client";
import { chapters as mockChapters, works as mockWorks } from "../lib/mock-data";
import { createPasswordHash } from "../server/auth/password";

const prisma = new PrismaClient();
const defaultPasswordHash = createPasswordHash("password123");

type SeedUser = {
  email: string;
  handle: string;
  displayName: string;
  role: "user" | "creator" | "admin";
  onboardingTrack: "reader" | "creator";
};

const seedUsers: SeedUser[] = [
  {
    email: "user@example.com",
    handle: "reader_taro",
    displayName: "読者たろう",
    role: "user",
    onboardingTrack: "reader",
  },
  {
    email: "reader2@example.com",
    handle: "reader_hana",
    displayName: "読者はな",
    role: "user",
    onboardingTrack: "reader",
  },
  {
    email: "creator@example.com",
    handle: "sample_creator",
    displayName: "サンプル作者",
    role: "creator",
    onboardingTrack: "creator",
  },
  {
    email: "creator2@example.com",
    handle: "nagi_manga",
    displayName: "凪まんが",
    role: "creator",
    onboardingTrack: "creator",
  },
  {
    email: "creator3@example.com",
    handle: "hoshi_panel",
    displayName: "星パネル",
    role: "creator",
    onboardingTrack: "creator",
  },
  {
    email: "admin@example.com",
    handle: "komado_admin",
    displayName: "運営管理者",
    role: "admin",
    onboardingTrack: "reader",
  },
];

const creatorEmailByMockId: Record<string, string> = {
  u_creator_01: "creator@example.com",
  u_creator_02: "creator2@example.com",
  u_creator_03: "creator3@example.com",
};

function toTagSlug(tag: string, index: number): string {
  const normalized = tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized ? `tag-${normalized}` : `tag-${index}`;
}

async function resetTables() {
  await prisma.auditLog.deleteMany();
  await prisma.report.deleteMany();
  await prisma.readingProgress.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.workTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.chapterPage.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.work.deleteMany();
  await prisma.creatorProfile.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await resetTables();

  const userByEmail = new Map<string, { id: string }>();

  for (const user of seedUsers) {
    const created = await prisma.user.create({
      data: {
        email: user.email,
        handle: user.handle,
        displayName: user.displayName,
        role: user.role,
        passwordHash: defaultPasswordHash,
        onboardingCompleted: true,
        onboardingTrack: user.onboardingTrack,
        lastLoginAt: new Date("2026-04-09T00:00:00.000Z"),
      },
      select: {
        id: true,
      },
    });

    userByEmail.set(user.email, created);
  }

  const creatorProfiles = [
    {
      email: "creator@example.com",
      penName: "サンプル作者",
      bio: "日常の小さな驚きを描く個人漫画制作者。毎週金曜更新。",
      links: ["https://x.com/sample_creator"],
    },
    {
      email: "creator2@example.com",
      penName: "凪まんが",
      bio: "ゆるい空気感と短編ギャグを中心に制作。",
      links: ["https://x.com/nagi_manga"],
    },
    {
      email: "creator3@example.com",
      penName: "星パネル",
      bio: "SF・ミステリーを縦スクロールに最適化して連載中。",
      links: ["https://x.com/hoshi_panel"],
    },
  ];

  for (const profile of creatorProfiles) {
    const owner = userByEmail.get(profile.email);
    if (!owner) {
      continue;
    }

    await prisma.creatorProfile.create({
      data: {
        userId: owner.id,
        penName: profile.penName,
        bio: profile.bio,
        links: profile.links,
      },
    });
  }

  const uniqueTags = [...new Set(mockWorks.flatMap((work) => work.tags))];
  const tagIdByName = new Map<string, string>();

  for (const [index, tag] of uniqueTags.entries()) {
    const createdTag = await prisma.tag.create({
      data: {
        name: tag,
        slug: toTagSlug(tag, index),
      },
      select: {
        id: true,
        name: true,
      },
    });

    tagIdByName.set(createdTag.name, createdTag.id);
  }

  const workIdByMockId = new Map<string, string>();

  for (const work of mockWorks) {
    const creatorEmail = creatorEmailByMockId[work.creatorId] ?? "creator@example.com";
    const creator = userByEmail.get(creatorEmail);

    if (!creator) {
      continue;
    }

    const createdWork = await prisma.work.create({
      data: {
        creatorId: creator.id,
        title: work.title,
        slug: work.slug,
        description: work.description,
        coverImageKey: "brand/logo-square.png",
        status: work.status,
        visibility: "public",
        ageRating: work.ageRating,
        language: "ja",
        isCompleted: work.isCompleted,
        publishedAt: work.status === "published" ? new Date(work.publishedAt) : null,
      },
      select: {
        id: true,
      },
    });

    workIdByMockId.set(work.id, createdWork.id);

    for (const tag of work.tags) {
      const tagId = tagIdByName.get(tag);
      if (!tagId) {
        continue;
      }

      await prisma.workTag.create({
        data: {
          workId: createdWork.id,
          tagId,
        },
      });
    }
  }

  const chapterIdByMockId = new Map<string, string>();

  for (const chapter of mockChapters) {
    const workId = workIdByMockId.get(chapter.workId);
    if (!workId) {
      continue;
    }

    const createdChapter = await prisma.chapter.create({
      data: {
        workId,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        slug: chapter.slug,
        summary: chapter.summary,
        status: chapter.status,
        publishedAt: chapter.status === "published" ? new Date(chapter.publishedAt) : null,
      },
      select: {
        id: true,
      },
    });

    chapterIdByMockId.set(chapter.id, createdChapter.id);

    for (const [index, imagePath] of chapter.pages.entries()) {
      await prisma.chapterPage.create({
        data: {
          chapterId: createdChapter.id,
          pageIndex: index,
          imageKey: imagePath.replace(/^\//, ""),
          width: 1200,
          height: 1680,
        },
      });
    }
  }

  const reader = userByEmail.get("user@example.com");
  const secondReader = userByEmail.get("reader2@example.com");
  const allWorkIds = [...workIdByMockId.values()];

  if (reader) {
    for (const workId of allWorkIds.slice(0, 6)) {
      await prisma.follow.create({
        data: {
          userId: reader.id,
          workId,
        },
      });
    }

    for (const workId of allWorkIds.slice(0, 4)) {
      await prisma.bookmark.create({
        data: {
          userId: reader.id,
          workId,
        },
      });
    }
  }

  if (secondReader) {
    for (const workId of allWorkIds.slice(2, 8)) {
      await prisma.follow.create({
        data: {
          userId: secondReader.id,
          workId,
        },
      });
    }
  }

  if (reader && allWorkIds.length > 0) {
    const targetWorkId = allWorkIds[0];
    const firstChapter = [...chapterIdByMockId.values()][0];

    if (firstChapter) {
      await prisma.readingProgress.create({
        data: {
          userId: reader.id,
          workId: targetWorkId,
          chapterId: firstChapter,
          pageIndex: 4,
          progressRatio: 0.62,
        },
      });
    }
  }

  const chapterTargets = [...chapterIdByMockId.values()];
  if (reader && chapterTargets.length > 1) {
    await prisma.report.create({
      data: {
        reporterId: reader.id,
        targetType: "chapter",
        targetId: chapterTargets[0],
        reason: "権利侵害の懸念",
        note: "類似構図の確認をお願いします",
        status: "open",
      },
    });

    await prisma.report.create({
      data: {
        reporterId: reader.id,
        targetType: "chapter",
        targetId: chapterTargets[1],
        reason: "年齢レーティング見直し",
        note: "刺激の強い描写がありました",
        status: "in_review",
      },
    });
  }

  const admin = userByEmail.get("admin@example.com");
  if (admin) {
    await prisma.auditLog.create({
      data: {
        actorId: admin.id,
        action: "seed_initialized",
        targetType: "system",
        targetId: "seed",
        metadata: {
          users: seedUsers.length,
          works: workIdByMockId.size,
          chapters: chapterIdByMockId.size,
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
