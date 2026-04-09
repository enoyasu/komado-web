import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";

const fallbackAdminUrl = "https://admin.komado.jp";

export const metadata = buildMetadata({
  title: "管理画面移管",
  description: "管理画面は別URLへ移管されました",
  path: "/admin",
});

function joinAdminUrl(baseUrl: string, path: string[]): string {
  const base = new URL(baseUrl);
  const basePath = base.pathname.replace(/\/+$/, "");
  const nextPath = path.join("/");
  base.pathname = nextPath ? `${basePath}/${nextPath}` : basePath || "/";
  return base.toString();
}

export default async function AdminRedirectPage({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  const { path = [] } = await params;
  const target = joinAdminUrl(process.env.ADMIN_APP_URL ?? fallbackAdminUrl, path);
  redirect(target);
}
