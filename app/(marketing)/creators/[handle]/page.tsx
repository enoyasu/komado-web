import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkCard } from "@/components/work/work-card";
import { buildMetadata } from "@/lib/metadata";
import { getCreatorByHandle, getWorksByCreator } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return buildMetadata({
    title: `作者: ${handle}`,
    description: `${handle} の公開作品ページ`,
    path: `/creators/${handle}`,
  });
}

export default async function CreatorPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const creator = getCreatorByHandle(handle);
  if (!creator) {
    notFound();
  }
  const works = getWorksByCreator(creator.userId);

  return (
    <div className="main-container space-y-6 py-8">
      <section className="card p-6">
        <p className="pill">creator profile</p>
        <h1 className="mt-2 text-2xl font-bold">{creator.penName}</h1>
        <p className="mt-2 text-slate-600">{creator.bio}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {creator.links.map((link) => (
            <Link key={link} href={link} className="text-blue-700 hover:underline">
              {link}
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
