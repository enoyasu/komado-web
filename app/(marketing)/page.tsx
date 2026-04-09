import { WorkCard } from "@/components/work/work-card";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { buildMetadata } from "@/lib/metadata";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getNewWorks } from "@/lib/mock-data";

export const metadata = buildMetadata({
  title: "komadoへようこそ",
  description: "読む人も投稿する人も、同じアカウントでつながるWeb漫画プラットフォーム",
  path: "/",
});

export default function HomePage() {
  const newest = getNewWorks(6);

  return (
    <div className="space-y-12 py-8">
      <section className="main-container card hero-panel overflow-hidden p-8">
        <p className="mb-2 text-sm font-semibold tracking-wide">komadoへようこそ</p>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">個人漫画家と読者が、作品を通じてつながる場所。</h1>
        <p className="hero-description max-w-3xl text-base leading-relaxed">
          試し読みから気軽に読み始めて、気に入ったら応援や購入で作者を後押し。投稿したい人は作品公開から販売まで一つのアカウントで始められます。
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <TrackedLink
            href="/readers"
            className="primary-btn w-full justify-center bg-white py-3 text-center text-base text-blue-900"
            eventName={ANALYTICS_EVENTS.topReaderCtaClick}
            eventPayload={{ location: "top" }}
          >
            漫画を読む
          </TrackedLink>
          <TrackedLink
            href="/creators"
            className="secondary-btn w-full justify-center border-white bg-white/15 py-3 text-center text-base text-white"
            eventName={ANALYTICS_EVENTS.topCreatorCtaClick}
            eventPayload={{ location: "top" }}
          >
            作品を投稿する
          </TrackedLink>
        </div>
      </section>

      <section className="main-container grid gap-4 md:grid-cols-2">
        <article className="card space-y-2 p-5">
          <p className="pill">読者の方へ</p>
          <h2 className="text-xl font-bold">まずは無料で試し読み</h2>
          <p className="text-sm text-slate-700">
            会員登録なしで公開作品を読めます。続きは共通アカウントで、履歴保存や応援もすぐに始められます。
          </p>
          <TrackedLink
            href="/readers"
            className="secondary-btn w-fit"
            eventName={ANALYTICS_EVENTS.topReaderCtaClick}
            eventPayload={{ location: "summary" }}
          >
            読者向けページへ
          </TrackedLink>
        </article>

        <article className="card space-y-2 p-5">
          <p className="pill">漫画家の方へ</p>
          <h2 className="text-xl font-bold">公開と収益化をシンプルに</h2>
          <p className="text-sm text-slate-700">
            作品管理・売上・分析をまとめて運用。あとから役割を切り替えて、読者としても投稿者としても使えます。
          </p>
          <TrackedLink
            href="/creators"
            className="secondary-btn w-fit"
            eventName={ANALYTICS_EVENTS.topCreatorCtaClick}
            eventPayload={{ location: "summary" }}
          >
            漫画家向けページへ
          </TrackedLink>
        </article>
      </section>

      <section className="main-container space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">新着作品</h2>
          <TrackedLink
            href="/works"
            className="text-sm font-semibold text-blue-700 hover:underline"
            eventName={ANALYTICS_EVENTS.viewHome}
            eventPayload={{ action: "open_works" }}
          >
            もっと見る
          </TrackedLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newest.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>
    </div>
  );
}
