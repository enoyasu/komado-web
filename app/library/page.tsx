import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { getPublishedWorks } from "@/lib/mock-data";

export const metadata = buildMetadata({ title: "ライブラリ", path: "/library" });

export default function LibraryPage() {
  const works = getPublishedWorks();

  return (
    <div className="main-container space-y-5 py-8">
      <h1 className="section-title">ライブラリ</h1>
      <p className="text-sm text-slate-600">フォロー中作品とブックマークをまとめて確認できます。（MVPはサンプル表示）</p>
      <div className="card divide-y">
        {works.map((work) => (
          <Link key={work.id} href={`/works/${work.slug}`} className="flex items-center justify-between p-4 hover:bg-slate-50">
            <span>{work.title}</span>
            <span className="text-sm text-blue-700">読む</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
