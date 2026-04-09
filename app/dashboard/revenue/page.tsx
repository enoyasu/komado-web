import { buildMetadata } from "@/lib/metadata";
import { getCreatorRevenueSummary, resolveCreatorIdForSession } from "@/lib/mock-data";
import { getCurrentSessionUser } from "@/server/auth/current-user";

export const metadata = buildMetadata({ title: "売上", path: "/dashboard/revenue" });

export default async function DashboardRevenuePage() {
  const user = await getCurrentSessionUser();
  const creatorId = resolveCreatorIdForSession(user?.email);
  const summary = getCreatorRevenueSummary(creatorId);

  return (
    <div className="main-container space-y-6 py-8">
      <section className="card p-5">
        <h1 className="section-title">売上</h1>
        <p className="mt-2 text-sm text-slate-700">
          課金は1話買い切り / 1冊買い切り。プラットフォーム手数料は{Math.round(summary.feeRate * 100)}%です。
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="card p-4">
          <p className="text-xs text-slate-600">1話買い切り売上</p>
          <p className="mt-1 text-2xl font-bold">{summary.chapterSales.toLocaleString("ja-JP")}円</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">1冊買い切り売上</p>
          <p className="mt-1 text-2xl font-bold">{summary.bookSales.toLocaleString("ja-JP")}円</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">投げ銭 / 応援</p>
          <p className="mt-1 text-2xl font-bold">{summary.tips.toLocaleString("ja-JP")}円</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">無料話の弱い広告</p>
          <p className="mt-1 text-2xl font-bold">{summary.adRevenue.toLocaleString("ja-JP")}円</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">手数料</p>
          <p className="mt-1 text-2xl font-bold text-rose-700">-{summary.platformFee.toLocaleString("ja-JP")}円</p>
        </article>
        <article className="card p-4">
          <p className="text-xs text-slate-600">受取予定</p>
          <p className="mt-1 text-2xl font-bold text-blue-800">{summary.payout.toLocaleString("ja-JP")}円</p>
        </article>
      </section>
    </div>
  );
}
