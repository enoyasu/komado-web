import { buildMetadata } from "@/lib/metadata";
import { getCreatorCommentQueue, resolveCreatorIdForSession } from "@/lib/mock-data";
import { getCurrentSessionUser } from "@/server/auth/current-user";

export const metadata = buildMetadata({ title: "コメント管理", path: "/dashboard/comments" });

export default async function DashboardCommentsPage() {
  const user = await getCurrentSessionUser();
  const creatorId = resolveCreatorIdForSession(user?.email);
  const queue = getCreatorCommentQueue(creatorId);

  return (
    <div className="main-container space-y-6 py-8">
      <section className="card p-5">
        <h1 className="section-title">コメント管理</h1>
        <p className="mt-2 text-sm text-slate-700">
          読了直後の感想を優先表示しています。対応状況を更新しながらコミュニケーションを管理できます。
        </p>
      </section>

      <section className="card divide-y">
        {queue.map((comment) => (
          <article key={comment.id} className="space-y-2 p-4">
            <p className="text-xs text-slate-500">{comment.workTitle} / {comment.chapterTitle}</p>
            <p className="font-semibold">{comment.authorName}</p>
            <p className="text-sm text-slate-700">{comment.body}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="pill">{comment.status}</span>
              <span className="text-slate-500">{new Date(comment.createdAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</span>
              <button type="button" className="secondary-btn text-xs">返信テンプレート</button>
              <button type="button" className="secondary-btn text-xs">対応済みにする</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
