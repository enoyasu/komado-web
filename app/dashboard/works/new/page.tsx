import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "新規作品作成", path: "/dashboard/works/new" });

export default function NewWorkPage() {
  return (
    <div className="main-container py-8">
      <form className="card mx-auto max-w-2xl space-y-4 p-6" aria-label="作品作成フォーム">
        <h1 className="text-xl font-bold">新規作品作成</h1>
        <div className="form-field">
          <label htmlFor="title">タイトル</label>
          <input id="title" placeholder="例: 街角スケッチ" required />
        </div>
        <div className="form-field">
          <label htmlFor="description">あらすじ</label>
          <textarea id="description" rows={4} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="form-field">
            <label htmlFor="tags">タグ</label>
            <input id="tags" placeholder="日常, 学園, ショート" />
          </div>
          <div className="form-field">
            <label htmlFor="status">公開状態</label>
            <select id="status" defaultValue="draft">
              <option value="draft">下書き</option>
              <option value="published">公開</option>
              <option value="hidden">非公開</option>
            </select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="form-field">
            <label htmlFor="chapterPrice">1話買い切り価格（円）</label>
            <input id="chapterPrice" type="number" min={0} defaultValue={70} />
          </div>
          <div className="form-field">
            <label htmlFor="bookPrice">1冊買い切り価格（円）</label>
            <input id="bookPrice" type="number" min={0} defaultValue={580} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="form-field">
            <label htmlFor="tipEnabled">投げ銭 / 応援</label>
            <select id="tipEnabled" defaultValue="enabled">
              <option value="enabled">有効</option>
              <option value="disabled">無効</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="weakAds">無料話の弱い広告</label>
            <select id="weakAds" defaultValue="enabled">
              <option value="enabled">有効（バナー1枠）</option>
              <option value="disabled">無効</option>
            </select>
          </div>
        </div>
        <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          手数料はプラットフォーム 10〜15%帯で自動計算されます。
        </p>
        <div className="form-field">
          <label htmlFor="cover">カバー画像</label>
          <input id="cover" type="file" accept="image/png,image/jpeg,image/webp" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="primary-btn">
            下書き保存
          </button>
          <button type="button" className="secondary-btn">
            公開する
          </button>
        </div>
      </form>
    </div>
  );
}
