import { buildMetadata } from "@/lib/metadata";
import { completeOnboardingAction } from "@/server/auth/actions";
import { requireLoggedInUser } from "@/server/auth/guards";

export const metadata = buildMetadata({
  title: "初回オンボーディング",
  path: "/onboarding",
  description: "読む/投稿するを選んでkomadoを開始します",
});

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; error?: string }>;
}) {
  const user = await requireLoggedInUser("/onboarding");
  const params = await searchParams;
  const intent = params.intent === "creator" ? "creator" : "reader";

  return (
    <div className="main-container space-y-6 py-10">
      <section className="text-center">
        <p className="pill">welcome</p>
        <h1 className="mt-3 text-3xl font-bold">{user.displayName}さん、最初の使い方を選んでください</h1>
        <p className="mt-2 text-sm text-slate-700">
          登録は共通アカウントです。後から設定画面で「読む」「投稿する」をいつでも切り替えられます。
        </p>
      </section>

      {params.error ? (
        <p className="mx-auto max-w-xl rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {decodeURIComponent(params.error)}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <form action={completeOnboardingAction} className="card space-y-4 p-6">
          <input type="hidden" name="mode" value="reader" />
          <h2 className="text-xl font-bold">読む</h2>
          <p className="text-sm text-slate-700">
            新着・今週伸びてる作品から探して、続きをライブラリに保存。会員なし試し読みからスムーズに継続できます。
          </p>
          <button type="submit" className="primary-btn w-full">
            読者モードで開始
          </button>
        </form>

        <form action={completeOnboardingAction} className="card space-y-4 p-6">
          <input type="hidden" name="mode" value="creator" />
          <h2 className="text-xl font-bold">投稿する</h2>
          <p className="text-sm text-slate-700">
            作品管理・売上・コメント管理・分析を使って連載を運用。手数料と応援収益を確認しながら更新できます。
          </p>
          <button
            type="submit"
            className={intent === "creator" ? "primary-btn w-full ring-2 ring-blue-300" : "primary-btn w-full"}
          >
            投稿者モードで開始
          </button>
        </form>
      </div>
    </div>
  );
}
