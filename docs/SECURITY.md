# SECURITY

## 基本方針
- シークレットは環境変数で管理し、`.env` はコミットしない
- 入力は Zod でバリデーション
- 認可は UI ではなく server 側で判定
- 管理操作は `audit_logs` に残す前提で設計

## 実装済みの土台
- アップロード入力検証: `server/uploads/validation.ts`
- 認可ヘルパー: `server/permissions/index.ts`
- 管理導線の分離: `/admin/*`
- 通報導線の配置: 作品詳細ページ
