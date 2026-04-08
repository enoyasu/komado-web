import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "閲覧履歴", path: "/history" });

const readingHistory = [
  {
    workTitle: "サンプル連載：街角スケッチ",
    chapterTitle: "第1話 いつもの朝",
    path: "/works/sample-work/chapters/chapter-1",
    updatedAt: "2026-04-09T08:30:00+09:00",
  },
];

export default function HistoryPage() {
  return (
    <div className="main-container space-y-5 py-8">
      <h1 className="section-title">閲覧履歴</h1>
      <div className="card divide-y">
        {readingHistory.map((history) => (
          <Link key={history.path} href={history.path} className="block p-4 hover:bg-slate-50">
            <p className="font-semibold">{history.workTitle}</p>
            <p className="text-sm text-slate-600">{history.chapterTitle}</p>
            <p className="mt-1 text-xs text-slate-500">最終読了: {history.updatedAt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
