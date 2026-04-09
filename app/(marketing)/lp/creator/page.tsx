import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "漫画家向けLP",
  path: "/lp/creator",
  description: "投稿・売上・分析・コメント管理をまとめて使える漫画家向け案内",
});

export default function CreatorLpPage() {
  return (
    <div className="main-container space-y-8 py-10">
      <section className="card space-y-4 p-8">
        <p className="pill">Creator Landing Page</p>
        <h1 className="text-3xl font-bold">投稿から収益化まで、1つのダッシュボードで管理。</h1>
        <p className="text-slate-700">
          作品管理・売上・コメント管理・分析を一体化。課金は買い切り中心、手数料は10〜15%帯、投げ銭と弱い広告で収益を積み上げられます。
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold">売上モデル</p>
            <p className="mt-1">1話買い切り / 1冊買い切り + 投げ銭 + 無料話限定の弱い広告。</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold">分析</p>
            <p className="mt-1">新着・伸び・ジャンルおすすめ・読了導線の傾向を確認。</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/signup?intent=creator" className="primary-btn">
            共通アカウントで開始
          </Link>
          <Link href="/dashboard" className="secondary-btn">
            投稿ダッシュボードを見る
          </Link>
        </div>
      </section>
    </div>
  );
}
