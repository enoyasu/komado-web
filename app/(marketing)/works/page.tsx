import { buildMetadata } from "@/lib/metadata";
import { getAllTags, getPublishedWorks } from "@/lib/mock-data";
import { WorkCard } from "@/components/work/work-card";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "作品一覧",
  description: "公開中の漫画作品を一覧で探せます",
  path: "/works",
});

export default function WorksPage() {
  const works = getPublishedWorks();
  const tags = getAllTags();

  return (
    <div className="main-container space-y-8 py-8">
      <section className="card p-6">
        <h1 className="section-title mb-2">作品一覧</h1>
        <p className="text-sm text-slate-600">公開中の作品を更新順で表示しています。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="pill">
              {tag}
            </Link>
          ))}
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </section>
    </div>
  );
}
