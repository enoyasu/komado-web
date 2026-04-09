import { createHmac, timingSafeEqual } from "node:crypto";
import type { Role } from "@/lib/mock-data";

export const SESSION_COOKIE_NAME = "komado_session";

const sessionDurationSeconds = 60 * 60 * 24 * 30;

type SessionPayload = {
  userId: string;
  email: string;
  displayName: string;
  role: Role;
  onboardingCompleted: boolean;
  exp: number;
};

export type SessionUser = Omit<SessionPayload, "exp">;

function getSessionSecret(): string {
  return process.env.AUTH_SECRET ?? "local-dev-secret-change-me";
}

function base64url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf-8");
}

function sign(encodedPayload: string): string {
  return createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");
}

export function createSessionToken(user: SessionUser): string {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + sessionDurationSeconds,
  };

  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionUser | null {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const input = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  if (input.length !== expected.length || !timingSafeEqual(input, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64url(encodedPayload)) as SessionPayload;
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      displayName: payload.displayName,
      role: payload.role,
      onboardingCompleted: payload.onboardingCompleted,
    };
  } catch {
    return null;
  }
}
