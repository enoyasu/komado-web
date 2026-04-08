import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReportForm } from "@/components/forms/report-form";
import { buildMetadata } from "@/lib/metadata";
import { getChaptersByWork, getWorkBySlug } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    return buildMetadata({ title: "作品が見つかりません", path: `/works/${slug}` });
  }
  return buildMetadata({
    title: work.title,
    description: work.description,
    path: `/works/${work.slug}`,
    imagePath: work.coverImage,
  });
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    notFound();
  }

  const chapters = getChaptersByWork(work.id);
  const firstChapter = chapters[0];

  return (
    <div className="main-container grid gap-6 py-8 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-5">
        <div className="card overflow-hidden p-4 sm:flex sm:gap-4">
          <Image
            src={work.coverImage}
            alt={`${work.title} カバー`}
            width={500}
            height={500}
            className="mx-auto aspect-square w-full max-w-[220px] rounded-xl object-cover"
          />
          <div className="mt-4 space-y-3 sm:mt-0">
            <h1 className="text-2xl font-bold">{work.title}</h1>
            <p className="text-sm text-slate-600">{work.description}</p>
            <p className="text-xs text-slate-500">
              更新日: {new Date(work.updatedAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
            </p>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="pill">
                  {tag}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {firstChapter ? (
                <Link
                  href={`/works/${work.slug}/chapters/${firstChapter.slug}`}
                  className="primary-btn"
                >
                  第1話を読む
                </Link>
              ) : null}
              <button className="secondary-btn" type="button">
                フォロー
              </button>
              <button className="secondary-btn" type="button">
                ブックマーク
              </button>
              <button className="secondary-btn" type="button">
                共有
              </button>
            </div>
          </div>
        </div>

        <section className="card p-5">
          <h2 className="mb-3 text-xl font-semibold">章一覧</h2>
          <ol className="space-y-2">
            {chapters.map((chapter) => (
              <li key={chapter.id} className="rounded-lg border border-slate-200 p-3">
                <Link
                  href={`/works/${work.slug}/chapters/${chapter.slug}`}
                  className="font-semibold hover:underline"
                >
                  第{chapter.chapterNumber}話 {chapter.title}
                </Link>
                <p className="mt-1 text-sm text-slate-600">{chapter.summary}</p>
              </li>
            ))}
          </ol>
        </section>
      </section>

      <aside className="space-y-4">
        <ReportForm targetLabel={work.title} />
        <div className="card p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">直接章URL流入に対応</p>
          <p className="mt-2">
            章ページから来た読者にも離脱させないよう、作品詳細では「第1話」「最新話」「作者ページ」へすぐ遷移できます。
          </p>
          <Link href="/creators/sample-creator" className="mt-3 inline-flex text-blue-700 hover:underline">
            作者ページを見る
          </Link>
        </div>
      </aside>
    </div>
  );
}
