import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "設定", path: "/settings" });

export default function SettingsPage() {
  return (
    <div className="main-container space-y-5 py-8">
      <h1 className="section-title">設定</h1>
      <div className="card space-y-4 p-5">
        <div className="form-field">
          <label htmlFor="displayName">表示名</label>
          <input id="displayName" defaultValue="読者たろう" />
        </div>
        <div className="form-field">
          <label htmlFor="emailNotice">通知設定</label>
          <select id="emailNotice" defaultValue="follow">
            <option value="follow">フォロー作品の更新通知</option>
            <option value="all">すべて受け取る</option>
            <option value="none">受け取らない</option>
          </select>
        </div>
        <button className="primary-btn w-fit" type="button">
          保存
        </button>
      </div>
    </div>
  );
}
