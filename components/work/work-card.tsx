import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function WorkCard({ work }: { work: Work }) {
  return (
    <article className="card overflow-hidden">
      <Link href={`/works/${work.slug}`} className="block">
        <Image
          src={work.coverImage}
          alt={`${work.title} のカバー`}
          width={1024}
          height={1024}
          className="aspect-square w-full object-cover"
        />
      </Link>
      <div className="space-y-3 p-4">
        <Link href={`/works/${work.slug}`}>
          <h3 className="text-lg font-bold hover:underline">{work.title}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-slate-600">{work.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge>{tag}</Badge>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
