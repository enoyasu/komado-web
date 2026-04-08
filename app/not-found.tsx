import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main-container py-20">
      <div className="card mx-auto max-w-xl p-8 text-center">
        <p className="pill mb-4">404</p>
        <h1 className="mb-3 text-2xl font-bold">ページが見つかりません</h1>
        <p className="mb-6 text-slate-600">
          URLが変更されたか、公開停止中の可能性があります。作品一覧からお探しください。
        </p>
        <Link href="/works" className="primary-btn inline-flex">
          作品一覧へ
        </Link>
      </div>
    </main>
  );
}
