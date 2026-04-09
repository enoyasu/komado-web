import type { ReactNode } from "react";
import Link from "next/link";
import { requireCreatorUser } from "@/server/auth/guards";

const dashboardLinks = [
  { href: "/dashboard/works", label: "作品管理" },
  { href: "/dashboard/revenue", label: "売上" },
  { href: "/dashboard/comments", label: "コメント管理" },
  { href: "/dashboard/analytics", label: "分析" },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireCreatorUser("/dashboard");

  return (
    <div className="py-6">
      <div className="main-container mb-6 space-y-4">
        <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="pill">creator mode</p>
            <p className="mt-2 text-sm text-slate-700">{user.displayName}さんの投稿者ダッシュボード</p>
          </div>
          <nav aria-label="投稿者ダッシュボード" className="flex flex-wrap gap-2">
            {dashboardLinks.map((link) => (
              <Link key={link.href} href={link.href} className="secondary-btn text-sm">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
