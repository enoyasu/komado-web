import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/reader/chapter-reader";
import { buildMetadata } from "@/lib/metadata";
import { getChapterBySlug, getChaptersByWork, getWorkBySlug } from "@/lib/mock-data";

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

  const allChapters = getChaptersByWork(work.id);
  const currentIndex = allChapters.findIndex((item) => item.id === chapter.id);
  const nextChapter = currentIndex >= 0 ? allChapters[currentIndex + 1] : undefined;

  return (
    <div className="main-container space-y-4 py-8">
      <div className="card flex items-center justify-between p-4 text-sm">
        <Link href={`/works/${work.slug}`} className="font-semibold text-blue-700 hover:underline">
          ← 作品ページへ戻る
        </Link>
        <span>{work.title}</span>
      </div>
      <ChapterReader
        workSlug={work.slug}
        chapterSlug={chapter.slug}
        chapterTitle={chapter.title}
        pageImages={chapter.pages}
        nextChapterPath={nextChapter ? `/works/${work.slug}/chapters/${nextChapter.slug}` : undefined}
      />
    </div>
  );
}
