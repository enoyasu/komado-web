export function ReportForm({ targetLabel }: { targetLabel: string }) {
  return (
    <form className="card space-y-4 p-5" aria-label="通報フォーム">
      <h2 className="text-lg font-semibold">通報する: {targetLabel}</h2>
      <div className="form-field">
        <label htmlFor="reason">理由</label>
        <select id="reason" defaultValue="権利侵害の疑い">
          <option>権利侵害の疑い</option>
          <option>不適切な表現</option>
          <option>スパム</option>
          <option>その他</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="note">詳細</label>
        <textarea id="note" rows={4} placeholder="状況を具体的に入力してください" />
      </div>
      <button type="submit" className="secondary-btn">
        通報を送信
      </button>
    </form>
  );
}
