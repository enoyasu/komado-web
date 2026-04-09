import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { getCreatorWorksWithMetrics, resolveCreatorIdForSession } from "@/lib/mock-data";
import { getCurrentSessionUser } from "@/server/auth/current-user";

export const metadata = buildMetadata({ title: "作者作品管理", path: "/dashboard/works" });

export default async function DashboardWorksPage() {
  const user = await getCurrentSessionUser();
  const creatorId = resolveCreatorIdForSession(user?.email);
  const creatorWorks = getCreatorWorksWithMetrics(creatorId);

  return (
    <div className="main-container space-y-5 py-8">
      <div className="flex items-center justify-between">
        <h1 className="section-title">作品管理</h1>
        <Link href="/dashboard/works/new" className="primary-btn">
          新規作成
        </Link>
      </div>
      <div className="card divide-y">
        {creatorWorks.map(({ work, chapterCount, paidChapterCount, estimatedSalesYen }) => (
          <Link
            key={work.id}
            href={`/dashboard/works/${work.id}`}
            className="flex items-center justify-between p-4 hover:bg-slate-50"
          >
            <div>
              <p className="font-semibold">{work.title}</p>
              <p className="text-sm text-slate-600">
                status: {work.status} / 章数: {chapterCount} / 有料章: {paidChapterCount}
              </p>
              <p className="text-xs text-slate-500">推定売上: {estimatedSalesYen.toLocaleString("ja-JP")}円</p>
            </div>
            <span className="pill">編集</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
