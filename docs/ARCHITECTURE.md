# ARCHITECTURE

## 構成
- Next.js App Router の単一モノリス構成
- 公開導線は Server Component 優先
- 認可・アップロード検証は `server/` に分離
- DB は PostgreSQL + Prisma

## ディレクトリ責務
- `app/(marketing)`: 公開ページ
- `app/(auth)`: 認証ページ
- `app/dashboard`: 作者導線
- `app/admin`: 外部管理URLへのリダイレクト導線
- `components/`: UI部品
- `lib/`: 共有ロジックとメタデータ
- `server/`: 権限制御・検証
- `db/`: Prisma schema / seed
- `tests/`: unit と e2e
