# AGENTS.md

このリポジトリで作業するコーディングエージェント向けの最上位ガイド。

## 目的
- `komado` は iPhone / Android / PC ブラウザで使える公開Web漫画プラットフォーム
- ログイン不要で公開作品を閲覧できることを前提に実装する

## 優先順位
1. 公開Webサイトとして発見されやすいこと
2. スマホで漫画が快適に読めること
3. 作者が迷わず投稿できること
4. 安全に運営できること
5. ローカルで簡単に確認できること
6. 将来拡張しやすいこと

## MVPスコープ
### 読者
- ホーム / 作品一覧 / 作品詳細 / 章ページ / タグ / 作者ページ
- フォロー / ブックマーク / 履歴 / 続きから読む / 通報

### 作者
- 作品作成編集 / カバー設定 / タグ設定 / 公開状態管理
- 章作成編集 / 複数画像アップロード / 並び替え / 下書き / 公開 / 予約公開

### 運営
- 管理画面
- 通報一覧 / 作品一覧 / ユーザー一覧
- 作品公開停止 / アカウント停止 / 監査ログ

## 非対象（明示指示まで実装しない）
- ネイティブアプリ
- マイクロサービス / GraphQL
- 高度推薦 / 高度ランキング
- コメント / チャット
- 多言語 / オフライン
- 課金 / サブスク

## 技術方針
- Next.js App Router + TypeScript strict
- モノリス優先、過剰抽象化を避ける
- SSR / SEO / 動的 metadata を重視
- 認可は必ずサーバー側で検証

## URL設計
### 公開
- `/`
- `/works`
- `/works/[slug]`
- `/works/[slug]/chapters/[chapterSlug]`
- `/tags/[tagSlug]`
- `/creators/[handle]`

### 会員
- `/login` `/signup` `/library` `/history` `/settings`

### 作者
- `/dashboard`
- `/dashboard/works`
- `/dashboard/works/new`
- `/dashboard/works/[id]`
- `/dashboard/works/[id]/chapters/[chapterId]`

### 管理
- 管理画面は別URLに移管
- `/admin` と `/admin/*` は外部管理URLへ転送

## SEO要件
- title / description / canonical
- OGP / Twitter Card
- sitemap.xml / robots.txt
- 作品ページのインデックス性を重視

## 計測イベント
- `view_home`
- `view_work`
- `open_chapter`
- `complete_chapter`
- `follow_work`
- `bookmark_work`
- `share_work`
- `signup_complete`
- `creator_create_work`
- `creator_publish_chapter`

## ロール
- `guest` / `user` / `creator` / `moderator` / `admin`

## セキュリティ
- `.env` をコミットしない
- 入力は必ずバリデーション
- 管理操作は監査ログ
- アップロードは MIME / サイズ / 拡張子 / 枚数を検証

## ローカル確認要件
- README手順だけで起動できる
- seed で確認データを投入できる
- 以下導線がローカルで確認できる
  - ホーム / 作品一覧 / 作品詳細 / 章閲覧
  - ログイン
  - 作者の作品作成 / 章公開
  - 管理者の通報一覧

## コマンド
- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm test:unit`
- `pnpm test:e2e`
- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:seed`
- `pnpm format`

## Done条件
- 要件を満たす
- 不要差分がない
- lint / typecheck / 関連テストが通る
- 認可チェックが入っている
- 公開ページのSEOを確認
- env追加時は `.env.example` を更新
- DB変更時は migration を追加
- README / docs を必要に応じ更新

## 作業ルール
- 関連ファイルから先に読む
- 無関係な大規模変更を避ける
- 小さく実装し、差分を読みやすく保つ
- 完了時に変更点・影響範囲・未解決事項・ローカル確認手順を短くまとめる
