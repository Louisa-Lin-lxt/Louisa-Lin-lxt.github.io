"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export function DetailDialog({ title, closeLabel, onClose, children, className = "" }: { title: string; closeLabel: string; onClose: () => void; children: ReactNode; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeCallback = useRef(onClose);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [closing, setClosing] = useState(false);
  useEffect(() => { closeCallback.current = onClose; }, [onClose]);
  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);
  const dismiss = useCallback(() => {
    if (timer.current) return;
    setClosing(true);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 140;
    timer.current = setTimeout(() => closeCallback.current(), delay);
  }, []);
  // Backdrop click is optional; native Escape (onCancel) and the close button provide keyboard equivalents.
  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
  return <dialog ref={dialogRef} className={`detail-dialog ${className} ${closing ? "is-closing" : ""}`} aria-label={title} onKeyDown={(event) => {
    if (event.key !== "Tab") return;
    const focusable = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')].filter(element => element.getClientRects().length > 0);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }} onCancel={(event) => { event.preventDefault(); dismiss(); }} onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
    <div className="dialog-surface">
      <button className="dialog-close" type="button" aria-label={closeLabel} onClick={dismiss}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
      {children}
    </div>
  </dialog>;
}
