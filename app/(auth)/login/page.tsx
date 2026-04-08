import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "ログイン", path: "/login" });

export default function LoginPage() {
  return (
    <div className="main-container space-y-5 py-10">
      <section className="text-center">
        <h1 className="text-2xl font-bold">ログイン</h1>
        <p className="mt-2 text-sm text-slate-600">読書履歴・フォロー・ブックマークを同期できます。</p>
      </section>
      <LoginForm />
      <p className="text-center text-sm text-slate-600">
        初めてですか？ <Link href="/signup" className="text-blue-700 hover:underline">会員登録はこちら</Link>
      </p>
    </div>
  );
}
