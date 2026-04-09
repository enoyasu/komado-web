import { WorkCard } from "@/components/work/work-card";
import { buildMetadata } from "@/lib/metadata";
import { getCreatorAnalytics, resolveCreatorIdForSession } from "@/lib/mock-data";
import { getCurrentSessionUser } from "@/server/auth/current-user";

export const metadata = buildMetadata({ title: "分析", path: "/dashboard/analytics" });

export default async function DashboardAnalyticsPage() {
  const user = await getCurrentSessionUser();
  const creatorId = resolveCreatorIdForSession(user?.email);
  const analytics = getCreatorAnalytics(creatorId);

  return (
    <div className="main-container space-y-6 py-8">
      <section className="card p-5">
        <h1 className="section-title">分析</h1>
        <p className="mt-2 text-sm text-slate-700">
          閲覧推移と読了率の変化を見て、次話の導線改善に活かせます。
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="card p-4">
          <p className="text-xs text-slate-600">総閲覧数</p>
          <p className="mt-1 text-2xl font-bold">{analytics.totalReads.toLocaleString("ja-JP")}</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">お気に入り総数</p>
          <p className="mt-1 text-2xl font-bold">{analytics.totalFavorites.toLocaleString("ja-JP")}</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">平均読了率</p>
          <p className="mt-1 text-2xl font-bold">{analytics.averageCompletionRate}%</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">今週フォロー増</p>
          <p className="mt-1 text-2xl font-bold">+{analytics.followerGrowthThisWeek}</p>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="section-title">新着作品トレンド</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analytics.sections.newest.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="section-title">今週伸びてる市場</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {analytics.sections.trending.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>
    </div>
  );
}
