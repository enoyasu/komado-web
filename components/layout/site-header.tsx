import Image from "next/image";
import Link from "next/link";
import { getCurrentSessionUser } from "@/server/auth/current-user";
import { logoutAction } from "@/server/auth/actions";

const desktopLinks = [
  { href: "/works", label: "作品一覧" },
  { href: "/readers", label: "読者の方へ" },
  { href: "/creators", label: "漫画家の方へ" },
  { href: "/tags/%E6%97%A5%E5%B8%B8", label: "タグ" },
  { href: "/library", label: "ライブラリ" },
  { href: "/dashboard", label: "投稿" },
];

const mobileQuickLinks = [
  { href: "/readers", label: "読者の方へ" },
  { href: "/creators", label: "漫画家の方へ" },
  { href: "/works", label: "作品一覧" },
];

export async function SiteHeader() {
  const sessionUser = await getCurrentSessionUser();

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-sm"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--line)" }}
    >
      <div className="main-container flex h-20 items-center justify-between gap-3">
        <Link href="/" className="flex items-center" aria-label="komado トップへ">
          <Image
            src="/brand/logo-horizontal.svg"
            alt="komado"
            width={196}
            height={78}
            priority
          />
        </Link>

        <nav aria-label="グローバルナビゲーション" className="hidden gap-3 text-sm md:flex">
          {desktopLinks.map((link) => (
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
          {sessionUser ? (
            <>
              <Link className="secondary-btn text-sm" href="/settings">
                {sessionUser.displayName}
              </Link>
              <form action={logoutAction}>
                <button className="primary-btn text-sm" type="submit">
                  ログアウト
                </button>
              </form>
            </>
          ) : (
            <>
              <Link className="secondary-btn text-sm" href="/login">
                ログイン
              </Link>
              <Link className="primary-btn text-sm" href="/signup">
                登録
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="main-container md:hidden">
        <nav
          aria-label="モバイルクイックリンク"
          className="flex gap-2 overflow-x-auto pb-3 text-sm"
        >
          {mobileQuickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="secondary-btn shrink-0 text-xs">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
