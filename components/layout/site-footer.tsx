import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="main-container flex flex-col gap-3 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© 2026 komado. 誰でも読みやすい公開Web漫画プラットフォーム</p>
        <div className="flex gap-4">
          <Link href="/works">作品一覧</Link>
          <Link href="/dashboard">作者ダッシュボード</Link>
          <Link href="/works/sample-work">作品ページから通報</Link>
        </div>
      </div>
    </footer>
  );
}
