import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/reader/chapter-reader";
import { buildMetadata } from "@/lib/metadata";
import { getChapterBySlug, getChaptersByWork, getWorkBySlug, resolveChapterAccess } from "@/lib/mock-data";
import { getCurrentSessionUser } from "@/server/auth/current-user";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    return buildMetadata({ title: "章が見つかりません", path: `/works/${slug}/chapters/${chapterSlug}` });
  }

  const chapter = getChapterBySlug(work.id, chapterSlug);
  if (!chapter) {
    return buildMetadata({ title: `${work.title} の章`, path: `/works/${slug}/chapters/${chapterSlug}` });
  }

  return buildMetadata({
    title: `${work.title} ${chapter.title}`,
    description: chapter.summary,
    path: `/works/${work.slug}/chapters/${chapter.slug}`,
    imagePath: work.coverImage,
  });
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapterSlug: string }>;
}) {
  const { slug, chapterSlug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    notFound();
  }

  const chapter = getChapterBySlug(work.id, chapterSlug);
  if (!chapter) {
    notFound();
  }

  const sessionUser = await getCurrentSessionUser();
  const access = resolveChapterAccess(chapter, {
    role: sessionUser?.role ?? "guest",
    isLoggedIn: Boolean(sessionUser),
  });

  const allChapters = getChaptersByWork(work.id);
  const currentIndex = allChapters.findIndex((item) => item.id === chapter.id);
  const nextChapter = currentIndex >= 0 ? allChapters[currentIndex + 1] : undefined;

  return (
    <div className="main-container space-y-4 py-8">
      <div className="card flex flex-col gap-3 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/works/${work.slug}`} className="font-semibold text-blue-700 hover:underline">
          ← 作品ページへ戻る
        </Link>
        <span>{work.title}</span>
      </div>

      <ChapterReader
        workSlug={work.slug}
        chapterSlug={chapter.slug}
        chapterTitle={chapter.title}
        pageImages={access.visiblePages}
        nextChapterPath={nextChapter ? `/works/${work.slug}/chapters/${nextChapter.slug}` : undefined}
        isPreview={!access.canReadFull}
        lockedMessage={access.lockedMessage}
      />

      <section className="card space-y-3 p-4 text-sm text-slate-700">
        <h2 className="text-base font-semibold text-slate-900">この話の公開条件</h2>
        {chapter.accessModel === "free_full" ? <p>この話は最後まで無料で読めます。</p> : null}
        {chapter.accessModel === "partial_preview" ? (
          <p>
            2〜3話目は一部無料です。無料範囲は{chapter.freePageCount}ページ、続きは{chapter.chapterPriceYen}円で読めます。
          </p>
        ) : null}
        {chapter.accessModel === "paid" ? (
          <p>
            この話は買い切りです。価格は{chapter.chapterPriceYen}円で、購入後は履歴から再開できます。
          </p>
        ) : null}

        {access.showWeakAds ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900">
            無料話には弱い広告を1枠のみ表示しています。広告視聴で追加ページを開放する運用にも対応可能です。
          </div>
        ) : null}

        {!access.canReadFull ? (
          <div className="flex flex-wrap gap-2">
            <Link href="/signup?intent=reader" className="primary-btn">
              共通アカウントで続きを読む
            </Link>
            <button type="button" className="secondary-btn">
              この話を購入する（{chapter.chapterPriceYen}円）
            </button>
            <button type="button" className="secondary-btn">
              作者に投げ銭する
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
