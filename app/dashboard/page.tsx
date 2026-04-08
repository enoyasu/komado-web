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
          投稿から公開までを最短で進めるため、作品作成・章編集・公開状態管理をこの画面群に集約しています。
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/dashboard/works/new" className="primary-btn">
            新規作品を作成
          </Link>
          <Link href="/dashboard/works" className="secondary-btn">
            作品一覧を管理
          </Link>
        </div>
      </section>
    </div>
  );
}
