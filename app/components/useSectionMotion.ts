"use client";

import { useEffect } from "react";

type Part = { element: Element; lift: number; delay: number };
type Entrance = { anchor: HTMLElement; animations: Animation[]; playing: boolean };

/** Prepare offscreen content once; only visual surfaces move, reading text stays still. */
export function useSectionMotion(language: string) {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !Element.prototype.animate) return;
    const entrances = new Map<Element, Entrance>();
    const easing = getComputedStyle(document.documentElement).getPropertyValue("--ease-reveal").trim();

    const finish = (entrance: Entrance) => {
      entrance.animations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
      observer.unobserve(entrance.anchor);
      entrances.delete(entrance.anchor);
      delete entrance.anchor.dataset.motionState;
    };
    const play = (entrance: Entrance) => {
      if (entrance.playing || document.hidden) return;
      if (entrance.anchor.contains(document.activeElement)) { finish(entrance); return; }
      entrance.playing = true;
      entrance.anchor.dataset.motionState = "entering";
      let remaining = entrance.animations.length;
      entrance.animations.forEach(animation => {
        animation.onfinish = () => { if (--remaining === 0) finish(entrance); };
        animation.play();
      });
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const entrance = entrances.get(entry.target);
        if (!entrance) continue;
        if (entry.isIntersecting) play(entrance);
        else if (entry.boundingClientRect.bottom <= 0) finish(entrance);
      }
    }, { rootMargin: "0px 0px 48px 0px", threshold: 0 });

    const prepare = (anchor: HTMLElement, parts: Part[]) => {
      // Never move or hide content the visitor is already looking at.
      if (anchor.getBoundingClientRect().top < innerHeight || parts.length === 0) return;
      const animations = parts.map(({ element, lift, delay }) => {
        const animation = element.animate([
          { opacity: 0, ...(lift ? { transform: `translateY(${lift}px)` } : {}) },
          { opacity: 1, ...(lift ? { transform: "translateY(0)" } : {}) },
        ], { duration: lift ? 650 : 500, delay, easing, fill: "both" });
        animation.pause();
        animation.currentTime = 0;
        return animation;
      });
      entrances.set(anchor, { anchor, animations, playing: false });
      anchor.dataset.motionState = "ready";
      observer.observe(anchor);
    };

    document.querySelectorAll<HTMLElement>(".portfolio [data-reveal]").forEach(target => {
      if (target.matches(".project-shelf, .interest-list")) {
        const cards = [...target.querySelectorAll<HTMLElement>(".project-card, .interest-item")];
        cards.forEach((card, index) => {
          const rowPeer = cards[index - 1];
          const sameRow = rowPeer && Math.abs(card.offsetTop - rowPeer.offsetTop) < 4;
          const delay = sameRow ? Math.min(index, 2) * 55 : 0;
          if (card.matches(".project-card")) {
            // Keep each entry together so images and text never drift apart.
            prepare(card, [{ element: card, lift: 0, delay }]);
            return;
          }
          const image = card.querySelector(".shelf-figure, .interest-artwork");
          const copy = card.querySelector(".shelf-card-copy, .interest-item > div");
          const arrow = card.querySelector(".arrow-icon");
          const parts: Part[] = [];
          if (image) parts.push({ element: image, lift: 16, delay });
          if (copy) parts.push({ element: copy, lift: 0, delay: delay + 35 });
          if (arrow) parts.push({ element: arrow, lift: 0, delay: delay + 35 });
          prepare(card, parts);
        });
      } else {
        const lead = target.previousElementSibling;
        const sameRow = lead && Math.abs(lead.getBoundingClientRect().top - target.getBoundingClientRect().top) < 4;
        const delay = target.dataset.reveal === "support" && sameRow ? 70 : 0;
        prepare(target, [{ element: target, lift: 0, delay }]);
      }
    });

    const onFocus = (event: FocusEvent) => {
      entrances.forEach(entrance => {
        if (event.target instanceof Node && entrance.anchor.contains(event.target)) finish(entrance);
      });
    };
    const onPreference = () => { if (preference.matches) entrances.forEach(finish); };
    const onPrint = () => entrances.forEach(finish);
    const onVisibility = () => {
      entrances.forEach(entrance => {
        if (document.hidden) { if (entrance.playing) finish(entrance); }
        else if (entrance.anchor.getBoundingClientRect().top < innerHeight + 48) play(entrance);
      });
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("beforeprint", onPrint);
    preference.addEventListener("change", onPreference);
    return () => {
      entrances.forEach(finish);
      observer.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("beforeprint", onPrint);
      preference.removeEventListener("change", onPreference);
    };
  }, [language]);
}
