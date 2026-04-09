import Link from "next/link";
import { WorkCard } from "@/components/work/work-card";
import { buildMetadata } from "@/lib/metadata";
import { getNewWorks, getPublishedWorks, getWeeklyTrendingWorks } from "@/lib/mock-data";

export const metadata = buildMetadata({
  title: "ホーム",
  description: "公開漫画の新着・今週伸びてる作品・おすすめから見つける",
  path: "/",
});

export default function HomePage() {
  const works = getPublishedWorks();
  const newest = getNewWorks(6);
  const trending = getWeeklyTrendingWorks(6);

  return (
    <div className="space-y-12 py-8">
      <section className="main-container card hero-panel overflow-hidden p-8">
        <p className="mb-2 text-sm font-semibold tracking-wide">公開Web漫画プラットフォーム</p>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">読者も漫画家も、同じアカウントで始められる。</h1>
        <p className="hero-description max-w-3xl text-base leading-relaxed">
          会員登録なしで1話無料試し読み。続きは1話買い切り / 1冊買い切りでシンプルに読めます。登録後はオンボーディングで「読む」「投稿する」を選択し、あとから役割を切り替えられます。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/works" className="primary-btn bg-white text-blue-900">
            作品を探す
          </Link>
          <Link href="/lp/reader" className="secondary-btn border-white bg-white/15 text-white">
            読者向けLP
          </Link>
          <Link href="/lp/creator" className="secondary-btn border-white bg-white/15 text-white">
            漫画家向けLP
          </Link>
        </div>
      </section>

      <section className="main-container space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">新着</h2>
          <Link href="/works" className="text-sm font-semibold text-blue-700 hover:underline">
            もっと見る
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newest.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      <section className="main-container space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">今週伸びてる</h2>
          <p className="text-sm text-slate-600">閲覧増加率で算出</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      <section className="main-container space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">編集部ピックアップ</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.slice(0, 3).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>
    </div>
  );
}
