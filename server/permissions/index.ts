import type { Role } from "@/lib/mock-data";

const roleOrder: Role[] = ["guest", "user", "creator", "moderator", "admin"];

export function hasRoleAtLeast(role: Role, required: Role): boolean {
  return roleOrder.indexOf(role) >= roleOrder.indexOf(required);
}

export function canEditWork(role: Role, actorId: string, ownerId: string): boolean {
  if (role === "admin" || role === "moderator") {
    return true;
  }
  return role === "creator" && actorId === ownerId;
}

export function canViewDraft(role: Role, actorId: string, ownerId: string): boolean {
  if (role === "admin" || role === "moderator") {
    return true;
  }
  return role === "creator" && actorId === ownerId;
}

export function canAccessAdmin(role: Role): boolean {
  return role === "admin" || role === "moderator";
}
