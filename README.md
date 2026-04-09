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
- `/readers`
- `/creators`
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
- `/dashboard/revenue`
- `/dashboard/comments`
- `/dashboard/analytics`

### 管理
- 管理画面は別アプリに移管済み
- `/admin` と `/admin/*` は `ADMIN_APP_URL` へリダイレクト

## セットアップ
1. pnpmがない場合（`pnpm: command not found`）
```bash
corepack enable
corepack prepare pnpm@10.6.3 --activate
```

2. インストール
```bash
pnpm install
```

3. 環境変数作成
```bash
cp .env.example .env
cp .env.example .env.local
```
`ADMIN_APP_URL` は実際の管理アプリURLに変更してください。

4. ローカルDB起動
```bash
docker compose up -d
```

5. Prisma生成とマイグレーション
```bash
pnpm db:generate
pnpm db:migrate
```

6. seed投入
```bash
pnpm db:seed
```

7. 開発サーバー起動
```bash
pnpm dev
```
Turbopack キャッシュエラーが出る場合は次を実行してください。
```bash
pnpm dev:reset
```

## ローカル確認URL
- Home: `http://localhost:3000/`
- Readers LP: `http://localhost:3000/readers`
- Creators LP: `http://localhost:3000/creators`
- Works: `http://localhost:3000/works`
- Sample work: `http://localhost:3000/works/sample-work`
- Sample chapter: `http://localhost:3000/works/sample-work/chapters/chapter-1`
- Login: `http://localhost:3000/login`
- Dashboard: `http://localhost:3000/dashboard`
- Revenue: `http://localhost:3000/dashboard/revenue`
- Comments: `http://localhost:3000/dashboard/comments`
- Analytics: `http://localhost:3000/dashboard/analytics`
- Admin redirect: `http://localhost:3000/admin`（外部管理URLへ遷移）

## seedテスト用アカウント
- 一般ユーザー: `user@example.com`
- 一般ユーザー2: `reader2@example.com`
- 作者: `creator@example.com`
- 作者2: `creator2@example.com`
- 作者3: `creator3@example.com`
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
