import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "作者ダッシュボード", path: "/dashboard" });

export default function DashboardTopPage() {
  return (
    <div className="main-container space-y-6 py-8">
      <section className="card p-6">
        <p className="pill">creator dashboard</p>
        <h1 className="mt-2 text-2xl font-bold">作者ダッシュボード</h1>
        <p className="mt-2 text-slate-600">
          投稿から公開、収益確認、コメント対応、分析までを一つの画面群で運用できます。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/dashboard/works/new" className="primary-btn">
            新規作品を作成
          </Link>
          <Link href="/dashboard/works" className="secondary-btn">
            作品一覧を管理
          </Link>
          <Link href="/dashboard/revenue" className="secondary-btn">
            売上を見る
          </Link>
          <Link href="/dashboard/comments" className="secondary-btn">
            コメント管理
          </Link>
          <Link href="/dashboard/analytics" className="secondary-btn">
            分析を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
