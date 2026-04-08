import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "管理画面", path: "/admin" });

const cards = [
  {
    title: "通報管理",
    description: "ユーザーからの通報を確認し、公開停止や解決処理を行う",
    href: "/admin/reports",
  },
  {
    title: "作品管理",
    description: "公開停止・再公開など作品の可視性を操作する",
    href: "/admin/works",
  },
  {
    title: "ユーザー管理",
    description: "アカウント停止・権限更新を実施する",
    href: "/admin/users",
  },
];

export default function AdminPage() {
  return (
    <div className="main-container space-y-6 py-8">
      <h1 className="section-title">管理画面</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="card block p-5 hover:border-sky-300 hover:bg-sky-50/40">
            <h2 className="font-bold">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
