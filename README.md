# komado-web

個人漫画制作者向けの **公開Webサイト兼 Webアプリ** です。  
iPhone / Android / PC ブラウザで、ログインなしでも公開作品を閲覧できます。

## 技術スタック
- Next.js (App Router)
- React + TypeScript (strict)
- Tailwind CSS
- PostgreSQL + Prisma
- Zod
- Vitest
- Playwright

## 主要URL
### 公開
- `/`
- `/works`
- `/works/[slug]`
- `/works/[slug]/chapters/[chapterSlug]`
- `/tags/[tagSlug]`
- `/creators/[handle]`

### 会員
- `/login`
- `/signup`
- `/library`
- `/history`
- `/settings`

### 作者
- `/dashboard`
- `/dashboard/works`
- `/dashboard/works/new`
- `/dashboard/works/[id]`
- `/dashboard/works/[id]/chapters/[chapterId]`

### 管理
- `/admin`
- `/admin/reports`
- `/admin/works`
- `/admin/users`

## セットアップ
1. インストール
```bash
pnpm install
```

2. 環境変数作成
```bash
cp .env.example .env.local
```

3. ローカルDB起動
```bash
docker compose up -d
```

4. Prisma生成とマイグレーション
```bash
pnpm db:generate
pnpm db:migrate
```

5. seed投入
```bash
pnpm db:seed
```

6. 開発サーバー起動
```bash
pnpm dev
```

## ローカル確認URL
- Home: `http://localhost:3000/`
- Works: `http://localhost:3000/works`
- Sample work: `http://localhost:3000/works/sample-work`
- Sample chapter: `http://localhost:3000/works/sample-work/chapters/chapter-1`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`
- Admin reports: `http://localhost:3000/admin/reports`

## seedテスト用アカウント
- 一般ユーザー: `user@example.com`
- 作者: `creator@example.com`
- 管理者: `admin@example.com`
- password(ローカル用途の固定値): `password123`

## 開発コマンド
```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:e2e
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm format
```

## テスト実行について
- Unit: `pnpm test:unit`
- E2E: `RUN_E2E=1 pnpm test:e2e`  
  デフォルトでは Playwright smoke は skip されます。ブラウザを入れてから `RUN_E2E=1` で実行してください。

## 追加ドキュメント
- `docs/PRODUCT.md`
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/REVIEW_CHECKLIST.md`
