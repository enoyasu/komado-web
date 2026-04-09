"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createPasswordHash, verifyPassword } from "@/server/auth/password";
import { prisma } from "@/server/db/prisma";
import { createSessionToken, SESSION_COOKIE_NAME, type SessionUser } from "@/server/auth/session";

const signupSchema = z.object({
  displayName: z.string().min(1, "表示名を入力してください").max(30),
  email: z.string().email("メールアドレスの形式が不正です"),
  password: z.string().min(8, "パスワードは8文字以上にしてください"),
  intent: z.enum(["reader", "creator"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

const roleSwitchSchema = z.object({
  mode: z.enum(["reader", "creator"]),
});

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function sanitizeHandleBase(email: string): string {
  const base = email.split("@")[0] ?? "komado-user";
  return base
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24) || "komado-user";
}

async function createUniqueHandle(email: string): Promise<string> {
  const base = sanitizeHandleBase(email);

  for (let index = 0; index < 20; index += 1) {
    const candidate = index === 0 ? base : `${base}-${index}`;
    const exists = await prisma.user.findUnique({ where: { handle: candidate }, select: { id: true } });
    if (!exists) {
      return candidate;
    }
  }

  return `${base}-${Math.floor(Math.random() * 10000)}`;
}

async function setSessionCookie(user: SessionUser): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

function getSafeNext(next?: string): string {
  if (!next || !next.startsWith("/")) {
    return "/";
  }
  if (next.startsWith("//")) {
    return "/";
  }
  return next;
}

export async function signupAction(formData: FormData) {
  const parsed = signupSchema.safeParse({
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
    intent: formData.get("intent") || undefined,
  });

  if (!parsed.success) {
    redirect(`/signup?error=${encodeURIComponent(parsed.error.issues[0]?.message ?? "入力内容を確認してください")}`);
  }

  const email = normalizeEmail(parsed.data.email);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirect("/signup?error=このメールアドレスは既に登録済みです");
  }

  const handle = await createUniqueHandle(email);

  const user = await prisma.user.create({
    data: {
      email,
      handle,
      displayName: parsed.data.displayName,
      role: "user",
      passwordHash: createPasswordHash(parsed.data.password),
      onboardingCompleted: false,
      onboardingTrack: parsed.data.intent ?? null,
    },
  });

  await setSessionCookie({
    userId: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    onboardingCompleted: user.onboardingCompleted,
  });

  const intentQuery = parsed.data.intent ? `?intent=${parsed.data.intent}` : "";
  redirect(`/onboarding${intentQuery}`);
}

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") || undefined,
  });

  if (!parsed.success) {
    redirect("/login?error=入力内容を確認してください");
  }

  const email = normalizeEmail(parsed.data.email);
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.passwordHash || !verifyPassword(parsed.data.password, user.passwordHash)) {
    redirect("/login?error=メールアドレスまたはパスワードが正しくありません");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await setSessionCookie({
    userId: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    onboardingCompleted: user.onboardingCompleted,
  });

  if (!user.onboardingCompleted) {
    redirect("/onboarding");
  }

  redirect(getSafeNext(parsed.data.next));
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/");
}

export async function completeOnboardingAction(formData: FormData) {
  const parsed = roleSwitchSchema.safeParse({
    mode: formData.get("mode"),
  });

  if (!parsed.success) {
    redirect("/onboarding?error=選択内容を確認してください");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/login?next=/onboarding");
  }

  const session = (await import("@/server/auth/session")).verifySessionToken(token);
  if (!session) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    redirect("/login?next=/onboarding");
  }

  const role = parsed.data.mode === "creator" ? "creator" : "user";

  const user = await prisma.user.update({
    where: { id: session.userId },
    data: {
      role,
      onboardingCompleted: true,
      onboardingTrack: parsed.data.mode,
    },
  });

  if (role === "creator") {
    await prisma.creatorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        penName: user.displayName,
        bio: "自己紹介を設定してください。",
      },
    });
  }

  await setSessionCookie({
    userId: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    onboardingCompleted: user.onboardingCompleted,
  });

  redirect(role === "creator" ? "/dashboard" : "/library");
}

export async function switchRoleAction(formData: FormData) {
  const parsed = roleSwitchSchema.safeParse({
    mode: formData.get("mode"),
  });

  if (!parsed.success) {
    redirect("/settings?error=切り替えに失敗しました");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    redirect("/login?next=/settings");
  }

  const session = (await import("@/server/auth/session")).verifySessionToken(token);
  if (!session) {
    cookieStore.delete(SESSION_COOKIE_NAME);
    redirect("/login?next=/settings");
  }

  const role = parsed.data.mode === "creator" ? "creator" : "user";

  const user = await prisma.user.update({
    where: { id: session.userId },
    data: {
      role,
      onboardingCompleted: true,
      onboardingTrack: parsed.data.mode,
    },
  });

  if (role === "creator") {
    await prisma.creatorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        penName: user.displayName,
        bio: "自己紹介を設定してください。",
      },
    });
  }

  await setSessionCookie({
    userId: user.id,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    onboardingCompleted: user.onboardingCompleted,
  });

  redirect(`/settings?success=${encodeURIComponent(parsed.data.mode === "creator" ? "投稿者モードに切り替えました" : "読者モードに切り替えました")}`);
}
