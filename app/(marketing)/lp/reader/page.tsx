import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "読者向けLP",
  path: "/lp/reader",
  description: "会員登録なしで試し読み、続きは共通アカウントで管理できる読者向け案内",
});

export default function ReaderLpPage() {
  return (
    <div className="main-container space-y-8 py-10">
      <section className="card space-y-4 p-8">
        <p className="pill">Reader Landing Page</p>
        <h1 className="text-3xl font-bold">まずは無料で読める。続きは必要な分だけ買える。</h1>
        <p className="text-slate-700">
          会員登録なしで1話まるごと試し読み。2〜3話目は一部無料、続きは1話買い切りまたは1冊買い切り。読了後に応援もできます。
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold">試し読み</p>
            <p className="mt-1">会員登録不要で無料話にすぐアクセス。</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold">買い切り課金</p>
            <p className="mt-1">1話買い切り / 1冊買い切りでシンプル。</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm">
            <p className="font-semibold">応援機能</p>
            <p className="mt-1">気に入った作品に投げ銭で応援。</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/works" className="primary-btn">
            作品を探す
          </Link>
          <Link href="/signup?intent=reader" className="secondary-btn">
            共通アカウントを作る
          </Link>
        </div>
      </section>
    </div>
  );
}
