"use client";

import { useEffect, type MouseEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export function SmoothLink({ href, className, children, ariaLabel, reveal = false }: { href: string; className?: string; children: ReactNode; ariaLabel?: string; reveal?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const browserHref = href.startsWith("/") ? `${basePath}${href}` : href;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("route-leaving");
    root.classList.add("route-arriving");
    const timer = window.setTimeout(() => root.classList.remove("route-arriving"), 520);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.documentElement.classList.add("route-leaving");
    window.setTimeout(() => router.push(browserHref), 260);
  };

  return <a href={browserHref} className={className} aria-label={ariaLabel} data-reveal={reveal || undefined} onClick={navigate}>{children}</a>;
}
