export function SignupForm({
  action,
  intent,
  errorMessage,
}: {
  action: (formData: FormData) => void | Promise<void>;
  intent?: "reader" | "creator";
  errorMessage?: string;
}) {
  return (
    <form action={action} className="card mx-auto max-w-md space-y-4 p-6" aria-label="会員登録フォーム">
      {errorMessage ? (
        <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {errorMessage}
        </p>
      ) : null}
      <div className="form-field">
        <label htmlFor="displayName">表示名</label>
        <input id="displayName" name="displayName" type="text" placeholder="こまだ太郎" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" type="email" placeholder="user@example.com" required />
      </div>
      <div className="form-field">
        <label htmlFor="password">パスワード</label>
        <input id="password" name="password" type="password" placeholder="8文字以上" required />
      </div>
      <input type="hidden" name="intent" value={intent ?? "reader"} />
      <button type="submit" className="primary-btn w-full">
        会員登録
      </button>
    </form>
  );
}
