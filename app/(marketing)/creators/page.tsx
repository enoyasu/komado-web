import Link from "next/link";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "漫画家の方へ",
  path: "/creators",
  description:
    "個人漫画家が作品を公開し、読者とつながり、販売や応援につなげられる投稿者向けページです。",
});

const steps = [
  {
    title: "1. アカウント作成",
    body: "共通アカウントで登録し、初回オンボーディングで投稿者モードを選択します。",
  },
  {
    title: "2. 作品情報を登録",
    body: "カバー・説明・章を登録して、無料公開範囲や価格を設定します。",
  },
  {
    title: "3. 公開 / 販売開始",
    body: "公開後は売上・コメント・分析を見ながら、更新を続けられます。",
  },
];

export default function CreatorsPage() {
  return (
    <div className="main-container space-y-8 py-10">
      <section className="card hero-panel space-y-4 p-8">
        <p className="pill">Creator</p>
        <h1 className="text-3xl font-bold">あなたの漫画を、ちゃんと読者に届ける。</h1>
        <p className="hero-description max-w-3xl text-base leading-relaxed">
          個人でも公開から販売まで始められる投稿環境。応援や買い切り導線で、作品の継続につながる収益基盤を作れます。
        </p>
        <div className="flex flex-wrap gap-3">
          <TrackedLink
            href="/signup?intent=creator"
            className="primary-btn bg-white text-blue-900"
            eventName={ANALYTICS_EVENTS.creatorsSignupClick}
            eventPayload={{ cta: "hero_signup" }}
          >
            無料で投稿を始める
          </TrackedLink>
          <Link href="#creator-steps" className="secondary-btn border-white bg-white/15 text-white">
            掲載の流れを見る
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="card p-5">
          <h2 className="text-lg font-semibold">個人でも公開できる</h2>
          <p className="mt-2 text-sm text-slate-700">アカウント作成後すぐに作品登録と公開準備を始められます。</p>
        </article>
        <article className="card p-5">
          <h2 className="text-lg font-semibold">読者と直接つながれる</h2>
          <p className="mt-2 text-sm text-slate-700">フォロー・シェア・応援の導線で、反応を受け取りながら連載できます。</p>
        </article>
        <article className="card p-5">
          <h2 className="text-lg font-semibold">販売と応援導線を持てる</h2>
          <p className="mt-2 text-sm text-slate-700">1話/1冊買い切りに加え、投げ銭と無料話向け広告を活用できます。</p>
        </article>
      </section>

      <section id="creator-steps" className="card space-y-4 p-6">
        <h2 className="section-title">投稿ステップ</h2>
        <ol className="space-y-2">
          {steps.map((step) => (
            <li key={step.title} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold">{step.title}</p>
              <p className="mt-1 text-sm text-slate-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="card flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">共通アカウントで、あとから役割を切替</h2>
          <p className="mt-1 text-sm text-slate-700">
            creator意図で始めても、設定画面から読者モードとの往復ができます。
          </p>
        </div>
        <TrackedLink
          href="/signup?intent=creator"
          className="primary-btn"
          eventName={ANALYTICS_EVENTS.creatorsSignupClick}
          eventPayload={{ cta: "bottom_signup" }}
        >
          投稿者として登録する
        </TrackedLink>
      </section>
    </div>
  );
}
