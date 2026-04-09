"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  className?: string;
  eventName: AnalyticsEventName;
  eventPayload?: Record<string, unknown>;
  children: ReactNode;
};

export function TrackedLink({
  href,
  className,
  eventName,
  eventPayload,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        // TODO: replace with production analytics SDK dispatch when available.
        trackEvent(eventName, eventPayload);
      }}
    >
      {children}
    </Link>
  );
}
