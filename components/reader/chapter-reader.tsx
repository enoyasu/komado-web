"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";

type ChapterReaderProps = {
  workSlug: string;
  chapterSlug: string;
  chapterTitle: string;
  pageImages: string[];
  nextChapterPath?: string;
  isPreview?: boolean;
  lockedMessage?: string;
};

export function ChapterReader({
  workSlug,
  chapterSlug,
  chapterTitle,
  pageImages,
  nextChapterPath,
  isPreview = false,
  lockedMessage,
}: ChapterReaderProps) {
  const storageKey = useMemo(
    () => `komado:progress:${workSlug}:${chapterSlug}`,
    [workSlug, chapterSlug],
  );

  useEffect(() => {
    pageImages.slice(1, 3).forEach((src) => {
      const preloaded = new window.Image();
      preloaded.src = src;
    });
  }, [pageImages]);

  useEffect(() => {
    const onScroll = () => {
      const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progressRatio = maxScrollable > 0 ? window.scrollY / maxScrollable : 1;
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          pageIndex: Math.max(0, Math.floor(progressRatio * pageImages.length) - 1),
          progressRatio,
          updatedAt: new Date().toISOString(),
        }),
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pageImages.length, storageKey]);

  return (
    <section className="space-y-4">
      <header className="card p-4">
        <p className="pill mb-2">縦スクロールビューア</p>
        <h1 className="text-xl font-bold">{chapterTitle}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {isPreview
            ? "この話は無料範囲のみ表示しています。購入または応援で続きを読めます。"
            : "読書位置はブラウザ内に保存され、次回は「続きから読む」導線で再開できます。"}
        </p>
      </header>

      <div className="space-y-3">
        {pageImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${chapterTitle} ${index + 1}ページ目`}
            width={1200}
            height={1680}
            priority={index < 2}
            className="card w-full rounded-xl object-contain"
          />
        ))}
      </div>

      {isPreview && lockedMessage ? (
        <div className="card border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          {lockedMessage}
        </div>
      ) : null}

      <footer className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">読了後はフォローやシェアで作者を応援できます。</p>
        <div className="flex gap-2">
          <Link href={`/works/${workSlug}`} className="secondary-btn">
            共有導線へ
          </Link>
          {nextChapterPath ? (
            <Link href={nextChapterPath} className="primary-btn">
              次の話へ
            </Link>
          ) : (
            <Link href={`/works/${workSlug}`} className="primary-btn">
              作品ページへ
            </Link>
          )}
        </div>
      </footer>
    </section>
  );
}
