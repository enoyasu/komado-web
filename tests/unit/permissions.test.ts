import { describe, expect, test } from "vitest";
import { canAccessAdmin, canEditWork, canViewDraft, hasRoleAtLeast } from "@/server/permissions";

describe("permission helpers", () => {
  test("role hierarchy works", () => {
    expect(hasRoleAtLeast("admin", "moderator")).toBe(true);
    expect(hasRoleAtLeast("user", "creator")).toBe(false);
  });

  test("creator can edit own work only", () => {
    expect(canEditWork("creator", "u1", "u1")).toBe(true);
    expect(canEditWork("creator", "u1", "u2")).toBe(false);
  });

  test("admin can edit all works", () => {
    expect(canEditWork("admin", "a1", "u2")).toBe(true);
  });

  test("draft visibility restrictions", () => {
    expect(canViewDraft("guest", "g", "u1")).toBe(false);
    expect(canViewDraft("creator", "u1", "u1")).toBe(true);
    expect(canViewDraft("creator", "u2", "u1")).toBe(false);
    expect(canViewDraft("moderator", "m1", "u1")).toBe(true);
  });

  test("admin screen access", () => {
    expect(canAccessAdmin("admin")).toBe(true);
    expect(canAccessAdmin("moderator")).toBe(true);
    expect(canAccessAdmin("creator")).toBe(false);
  });
});
