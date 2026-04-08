export type Role = "guest" | "user" | "creator" | "moderator" | "admin";
export type WorkStatus = "draft" | "published" | "hidden";
export type ChapterStatus = "draft" | "scheduled" | "published" | "hidden";

export type User = {
  id: string;
  email: string;
  handle: string;
  displayName: string;
  role: Role;
};

export type CreatorProfile = {
  userId: string;
  handle: string;
  penName: string;
  bio: string;
  links: string[];
};

export type Work = {
  id: string;
  creatorId: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  status: WorkStatus;
  tags: string[];
  updatedAt: string;
  publishedAt: string;
  isCompleted: boolean;
  ageRating: "all" | "teen";
};

export type Chapter = {
  id: string;
  workId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  summary: string;
  status: ChapterStatus;
  publishedAt: string;
  pages: string[];
};

export type Report = {
  id: string;
  reporterId: string;
  targetType: "work" | "chapter";
  targetId: string;
  reason: string;
  note: string;
  status: "open" | "in_review" | "resolved";
  createdAt: string;
};

export const users: User[] = [
  {
    id: "u_user",
    email: "user@example.com",
    handle: "reader_taro",
    displayName: "読者たろう",
    role: "user",
  },
  {
    id: "u_creator",
    email: "creator@example.com",
    handle: "sample-creator",
    displayName: "サンプル作者",
    role: "creator",
  },
  {
    id: "u_admin",
    email: "admin@example.com",
    handle: "komado-admin",
    displayName: "運営管理者",
    role: "admin",
  },
];

export const creatorProfiles: CreatorProfile[] = [
  {
    userId: "u_creator",
    handle: "sample-creator",
    penName: "サンプル作者",
    bio: "日常の小さな驚きを描く個人漫画制作者。毎週金曜更新。",
    links: ["https://x.com/sample_creator"],
  },
];

export const works: Work[] = [
  {
    id: "w_sample",
    creatorId: "u_creator",
    title: "サンプル連載：街角スケッチ",
    slug: "sample-work",
    description:
      "街で見かけた人々の小さなドラマを描く短編連作。縦スクロールで読みやすく、通勤時間にもぴったり。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["日常", "ショート", "モバイル向け"],
    updatedAt: "2026-04-09T00:00:00.000Z",
    publishedAt: "2026-04-01T00:00:00.000Z",
    isCompleted: false,
    ageRating: "all",
  },
  {
    id: "w_night",
    creatorId: "u_creator",
    title: "夜明け前のノート",
    slug: "before-dawn-note",
    description:
      "創作に悩む主人公が、毎朝少しずつ前に進むヒューマンドラマ。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["ヒューマンドラマ", "連載"],
    updatedAt: "2026-04-07T00:00:00.000Z",
    publishedAt: "2026-03-15T00:00:00.000Z",
    isCompleted: false,
    ageRating: "teen",
  },
];

export const chapters: Chapter[] = [
  {
    id: "c_sample_1",
    workId: "w_sample",
    chapterNumber: 1,
    title: "第1話 いつもの朝",
    slug: "chapter-1",
    summary: "慌ただしい朝に起きた小さな出会い。",
    status: "published",
    publishedAt: "2026-04-01T00:00:00.000Z",
    pages: [
      "/sample/chapter-pages/sample-1.png",
      "/sample/chapter-pages/sample-2.png",
      "/sample/chapter-pages/sample-3.png",
    ],
  },
  {
    id: "c_sample_2",
    workId: "w_sample",
    chapterNumber: 2,
    title: "第2話 夕焼けベンチ",
    slug: "chapter-2",
    summary: "放課後の公園で交わる二人の視線。",
    status: "published",
    publishedAt: "2026-04-08T00:00:00.000Z",
    pages: [
      "/sample/chapter-pages/sample-2.png",
      "/sample/chapter-pages/sample-3.png",
      "/sample/chapter-pages/sample-1.png",
    ],
  },
  {
    id: "c_night_1",
    workId: "w_night",
    chapterNumber: 1,
    title: "第1話 4時42分",
    slug: "chapter-1",
    summary: "まだ暗い部屋でペンを握る。",
    status: "published",
    publishedAt: "2026-03-15T00:00:00.000Z",
    pages: ["/sample/chapter-pages/sample-1.png", "/sample/chapter-pages/sample-2.png"],
  },
];

export const reports: Report[] = [
  {
    id: "r_001",
    reporterId: "u_user",
    targetType: "chapter",
    targetId: "c_sample_1",
    reason: "権利侵害の懸念",
    note: "他作品との構図類似が気になりました。",
    status: "open",
    createdAt: "2026-04-08T12:00:00.000Z",
  },
];

export function getPublishedWorks(): Work[] {
  return works
    .filter((work) => work.status === "published")
    .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
}

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug && work.status === "published");
}

export function getWorkById(id: string): Work | undefined {
  return works.find((work) => work.id === id);
}

export function getWorksByTag(tagSlug: string): Work[] {
  const normalized = decodeURIComponent(tagSlug).toLowerCase();
  return getPublishedWorks().filter((work) =>
    work.tags.some((tag) => tag.toLowerCase() === normalized),
  );
}

export function getCreatorByHandle(handle: string): CreatorProfile | undefined {
  return creatorProfiles.find((creator) => creator.handle === handle);
}

export function getWorksByCreator(creatorId: string): Work[] {
  return getPublishedWorks().filter((work) => work.creatorId === creatorId);
}

export function getChaptersByWork(workId: string): Chapter[] {
  return chapters
    .filter((chapter) => chapter.workId === workId && chapter.status === "published")
    .sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getChapterBySlug(workId: string, chapterSlug: string): Chapter | undefined {
  return getChaptersByWork(workId).find((chapter) => chapter.slug === chapterSlug);
}

export function getAllTags(): string[] {
  return [...new Set(works.flatMap((work) => work.tags))].sort((a, b) =>
    a.localeCompare(b, "ja"),
  );
}

export function getSampleAuditLogs(): Array<{ action: string; target: string; at: string }> {
  return [
    {
      action: "work_hidden",
      target: "w_sample",
      at: "2026-04-08T09:00:00.000Z",
    },
    {
      action: "report_status_changed",
      target: "r_001",
      at: "2026-04-08T12:30:00.000Z",
    },
  ];
}
