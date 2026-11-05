"use client";

import type { ReactNode } from "react";

/** Use real links so static exports, new tabs, and browser history keep working. */
export function SmoothLink({ href, className, children, ariaLabel, reveal = false, onNavigate }: { href: string; className?: string; children: ReactNode; ariaLabel?: string; reveal?: boolean; onNavigate?: () => void }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const browserHref = href.startsWith("/") ? `${basePath}${href}` : href;
  return <a href={browserHref} className={className} aria-label={ariaLabel} data-reveal={reveal || undefined} onClick={onNavigate}>{children}</a>;
}
