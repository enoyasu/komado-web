export function SignupForm() {
  return (
    <form className="card mx-auto max-w-md space-y-4 p-6" aria-label="会員登録フォーム">
      <div className="form-field">
        <label htmlFor="displayName">表示名</label>
        <input id="displayName" type="text" placeholder="こまだ太郎" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email" placeholder="user@example.com" required />
      </div>
      <div className="form-field">
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" placeholder="8文字以上" required />
      </div>
      <button type="submit" className="primary-btn w-full">
        会員登録
      </button>
    </form>
  );
}
