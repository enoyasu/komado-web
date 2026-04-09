import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { chapters, getWorkById } from "@/lib/mock-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; chapterId: string }>;
}) {
  const { id, chapterId } = await params;
  return buildMetadata({
    title: `章編集 ${chapterId}`,
    path: `/dashboard/works/${id}/chapters/${chapterId}`,
  });
}

export default async function DashboardChapterEditPage({
  params,
}: {
  params: Promise<{ id: string; chapterId: string }>;
}) {
  const { id, chapterId } = await params;
  const work = getWorkById(id);
  const chapter = chapters.find((item) => item.id === chapterId && item.workId === id);

  if (!work || !chapter) {
    notFound();
  }

  return (
    <div className="main-container py-8">
      <form className="card mx-auto max-w-3xl space-y-4 p-6" aria-label="章編集フォーム">
        <h1 className="text-xl font-bold">{chapter.title}</h1>
        <p className="text-sm text-slate-600">作品: {work.title}</p>
        <div className="form-field">
          <label htmlFor="chapterTitle">章タイトル</label>
          <input id="chapterTitle" defaultValue={chapter.title} />
        </div>
        <div className="form-field">
          <label htmlFor="summary">概要</label>
          <textarea id="summary" rows={3} defaultValue={chapter.summary} />
        </div>
        <div className="form-field">
          <label htmlFor="files">漫画ページ画像（複数アップロード）</label>
          <input id="files" type="file" multiple accept="image/png,image/jpeg,image/webp" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="form-field">
            <label htmlFor="accessModel">公開モデル</label>
            <select id="accessModel" defaultValue={chapter.accessModel}>
              <option value="free_full">1話まるごと無料</option>
              <option value="partial_preview">一部無料</option>
              <option value="paid">買い切り</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="freePageCount">無料ページ数</label>
            <input id="freePageCount" type="number" min={1} defaultValue={chapter.freePageCount} />
          </div>
          <div className="form-field">
            <label htmlFor="chapterPrice">価格（円）</label>
            <input id="chapterPrice" type="number" min={0} defaultValue={chapter.chapterPriceYen} />
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600">
          ページ順はドラッグで変更可能（MVPでは並び替えUIのプレースホルダー）。
        </div>
        <div className="flex gap-2">
          <button className="primary-btn" type="submit">
            下書き保存
          </button>
          <button className="secondary-btn" type="button">
            公開する
          </button>
        </div>
      </form>
    </div>
  );
}
