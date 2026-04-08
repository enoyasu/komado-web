import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/works", label: "作品一覧" },
  { href: "/tags/%E6%97%A5%E5%B8%B8", label: "タグ" },
  { href: "/library", label: "ライブラリ" },
  { href: "/dashboard", label: "投稿" },
  { href: "/admin", label: "運営" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/90 backdrop-blur-sm">
      <div className="main-container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2" aria-label="komado トップへ">
          <Image src="/brand/logo-horizontal.png" alt="komado" width={140} height={56} priority />
        </Link>
        <nav aria-label="グローバルナビゲーション" className="hidden gap-4 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 transition hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-2">
          <Link className="secondary-btn text-sm" href="/login">
            ログイン
          </Link>
          <Link className="primary-btn hidden text-sm sm:inline-flex" href="/signup">
            会員登録
          </Link>
        </div>
      </div>
    </header>
  );
}
