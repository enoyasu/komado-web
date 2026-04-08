import { buildMetadata } from "@/lib/metadata";
import { works } from "@/lib/mock-data";

export const metadata = buildMetadata({ title: "管理: 作品", path: "/admin/works" });

export default function AdminWorksPage() {
  return (
    <div className="main-container space-y-5 py-8">
      <h1 className="section-title">作品管理</h1>
      <div className="card divide-y">
        {works.map((work) => (
          <div key={work.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{work.title}</p>
              <p className="text-xs text-slate-500">status: {work.status}</p>
            </div>
            <div className="flex gap-2">
              <button className="secondary-btn" type="button">
                公開停止
              </button>
              <button className="secondary-btn" type="button">
                再公開
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
