import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";
import { buildMetadata } from "@/lib/metadata";
import { loginAction } from "@/server/auth/actions";

export const metadata = buildMetadata({ title: "ログイン", path: "/login" });

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : undefined;
  const next = params.next ? decodeURIComponent(params.next) : "/";

  return (
    <div className="main-container space-y-5 py-10">
      <section className="text-center">
        <h1 className="text-2xl font-bold">ログイン</h1>
        <p className="mt-2 text-sm text-slate-600">読書履歴・フォロー・ブックマークを同期できます。</p>
      </section>
      <LoginForm action={loginAction} errorMessage={errorMessage} next={next} />
      <p className="text-center text-sm text-slate-600">
        初めてですか？ <Link href="/signup" className="text-blue-700 hover:underline">会員登録はこちら</Link>
      </p>
    </div>
  );
}
