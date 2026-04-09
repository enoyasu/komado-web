import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReportForm } from "@/components/forms/report-form";
import { WorkCard } from "@/components/work/work-card";
import { buildMetadata } from "@/lib/metadata";
import {
  getChapterBySlug,
  getChaptersByWork,
  getCreatorProfileByUserId,
  getReadersAlsoLike,
  getRecommendedByGenre,
  getWorkBySlug,
} from "@/lib/mock-data";

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

function chapterAccessLabel(workId: string, chapterSlug: string) {
  const chapter = getChapterBySlug(workId, chapterSlug);
  if (!chapter) {
    return "公開中";
  }

  if (chapter.accessModel === "free_full") {
    return "1話まるごと無料";
  }

  if (chapter.accessModel === "partial_preview") {
    return `一部無料（${chapter.freePageCount}ページ）`;
  }

  return `${chapter.chapterPriceYen.toLocaleString("ja-JP")}円`;
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) {
    notFound();
  }

  const chapters = getChaptersByWork(work.id);
  const firstChapter = chapters[0];
  const creator = getCreatorProfileByUserId(work.creatorId);
  const sameGenre = getRecommendedByGenre(work.slug, 4);
  const readersAlsoLike = getReadersAlsoLike(work.slug, 4);

  return (
    <div className="space-y-10 py-8">
      <div className="main-container grid gap-6 lg:grid-cols-[2fr_1fr]">
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
              <p className="text-sm text-slate-700">{work.description}</p>
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
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
                <p className="font-semibold">収益モデル</p>
                <p className="mt-1">
                  1話買い切り {work.chapterPriceYen}円 / 1冊買い切り {work.bookPriceYen}円。手数料は
                  {Math.round(work.platformFeeRate * 100)}%。
                </p>
                <p className="mt-1">応援: {work.tipEnabled ? "投げ銭あり" : "なし"} / 弱い広告: {work.weakAdsEnabled ? "無料話のみ表示" : "表示なし"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {firstChapter ? (
                  <Link href={`/works/${work.slug}/chapters/${firstChapter.slug}`} className="primary-btn">
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
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={`/works/${work.slug}/chapters/${chapter.slug}`}
                      className="font-semibold hover:underline"
                    >
                      第{chapter.chapterNumber}話 {chapter.title}
                    </Link>
                    <span className="pill">{chapterAccessLabel(work.id, chapter.slug)}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{chapter.summary}</p>
                </li>
              ))}
            </ol>
          </section>
        </section>

        <aside className="space-y-4">
          <ReportForm targetLabel={work.title} />
          <div className="card p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">読了後導線</p>
            <p className="mt-2">
              話を読み終えたあとに、フォロー・シェア・投げ銭へ進める導線を配置しています。
            </p>
            {creator ? (
              <Link
                href={`/creators/${creator.handle}`}
                className="mt-3 inline-flex text-blue-700 hover:underline"
              >
                作者ページを見る
              </Link>
            ) : null}
          </div>
        </aside>
      </div>

      <section className="main-container space-y-3">
        <h2 className="section-title">同ジャンルおすすめ</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sameGenre.map((item) => (
            <WorkCard key={item.id} work={item} />
          ))}
        </div>
      </section>

      <section className="main-container space-y-3">
        <h2 className="section-title">この作品を読んだ人向け</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {readersAlsoLike.map((item) => (
            <WorkCard key={item.id} work={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
