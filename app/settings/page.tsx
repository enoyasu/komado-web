import { buildMetadata } from "@/lib/metadata";
import { switchRoleAction } from "@/server/auth/actions";
import { requireLoggedInUser } from "@/server/auth/guards";

export const metadata = buildMetadata({ title: "設定", path: "/settings" });

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const user = await requireLoggedInUser("/settings");
  const params = await searchParams;

  return (
    <div className="main-container space-y-5 py-8">
      <h1 className="section-title">設定</h1>

      {params.error ? (
        <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {decodeURIComponent(params.error)}
        </p>
      ) : null}

      {params.success ? (
        <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {decodeURIComponent(params.success)}
        </p>
      ) : null}

      <div className="card space-y-4 p-5">
        <div className="form-field">
          <label htmlFor="displayName">表示名</label>
          <input id="displayName" defaultValue={user.displayName} />
        </div>
        <div className="form-field">
          <label htmlFor="email">メールアドレス</label>
          <input id="email" defaultValue={user.email} readOnly />
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

      <section className="card space-y-3 p-5">
        <h2 className="text-lg font-semibold">役割切替</h2>
        <p className="text-sm text-slate-700">
          現在のロール: <span className="pill">{user.role}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <form action={switchRoleAction}>
            <input type="hidden" name="mode" value="reader" />
            <button className="secondary-btn" type="submit">
              読者モードへ
            </button>
          </form>
          <form action={switchRoleAction}>
            <input type="hidden" name="mode" value="creator" />
            <button className="primary-btn" type="submit">
              投稿者モードへ
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
