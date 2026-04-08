import { buildMetadata } from "@/lib/metadata";
import { users } from "@/lib/mock-data";

export const metadata = buildMetadata({ title: "管理: ユーザー", path: "/admin/users" });

export default function AdminUsersPage() {
  return (
    <div className="main-container space-y-5 py-8">
      <h1 className="section-title">ユーザー管理</h1>
      <div className="card divide-y">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{user.displayName}</p>
              <p className="text-sm text-slate-600">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="pill">{user.role}</span>
              <button className="secondary-btn" type="button">
                停止
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
