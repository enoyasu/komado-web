export type Role = "guest" | "user" | "creator" | "moderator" | "admin";
export type WorkStatus = "draft" | "published" | "hidden";
export type ChapterStatus = "draft" | "scheduled" | "published" | "hidden";
export type ChapterAccessModel = "free_full" | "partial_preview" | "paid";
export type AdPlacement = "none" | "banner" | "rewarded_preview";

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
  genre: string;
  updatedAt: string;
  publishedAt: string;
  isCompleted: boolean;
  ageRating: "all" | "teen";
  chapterPriceYen: number;
  bookPriceYen: number;
  platformFeeRate: number;
  tipEnabled: boolean;
  weakAdsEnabled: boolean;
  weeklyGrowthScore: number;
  readCount: number;
  favoriteCount: number;
  recommendationSlugs: string[];
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
  accessModel: ChapterAccessModel;
  freePageCount: number;
  chapterPriceYen: number;
  adPlacement: AdPlacement;
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

export type ChapterAccessState = {
  canReadFull: boolean;
  visiblePages: string[];
  requiresPurchase: boolean;
  showWeakAds: boolean;
  lockedMessage?: string;
};

const samplePages = [
  "/sample/chapter-pages/sample-1.png",
  "/sample/chapter-pages/sample-2.png",
  "/sample/chapter-pages/sample-3.png",
];

function pages(length: number, offset = 0): string[] {
  return new Array(length).fill(0).map((_, index) => samplePages[(index + offset) % samplePages.length]);
}

export const users: User[] = [
  {
    id: "u_reader_01",
    email: "user@example.com",
    handle: "reader_taro",
    displayName: "読者たろう",
    role: "user",
  },
  {
    id: "u_creator_01",
    email: "creator@example.com",
    handle: "sample-creator",
    displayName: "サンプル作者",
    role: "creator",
  },
  {
    id: "u_creator_02",
    email: "creator2@example.com",
    handle: "nagi-manga",
    displayName: "凪まんが",
    role: "creator",
  },
  {
    id: "u_creator_03",
    email: "creator3@example.com",
    handle: "hoshi-panel",
    displayName: "星パネル",
    role: "creator",
  },
  {
    id: "u_admin_01",
    email: "admin@example.com",
    handle: "komado-admin",
    displayName: "運営管理者",
    role: "admin",
  },
];

export const creatorProfiles: CreatorProfile[] = [
  {
    userId: "u_creator_01",
    handle: "sample-creator",
    penName: "サンプル作者",
    bio: "日常の小さな驚きを描く個人漫画制作者。毎週金曜更新。",
    links: ["https://x.com/sample_creator"],
  },
  {
    userId: "u_creator_02",
    handle: "nagi-manga",
    penName: "凪まんが",
    bio: "ゆるい空気感と短編ギャグを中心に制作。",
    links: ["https://x.com/nagi_manga"],
  },
  {
    userId: "u_creator_03",
    handle: "hoshi-panel",
    penName: "星パネル",
    bio: "SF・ミステリーを縦スクロールに最適化して連載中。",
    links: ["https://x.com/hoshi_panel"],
  },
];

