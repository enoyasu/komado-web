import { redirect } from "next/navigation";
import type { SessionUser } from "@/server/auth/session";
import { getCurrentSessionUser } from "@/server/auth/current-user";

function withNextPath(path: string): string {
  return `/login?next=${encodeURIComponent(path)}`;
}

export async function requireLoggedInUser(path = "/"): Promise<SessionUser> {
  const user = await getCurrentSessionUser();

  if (!user) {
    redirect(withNextPath(path));
  }

  return user;
}

export async function requireCreatorUser(path = "/dashboard"): Promise<SessionUser> {
  const user = await requireLoggedInUser(path);

  if (user.role !== "creator" && user.role !== "admin" && user.role !== "moderator") {
    redirect("/onboarding?intent=creator");
  }

  return user;
}
