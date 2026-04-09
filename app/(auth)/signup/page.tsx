import Link from "next/link";
import { SignupForm } from "@/components/forms/signup-form";
import { buildMetadata } from "@/lib/metadata";
import { signupAction } from "@/server/auth/actions";

export const metadata = buildMetadata({ title: "会員登録", path: "/signup" });

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; intent?: "reader" | "creator" }>;
}) {
  const params = await searchParams;
  const errorMessage = params.error ? decodeURIComponent(params.error) : undefined;
  const intent = params.intent === "creator" ? "creator" : "reader";

  return (
    <div className="main-container space-y-5 py-10">
      <section className="text-center">
        <h1 className="text-2xl font-bold">会員登録</h1>
        <p className="mt-2 text-sm text-slate-600">
          登録は共通アカウントです。初回オンボーディングで「読む」「投稿する」を選べます。
        </p>
      </section>
      <SignupForm action={signupAction} intent={intent} errorMessage={errorMessage} />
      <p className="text-center text-sm text-slate-600">
        既にアカウントをお持ちですか？ <Link href="/login" className="text-blue-700 hover:underline">ログインへ</Link>
      </p>
    </div>
  );
}