export const works: Work[] = [
  {
    id: "w_sample",
    creatorId: "u_creator_01",
    title: "サンプル連載：街角スケッチ",
    slug: "sample-work",
    description: "街で見かけた人々の小さなドラマを描く短編連作。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["日常", "ショート", "モバイル向け"],
    genre: "日常",
    updatedAt: "2026-04-09T00:00:00.000Z",
    publishedAt: "2026-04-01T00:00:00.000Z",
    isCompleted: false,
    ageRating: "all",
    chapterPriceYen: 70,
    bookPriceYen: 580,
    platformFeeRate: 0.12,
    tipEnabled: true,
    weakAdsEnabled: true,
    weeklyGrowthScore: 94,
    readCount: 84210,
    favoriteCount: 4510,
    recommendationSlugs: ["before-dawn-note", "silent-library-case", "metro-phantom"],
  },
  {
    id: "w_dawn",
    creatorId: "u_creator_01",
    title: "夜明け前のノート",
    slug: "before-dawn-note",
    description: "創作に悩む主人公が、毎朝少しずつ前に進むヒューマンドラマ。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["ヒューマンドラマ", "連載"],
    genre: "ヒューマンドラマ",
    updatedAt: "2026-04-08T00:00:00.000Z",
    publishedAt: "2026-03-15T00:00:00.000Z",
    isCompleted: false,
    ageRating: "teen",
    chapterPriceYen: 80,
    bookPriceYen: 640,
    platformFeeRate: 0.11,
    tipEnabled: true,
    weakAdsEnabled: true,
    weeklyGrowthScore: 87,
    readCount: 65400,
    favoriteCount: 3900,
    recommendationSlugs: ["sample-work", "rain-arcade-journey", "silent-library-case"],
  },
  {
    id: "w_noodle",
    creatorId: "u_creator_02",
    title: "深夜ラーメン信号",
    slug: "midnight-noodle-signal",
    description: "ラーメン屋を舞台にした会話劇。1話3分で読める。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["グルメ", "コメディ", "短編"],
    genre: "コメディ",
    updatedAt: "2026-04-09T03:00:00.000Z",
    publishedAt: "2026-03-20T00:00:00.000Z",
    isCompleted: false,
    ageRating: "all",
    chapterPriceYen: 60,
    bookPriceYen: 520,
    platformFeeRate: 0.1,
    tipEnabled: true,
    weakAdsEnabled: true,
    weeklyGrowthScore: 98,
    readCount: 91200,
    favoriteCount: 6200,
    recommendationSlugs: ["sample-work", "game-over-coffee", "monster-office-hour"],
  },
  {
    id: "w_monster",
    creatorId: "u_creator_02",
    title: "モンスター総務課",
    slug: "monster-office-hour",
    description: "異世界企業の総務課で起きるトラブルを描くお仕事ギャグ。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["異世界", "コメディ", "お仕事"],
    genre: "コメディ",
    updatedAt: "2026-04-07T00:00:00.000Z",
    publishedAt: "2026-02-28T00:00:00.000Z",
    isCompleted: false,
    ageRating: "all",
    chapterPriceYen: 65,
    bookPriceYen: 540,
    platformFeeRate: 0.13,
    tipEnabled: true,
    weakAdsEnabled: true,
    weeklyGrowthScore: 82,
    readCount: 50200,
    favoriteCount: 2800,
    recommendationSlugs: ["midnight-noodle-signal", "rain-arcade-journey"],
  },
  {
    id: "w_library",
    creatorId: "u_creator_03",
    title: "沈黙図書館事件録",
    slug: "silent-library-case",
    description: "静かな図書館で起こる不可解な事件を追う青春ミステリー。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["ミステリー", "青春", "連載"],
    genre: "ミステリー",
    updatedAt: "2026-04-06T00:00:00.000Z",
    publishedAt: "2026-03-01T00:00:00.000Z",
    isCompleted: false,
    ageRating: "teen",
    chapterPriceYen: 90,
    bookPriceYen: 680,
    platformFeeRate: 0.12,
    tipEnabled: true,
    weakAdsEnabled: false,
    weeklyGrowthScore: 80,
    readCount: 43110,
    favoriteCount: 3600,
    recommendationSlugs: ["metro-phantom", "before-dawn-note", "sample-work"],
  },
  {
    id: "w_coffee",
    creatorId: "u_creator_02",
    title: "ゲームオーバー喫茶",
    slug: "game-over-coffee",
    description: "ゲーム好きが集う喫茶店の日常を描くほのぼの群像劇。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["日常", "コメディ", "ゲーム"],
    genre: "日常",
    updatedAt: "2026-04-05T00:00:00.000Z",
    publishedAt: "2026-03-18T00:00:00.000Z",
    isCompleted: false,
    ageRating: "all",
    chapterPriceYen: 70,
    bookPriceYen: 560,
    platformFeeRate: 0.11,
    tipEnabled: true,
    weakAdsEnabled: true,
    weeklyGrowthScore: 79,
    readCount: 38990,
    favoriteCount: 2500,
    recommendationSlugs: ["midnight-noodle-signal", "sample-work"],
  },
  {
    id: "w_rain",
    creatorId: "u_creator_03",
    title: "雨宿りアーケード",
    slug: "rain-arcade-journey",
    description: "雨の日だけ現れる商店街で出会う人々のロードムービー。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["ロード", "ヒューマンドラマ"],
    genre: "ヒューマンドラマ",
    updatedAt: "2026-04-04T00:00:00.000Z",
    publishedAt: "2026-02-10T00:00:00.000Z",
    isCompleted: false,
    ageRating: "all",
    chapterPriceYen: 85,
    bookPriceYen: 650,
    platformFeeRate: 0.12,
    tipEnabled: true,
    weakAdsEnabled: false,
    weeklyGrowthScore: 75,
    readCount: 31500,
    favoriteCount: 2100,
    recommendationSlugs: ["before-dawn-note", "monster-office-hour"],
  },
  {
    id: "w_metro",
    creatorId: "u_creator_03",
    title: "メトロファントム",
    slug: "metro-phantom",
    description: "終電後の地下鉄で起こる都市伝説を追うSFミステリー。",
    coverImage: "/brand/logo-square.png",
    status: "published",
    tags: ["SF", "ミステリー", "都市伝説"],
    genre: "SF",
    updatedAt: "2026-04-03T00:00:00.000Z",
    publishedAt: "2026-01-20T00:00:00.000Z",
    isCompleted: false,
    ageRating: "teen",
    chapterPriceYen: 95,
    bookPriceYen: 700,
    platformFeeRate: 0.15,
    tipEnabled: true,
    weakAdsEnabled: false,
    weeklyGrowthScore: 73,
    readCount: 29900,
    favoriteCount: 2600,
    recommendationSlugs: ["silent-library-case", "sample-work", "before-dawn-note"],
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
    pages: pages(8, 0),
    accessModel: "free_full",
    freePageCount: 8,
    chapterPriceYen: 0,
    adPlacement: "banner",
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
    pages: pages(8, 1),
    accessModel: "partial_preview",
    freePageCount: 3,
    chapterPriceYen: 70,
    adPlacement: "rewarded_preview",
  },
  {
    id: "c_sample_3",
    workId: "w_sample",
    chapterNumber: 3,
    title: "第3話 雨あがりの横断歩道",
    slug: "chapter-3",
    summary: "すれ違った二人が少しだけ近づく。",
    status: "published",
    publishedAt: "2026-04-09T00:00:00.000Z",
    pages: pages(10, 2),
    accessModel: "paid",
    freePageCount: 2,
    chapterPriceYen: 70,
    adPlacement: "none",
  },
  {
    id: "c_dawn_1",
    workId: "w_dawn",
    chapterNumber: 1,
    title: "第1話 4時42分",
    slug: "chapter-1",
    summary: "まだ暗い部屋でペンを握る。",
    status: "published",
    publishedAt: "2026-03-15T00:00:00.000Z",
    pages: pages(9, 0),
    accessModel: "free_full",
    freePageCount: 9,
    chapterPriceYen: 0,
    adPlacement: "banner",
  },
  {
    id: "c_dawn_2",
    workId: "w_dawn",
    chapterNumber: 2,
    title: "第2話 眠れない机",
    slug: "chapter-2",
    summary: "締切前夜、主人公の選択。",
    status: "published",
    publishedAt: "2026-03-24T00:00:00.000Z",
    pages: pages(9, 1),
    accessModel: "partial_preview",
    freePageCount: 3,
    chapterPriceYen: 80,
    adPlacement: "rewarded_preview",
  },
  {
    id: "c_dawn_3",
    workId: "w_dawn",
    chapterNumber: 3,
    title: "第3話 朝焼けのあと",
    slug: "chapter-3",
    summary: "最初の掲載が決まる。",
    status: "published",
    publishedAt: "2026-04-08T00:00:00.000Z",
    pages: pages(10, 2),
    accessModel: "paid",
    freePageCount: 2,
    chapterPriceYen: 80,
    adPlacement: "none",
  },
  ...[
    "w_noodle",
    "w_monster",
    "w_library",
    "w_coffee",
    "w_rain",
    "w_metro",
  ].flatMap((workId, index) => {
    const chapterPrice = works.find((work) => work.id === workId)?.chapterPriceYen ?? 80;
    return [
      {
        id: `${workId}_c1`,
        workId,
        chapterNumber: 1,
        title: "第1話 はじまり",
        slug: "chapter-1",
        summary: "導入エピソード。",
        status: "published" as const,
        publishedAt: `2026-03-${String(10 + index).padStart(2, "0")}T00:00:00.000Z`,
        pages: pages(8, index),
        accessModel: "free_full" as const,
        freePageCount: 8,
        chapterPriceYen: 0,
        adPlacement: "banner" as const,
      },
      {
        id: `${workId}_c2`,
        workId,
        chapterNumber: 2,
        title: "第2話 つづき",
        slug: "chapter-2",
        summary: "一部無料で続きが気になる構成。",
        status: "published" as const,
        publishedAt: `2026-03-${String(17 + index).padStart(2, "0")}T00:00:00.000Z`,
        pages: pages(9, index + 1),
        accessModel: "partial_preview" as const,
        freePageCount: 3,
        chapterPriceYen: chapterPrice,
        adPlacement: "rewarded_preview" as const,
      },
      {
        id: `${workId}_c3`,
        workId,
        chapterNumber: 3,
        title: "第3話 深掘り",
        slug: "chapter-3",
        summary: "買い切りで読める本編。",
        status: "published" as const,
        publishedAt: `2026-04-${String(1 + index).padStart(2, "0")}T00:00:00.000Z`,
        pages: pages(10, index + 2),
        accessModel: "paid" as const,
        freePageCount: 2,
        chapterPriceYen: chapterPrice,
        adPlacement: "none" as const,
      },
    ];
  }),
];

