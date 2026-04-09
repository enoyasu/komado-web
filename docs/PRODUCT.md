# PRODUCT

## 目的
komado は個人漫画制作者のための公開Web漫画プラットフォームです。読者はログインなしで作品・章を閲覧でき、作者はブラウザから投稿・公開できます。

## MVP導線
- 読者: `/` `/works` `/works/[slug]` `/works/[slug]/chapters/[chapterSlug]`
- 会員: `/login` `/signup` `/library` `/history` `/settings`
- 作者: `/dashboard` `/dashboard/works` `/dashboard/works/new` `/dashboard/works/[id]`
- 運営: 管理画面は別URLへ移管（`/admin` は外部管理URLへ転送）

## KPIイベント
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
