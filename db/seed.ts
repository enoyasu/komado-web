import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {
      displayName: "読者たろう",
      role: "user",
    },
    create: {
      email: "user@example.com",
      handle: "reader_taro",
      displayName: "読者たろう",
      role: "user",
    },
  });

  const creator = await prisma.user.upsert({
    where: { email: "creator@example.com" },
    update: {
      displayName: "サンプル作者",
      role: "creator",
    },
    create: {
      email: "creator@example.com",
      handle: "sample_creator",
      displayName: "サンプル作者",
      role: "creator",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      displayName: "運営管理者",
      role: "admin",
    },
    create: {
      email: "admin@example.com",
      handle: "komado_admin",
      displayName: "運営管理者",
      role: "admin",
    },
  });

  await prisma.creatorProfile.upsert({
    where: { userId: creator.id },
    update: {
      penName: "サンプル作者",
      bio: "日常を切り取る漫画を連載中",
      links: ["https://x.com/sample_creator"],
    },
    create: {
      userId: creator.id,
      penName: "サンプル作者",
      bio: "日常を切り取る漫画を連載中",
      links: ["https://x.com/sample_creator"],
    },
  });

  const tag = await prisma.tag.upsert({
    where: { slug: "nichijou" },
    update: { name: "日常" },
    create: { name: "日常", slug: "nichijou" },
  });

  const work = await prisma.work.upsert({
    where: { slug: "sample-work" },
    update: {
      title: "サンプル連載：街角スケッチ",
      description: "seedデータ用の公開作品",
      status: "published",
      publishedAt: new Date("2026-04-01T00:00:00.000Z"),
      coverImageKey: "brand/logo-square.png",
      creatorId: creator.id,
    },
    create: {
      creatorId: creator.id,
      title: "サンプル連載：街角スケッチ",
      slug: "sample-work",
      description: "seedデータ用の公開作品",
      status: "published",
      publishedAt: new Date("2026-04-01T00:00:00.000Z"),
      coverImageKey: "brand/logo-square.png",
    },
  });

  await prisma.workTag.upsert({
    where: { workId_tagId: { workId: work.id, tagId: tag.id } },
    update: {},
    create: {
      workId: work.id,
      tagId: tag.id,
    },
  });

  const chapter = await prisma.chapter.upsert({
    where: { workId_slug: { workId: work.id, slug: "chapter-1" } },
    update: {
      title: "第1話 いつもの朝",
      chapterNumber: 1,
      status: "published",
      publishedAt: new Date("2026-04-01T00:00:00.000Z"),
    },
    create: {
      workId: work.id,
      chapterNumber: 1,
      title: "第1話 いつもの朝",
      slug: "chapter-1",
      summary: "朝の通学路で起きた小さな出来事",
      status: "published",
      publishedAt: new Date("2026-04-01T00:00:00.000Z"),
    },
  });

  const pageImages = [
    "sample/chapter-pages/sample-1.png",
    "sample/chapter-pages/sample-2.png",
    "sample/chapter-pages/sample-3.png",
  ];

  for (const [index, imageKey] of pageImages.entries()) {
    await prisma.chapterPage.upsert({
      where: {
        chapterId_pageIndex: {
          chapterId: chapter.id,
          pageIndex: index,
        },
      },
      update: {
        imageKey,
      },
      create: {
        chapterId: chapter.id,
        pageIndex: index,
        imageKey,
        width: 1200,
        height: 1680,
      },
    });
  }

  await prisma.follow.upsert({
    where: { userId_workId: { userId: user.id, workId: work.id } },
    update: {},
    create: { userId: user.id, workId: work.id },
  });

  await prisma.bookmark.upsert({
    where: { userId_workId: { userId: user.id, workId: work.id } },
    update: {},
    create: { userId: user.id, workId: work.id },
  });

  await prisma.report.upsert({
    where: { id: "seed-report-001" },
    update: {
      targetType: "chapter",
      targetId: chapter.id,
      reason: "権利侵害の懸念",
      status: "open",
    },
    create: {
      id: "seed-report-001",
      reporterId: user.id,
      targetType: "chapter",
      targetId: chapter.id,
      reason: "権利侵害の懸念",
      note: "類似構図の確認をお願いします",
      status: "open",
    },
  });

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "seed_initialized",
      targetType: "system",
      targetId: "seed",
      metadata: { seededBy: "db/seed.ts" },
    },
  });
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