export const reports: Report[] = [
  {
    id: "r_001",
    reporterId: "u_reader_01",
    targetType: "chapter",
    targetId: "c_sample_1",
    reason: "権利侵害の懸念",
    note: "他作品との構図類似が気になりました。",
    status: "open",
    createdAt: "2026-04-08T12:00:00.000Z",
  },
  {
    id: "r_002",
    reporterId: "u_reader_01",
    targetType: "work",
    targetId: "w_monster",
    reason: "年齢レーティングの見直し希望",
    note: "一部描写が想定より刺激的でした。",
    status: "in_review",
    createdAt: "2026-04-07T10:00:00.000Z",
  },
];

export function getPublishedWorks(): Work[] {
  return works
    .filter((work) => work.status === "published")
    .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
}

export function getNewWorks(limit = 6): Work[] {
  return [...getPublishedWorks()]
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
    .slice(0, limit);
}

export function getWeeklyTrendingWorks(limit = 6): Work[] {
  return [...getPublishedWorks()]
    .sort((a, b) => b.weeklyGrowthScore - a.weeklyGrowthScore)
    .slice(0, limit);
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

export function getCreatorProfileByUserId(userId: string): CreatorProfile | undefined {
  return creatorProfiles.find((creator) => creator.userId === userId);
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

export function getRecommendedByGenre(workSlug: string, limit = 4): Work[] {
  const work = getWorkBySlug(workSlug);
  if (!work) {
    return [];
  }

  return getPublishedWorks()
    .filter((candidate) => candidate.slug !== work.slug)
    .filter((candidate) => candidate.genre === work.genre || candidate.tags.some((tag) => work.tags.includes(tag)))
    .sort((a, b) => b.weeklyGrowthScore - a.weeklyGrowthScore)
    .slice(0, limit);
}

export function getReadersAlsoLike(workSlug: string, limit = 4): Work[] {
  const work = getWorkBySlug(workSlug);
  if (!work) {
    return [];
  }

  const recommended = work.recommendationSlugs
    .map((slug) => getWorkBySlug(slug))
    .filter((item): item is Work => Boolean(item));

  if (recommended.length >= limit) {
    return recommended.slice(0, limit);
  }

  const fallback = getPublishedWorks().filter(
    (candidate) =>
      candidate.slug !== work.slug && !recommended.some((selected) => selected.slug === candidate.slug),
  );

  return [...recommended, ...fallback].slice(0, limit);
}

export function resolveCreatorIdForSession(sessionEmail?: string): string {
  if (sessionEmail) {
    const matched = users.find(
      (user) => user.email === sessionEmail && (user.role === "creator" || user.role === "admin"),
    );
    if (matched) {
      return matched.id;
    }
  }

  return creatorProfiles[0]?.userId ?? "u_creator_01";
}

export function resolveChapterAccess(
  chapter: Chapter,
  viewer: { role: Role; isLoggedIn: boolean },
): ChapterAccessState {
  const privileged = viewer.role === "creator" || viewer.role === "admin" || viewer.role === "moderator";

  if (chapter.accessModel === "free_full" || privileged) {
    return {
      canReadFull: true,
      visiblePages: chapter.pages,
      requiresPurchase: false,
      showWeakAds: chapter.adPlacement !== "none" && chapter.accessModel === "free_full",
    };
  }

  const previewPages = chapter.pages.slice(0, Math.max(1, chapter.freePageCount));

  return {
    canReadFull: false,
    visiblePages: previewPages,
    requiresPurchase: true,
    showWeakAds: chapter.adPlacement !== "none",
    lockedMessage: viewer.isLoggedIn
      ? `続きは ${chapter.chapterPriceYen}円で読めます。`
      : "会員登録で購入・履歴保存・続きから再開が利用できます。",
  };
}

export function getCreatorWorksWithMetrics(creatorId: string) {
  return getWorksByCreator(creatorId).map((work) => {
    const workChapters = getChaptersByWork(work.id);
    const paidChapters = workChapters.filter((chapter) => chapter.accessModel === "paid").length;

    return {
      work,
      chapterCount: workChapters.length,
      paidChapterCount: paidChapters,
      estimatedSalesYen: Math.round((work.readCount * 0.025 + paidChapters * 120) * work.chapterPriceYen),
    };
  });
}

export function getCreatorRevenueSummary(creatorId: string) {
  const creatorWorks = getWorksByCreator(creatorId);
  const chapterSales = creatorWorks.reduce((sum, work) => sum + Math.round(work.readCount * 0.08 * work.chapterPriceYen), 0);
  const bookSales = creatorWorks.reduce((sum, work) => sum + Math.round(work.readCount * 0.02 * work.bookPriceYen), 0);
  const tips = creatorWorks.reduce((sum, work) => sum + Math.round(work.favoriteCount * 12), 0);
  const adRevenue = creatorWorks.reduce(
    (sum, work) => sum + (work.weakAdsEnabled ? Math.round(work.readCount * 0.25) : 0),
    0,
  );

  const feeRate = creatorWorks[0]?.platformFeeRate ?? 0.12;
  const gross = chapterSales + bookSales + tips + adRevenue;
  const platformFee = Math.round((chapterSales + bookSales) * feeRate);

  return {
    chapterSales,
    bookSales,
    tips,
    adRevenue,
    gross,
    platformFee,
    payout: gross - platformFee,
    feeRate,
  };
}

export function getCreatorCommentQueue(creatorId: string) {
  const creatorWorkIds = new Set(getWorksByCreator(creatorId).map((work) => work.id));
  const relatedChapters = chapters.filter((chapter) => creatorWorkIds.has(chapter.workId));

  return relatedChapters.slice(0, 6).map((chapter, index) => ({
    id: `comment-${chapter.id}-${index}`,
    workTitle: getWorkById(chapter.workId)?.title ?? "不明な作品",
    chapterTitle: chapter.title,
    authorName: ["読者A", "読者B", "読者C"][index % 3],
    body: [
      "続きが気になります！",
      "演出がすごく良かったです。",
      "このキャラの背景がもっと知りたい。",
    ][index % 3],
    status: ["未対応", "要返信", "保留"][index % 3],
    createdAt: `2026-04-${String(9 - index).padStart(2, "0")}T09:00:00.000Z`,
  }));
}

export function getCreatorAnalytics(creatorId: string) {
  const creatorWorks = getWorksByCreator(creatorId);
  const totalReads = creatorWorks.reduce((sum, work) => sum + work.readCount, 0);
  const totalFavorites = creatorWorks.reduce((sum, work) => sum + work.favoriteCount, 0);

  return {
    totalReads,
    totalFavorites,
    averageCompletionRate: 62,
    followerGrowthThisWeek: 123,
    sections: {
      newest: getNewWorks(4),
      trending: getWeeklyTrendingWorks(4),
    },
  };
}

export function getSampleAuditLogs(): Array<{ action: string; target: string; at: string }> {
  return [
    {
      action: "work_hidden",
      target: "w_monster",
      at: "2026-04-08T09:00:00.000Z",
    },
    {
      action: "report_status_changed",
      target: "r_001",
      at: "2026-04-08T12:30:00.000Z",
    },
  ];
}
