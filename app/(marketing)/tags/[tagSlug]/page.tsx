import { WorkCard } from "@/components/work/work-card";
import { buildMetadata } from "@/lib/metadata";
import { getWorksByTag } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ tagSlug: string }> }) {
  const { tagSlug } = await params;
  const tagName = decodeURIComponent(tagSlug);
  return buildMetadata({
    title: `タグ: ${tagName}`,
    description: `${tagName} の作品一覧`,
    path: `/tags/${tagSlug}`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ tagSlug: string }> }) {
  const { tagSlug } = await params;
  const tagName = decodeURIComponent(tagSlug);
  const works = getWorksByTag(tagSlug);

  return (
    <div className="main-container space-y-6 py-8">
      <section className="card p-6">
        <h1 className="section-title">タグ: {tagName}</h1>
        <p className="mt-2 text-sm text-slate-600">該当する公開作品: {works.length}件</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </section>
    </div>
  );
}
