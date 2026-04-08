import Link from "next/link";
import { SignupForm } from "@/components/forms/signup-form";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ title: "会員登録", path: "/signup" });

export default function SignupPage() {
  return (
    <div className="main-container space-y-5 py-10">
      <section className="text-center">
        <h1 className="text-2xl font-bold">会員登録</h1>
        <p className="mt-2 text-sm text-slate-600">登録後すぐにフォロー・ブックマーク・投稿機能を利用できます。</p>
      </section>
      <SignupForm />
      <p className="text-center text-sm text-slate-600">
        既にアカウントをお持ちですか？ <Link href="/login" className="text-blue-700 hover:underline">ログインへ</Link>
      </p>
    </div>
  );
}
