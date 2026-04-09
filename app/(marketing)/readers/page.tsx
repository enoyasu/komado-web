import { TrackedLink } from "@/components/analytics/tracked-link";
import { WorkCard } from "@/components/work/work-card";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";
import { getNewWorks } from "@/lib/mock-data";

export const metadata = buildMetadata({
  title: "読者の方へ",
  path: "/readers",
  description:
    "試し読みから作品発見、応援まで。個人漫画家の作品を気軽に楽しめる読者向けページです。",
});

export default function ReadersPage() {
  const newest = getNewWorks(3);

  return (
    <div className="main-container space-y-8 py-10">
      <section className="card hero-panel space-y-4 p-8">
        <p className="pill">Reader</p>
        <h1 className="text-3xl font-bold">好きな漫画に、きっと出会える。</h1>
        <p className="hero-description max-w-3xl text-base leading-relaxed">
          会員登録なしで試し読み。作品を見つけて、続きが気になったら購入や応援で作者を後押しできます。
        </p>
        <div className="flex flex-wrap gap-3">
          <TrackedLink
            href="/signup?intent=reader"
            className="primary-btn bg-white text-blue-900"
            eventName={ANALYTICS_EVENTS.readersSignupClick}
            eventPayload={{ cta: "hero_signup" }}
          >
            無料で読み始める
          </TrackedLink>
          <TrackedLink
            href="/works"
            className="secondary-btn border-white bg-white/15 text-white"
            eventName={ANALYTICS_EVENTS.viewHome}
            eventPayload={{ cta: "hero_works" }}
          >
            作品を見る
          </TrackedLink>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card p-5">
          <h2 className="text-lg font-semibold">個人漫画家の作品に出会える</h2>
          <p className="mt-2 text-sm text-slate-700">新着や話題作から、好きなテイストの作品を探せます。</p>
        </article>
        <article className="card p-5">
          <h2 className="text-lg font-semibold">試し読みしやすい</h2>
          <p className="mt-2 text-sm text-slate-700">会員登録不要で無料話にすぐアクセス。気になった作品を気軽にチェックできます。</p>
        </article>
        <article className="card p-5">
          <h2 className="text-lg font-semibold">気に入ったら応援できる</h2>
          <p className="mt-2 text-sm text-slate-700">買い切り購入や投げ銭で、作者の活動を直接サポートできます。</p>
        </article>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="section-title">新着作品</h2>
          <TrackedLink
            href="/works"
            className="text-sm font-semibold text-blue-700 hover:underline"
            eventName={ANALYTICS_EVENTS.viewHome}
            eventPayload={{ cta: "newest_more" }}
          >
            一覧を見る
          </TrackedLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newest.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      <section className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">共通アカウントで、読む体験を続ける</h2>
          <p className="mt-1 text-sm text-slate-700">
            登録時にreader意図を保持しつつ、後から投稿者機能にも切り替えられます。
          </p>
        </div>
        <TrackedLink
          href="/signup?intent=reader"
          className="primary-btn"
          eventName={ANALYTICS_EVENTS.readersSignupClick}
          eventPayload={{ cta: "bottom_signup" }}
        >
          読者として登録する
        </TrackedLink>
      </section>
    </div>
  );
}
