import { buildMetadata } from "@/lib/metadata";
import { reports } from "@/lib/mock-data";

export const metadata = buildMetadata({ title: "通報一覧", path: "/admin/reports" });

export default function AdminReportsPage() {
  return (
    <div className="main-container space-y-5 py-8">
      <h1 className="section-title">通報一覧</h1>
      <div className="card overflow-hidden">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">対象</th>
              <th className="p-3">理由</th>
              <th className="p-3">状態</th>
              <th className="p-3">作成日時</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-slate-200">
                <td className="p-3">{report.id}</td>
                <td className="p-3">{report.targetType}:{report.targetId}</td>
                <td className="p-3">{report.reason}</td>
                <td className="p-3">{report.status}</td>
                <td className="p-3">{new Date(report.createdAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
