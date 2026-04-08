export function LoginForm() {
  return (
    <form className="card mx-auto max-w-md space-y-4 p-6" aria-label="ログインフォーム">
      <div className="form-field">
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email" placeholder="user@example.com" required />
      </div>
      <div className="form-field">
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" placeholder="password123" required />
      </div>
      <button type="submit" className="primary-btn w-full">
        ログイン
      </button>
    </form>
  );
}
