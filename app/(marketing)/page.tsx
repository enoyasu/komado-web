import Link from "next/link";
import { WorkCard } from "@/components/work/work-card";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedWorks } from "@/lib/mock-data";

export const metadata = buildMetadata({
  title: "ホーム",
  description: "公開漫画の新着と人気タグから作品を見つける",
  path: "/",
});

export default function HomePage() {
  const works = getPublishedWorks();

  return (
    <div className="space-y-12 py-8">
      <section className="main-container card overflow-hidden border-none bg-gradient-to-r from-sky-900 to-blue-800 p-8 text-white">
        <p className="mb-2 text-sm opacity-90">公開Web漫画プラットフォーム</p>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">スマホで読みやすく、作者が投稿しやすい。</h1>
        <p className="max-w-2xl text-sm text-blue-100 md:text-base">
          komadoは、iPhone / Android / PC ブラウザで読める個人漫画の公開サイトです。検索・SNS・共有リンクから読者が流入し、ログインなしでも作品を読めます。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/works" className="primary-btn bg-white text-blue-900">
            作品を探す
          </Link>
          <Link href="/dashboard/works/new" className="secondary-btn border-white bg-transparent text-white">
            作品を投稿する
          </Link>
        </div>
      </section>

      <section className="main-container space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">新着作品</h2>
          <Link href="/works" className="text-sm font-semibold text-blue-700 hover:underline">
            もっと見る
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>
    </div>
  );
}
