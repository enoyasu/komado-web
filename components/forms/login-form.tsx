export function LoginForm({
  action,
  next,
  errorMessage,
}: {
  action: (formData: FormData) => void | Promise<void>;
  next?: string;
  errorMessage?: string;
}) {
  return (
    <form action={action} className="card mx-auto max-w-md space-y-4 p-6" aria-label="ログインフォーム">
      {errorMessage ? (
        <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {errorMessage}
        </p>
      ) : null}
      <div className="form-field">
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" type="email" placeholder="user@example.com" required />
      </div>
      <div className="form-field">
        <label htmlFor="password">パスワード</label>
        <input id="password" name="password" type="password" placeholder="password123" required />
      </div>
      <input type="hidden" name="next" value={next ?? "/"} />
      <button type="submit" className="primary-btn w-full">
        ログイン
      </button>
    </form>
  );
}
