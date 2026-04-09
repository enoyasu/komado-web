import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getWorkById, getChaptersByWork } from "@/lib/mock-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return buildMetadata({ title: `作品編集 ${id}`, path: `/dashboard/works/${id}` });
}

export default async function DashboardWorkEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = getWorkById(id);
  if (!work) {
    notFound();
  }
  const chapters = getChaptersByWork(work.id);

  return (
    <div className="main-container space-y-5 py-8">
      <section className="card space-y-3 p-5">
        <h1 className="text-xl font-bold">{work.title}</h1>
        <p className="text-sm text-slate-600">slug: {work.slug}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="form-field">
            <label htmlFor="status">公開状態</label>
            <select id="status" defaultValue={work.status}>
              <option value="draft">下書き</option>
              <option value="published">公開</option>
              <option value="hidden">非公開</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="scheduledAt">予約公開日時（JST）</label>
            <input id="scheduledAt" type="datetime-local" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="form-field">
            <label htmlFor="chapterPrice">1話買い切り価格（円）</label>
            <input id="chapterPrice" type="number" min={0} defaultValue={work.chapterPriceYen} />
          </div>
          <div className="form-field">
            <label htmlFor="bookPrice">1冊買い切り価格（円）</label>
            <input id="bookPrice" type="number" min={0} defaultValue={work.bookPriceYen} />
          </div>
        </div>
        <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          手数料: {Math.round(work.platformFeeRate * 100)}% / 投げ銭: {work.tipEnabled ? "有効" : "無効"} /
          無料話広告: {work.weakAdsEnabled ? "有効" : "無効"}
        </p>
      </section>

      <section className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">章管理</h2>
          <button className="primary-btn" type="button">
            新規章を追加
          </button>
        </div>
        <ul className="space-y-2">
          {chapters.map((chapter) => (
            <li key={chapter.id} className="rounded-lg border border-slate-200 p-3">
              <Link href={`/dashboard/works/${work.id}/chapters/${chapter.id}`} className="font-semibold hover:underline">
                {chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
