"use client";

import { useEffect, useRef } from "react";

/** Native disclosure semantics, with an interruptible height transition after hydration. */
export function CourseworkDisclosure({ label, groups }: { label: string; groups: { label: string; courses: string[] }[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    const summary = summaryRef.current;
    const content = contentRef.current;
    if (!details || !summary || !content) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let expanded = details.open;
    let heightAnimation: Animation | null = null;
    let contentAnimation: Animation | null = null;

    const cancelAnimations = () => {
      if (heightAnimation) heightAnimation.onfinish = null;
      heightAnimation?.cancel();
      contentAnimation?.cancel();
      heightAnimation = null;
      contentAnimation = null;
    };
    const settle = () => {
      cancelAnimations();
      details.open = expanded;
      details.style.removeProperty("height");
      delete details.dataset.animating;
      details.dataset.expanded = String(expanded);
      summary.setAttribute("aria-expanded", String(expanded));
    };

    const transition = (next: boolean, instant = false) => {
      // Read the rendered frame before cancelling, so a second click reverses in place.
      const startHeight = details.getBoundingClientRect().height;
      const wasOpen = details.open;
      const contentStyle = getComputedStyle(content);
      const startOpacity = wasOpen ? contentStyle.opacity : "0";
      const startTransform = wasOpen ? contentStyle.transform : "translateY(-4px)";
      cancelAnimations();
      expanded = next;
      details.dataset.expanded = String(next);
      details.dataset.instant = String(instant || motion.matches);
      summary.setAttribute("aria-expanded", String(next));

      if (instant || motion.matches || !details.animate) {
        settle();
        return;
      }

      details.open = true;
      const style = getComputedStyle(details);
      const verticalEdges = [style.borderTopWidth, style.borderBottomWidth, style.paddingTop, style.paddingBottom]
        .reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
      const closedHeight = summary.getBoundingClientRect().height + verticalEdges;
      const endHeight = closedHeight + (next ? content.getBoundingClientRect().height : 0);
      const easing = style.getPropertyValue("--ease").trim() || "cubic-bezier(0.23, 1, 0.32, 1)";
      details.style.height = `${startHeight}px`;
      details.dataset.animating = "true";
      heightAnimation = details.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: 260, easing, fill: "both" },
      );
      contentAnimation = content.animate(
        [
          { opacity: startOpacity, transform: startTransform },
          { opacity: next ? 1 : 0, transform: next ? "translateY(0)" : "translateY(-4px)" },
        ],
        { duration: 200, easing, fill: "both" },
      );
      heightAnimation.onfinish = settle;
    };

    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      // Keyboard activation keeps the native response immediate.
      transition(!expanded, event.detail === 0);
    };
    const onToggle = () => {
      // Preserve browser-driven changes such as find-in-page opening a disclosure.
      if (!heightAnimation) {
        expanded = details.open;
        details.dataset.expanded = String(expanded);
        summary.setAttribute("aria-expanded", String(expanded));
      }
    };
    const onMotionChange = () => {
      details.dataset.instant = String(motion.matches);
      if (motion.matches) settle();
    };
    const resize = new ResizeObserver(() => {
      // Only observe intrinsic children: observing the animated container would loop.
      if (heightAnimation) transition(expanded);
    });
    resize.observe(content);
    resize.observe(summary);
    details.dataset.enhanced = "true";
    settle();
    summary.addEventListener("click", onClick);
    details.addEventListener("toggle", onToggle);
    motion.addEventListener("change", onMotionChange);
    return () => {
      cancelAnimations();
      resize.disconnect();
      summary.removeEventListener("click", onClick);
      details.removeEventListener("toggle", onToggle);
      motion.removeEventListener("change", onMotionChange);
      details.style.removeProperty("height");
    };
  }, []);

  return <details ref={detailsRef} className="supporting-details coursework-disclosure">
    <summary ref={summaryRef}>{label}<span aria-hidden="true">+</span></summary>
    <div ref={contentRef} className="coursework-content">
      {groups.map(group => <div className="coursework-group" key={group.label}>
        <h4>{group.label}</h4>
        <ul>{group.courses.map(course => <li key={course}>{course}</li>)}</ul>
      </div>)}
    </div>
  </details>;
}
