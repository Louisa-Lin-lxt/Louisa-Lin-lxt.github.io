// One object travels into its resting place; the page itself never waits for it.
export function createHolidayEntrance(element: HTMLDivElement) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let animation: Animation | undefined;
  let automaticCancelled = false;

  const finish = () => {
    animation?.cancel();
    animation = undefined;
    element.dataset.phase = "docked";
  };

  const play = (automatic = false) => {
    finish();
    if (motion.matches || (automatic && (automaticCancelled || window.scrollY > 80))) return;
    const photo = element.parentElement?.getBoundingClientRect();
    if (!photo) return;
    const dock = element.getBoundingClientRect();
    const mobile = window.innerWidth <= 700;
    const size = Math.min(window.innerWidth < 1100 ? 440 : 580, window.innerWidth - 32, (window.innerHeight - 112) * dock.width / dock.height);
    const scale = size / dock.width;
    const destinationX = mobile ? photo.left + photo.width * .45 : photo.left + (window.innerWidth < 1100 ? 24 : -65);
    const centerX = Math.max(size / 2 + 16, Math.min(window.innerWidth - size / 2 - 16, destinationX));
    const halfHeight = dock.height * scale / 2;
    const centerY = Math.max(80 + halfHeight, Math.min(window.innerHeight - halfHeight - 16, photo.top + (mobile ? -30 : 50)));
    const x = centerX - (dock.left + dock.width / 2);
    const y = centerY - (dock.top + dock.height / 2);
    const enlarged = `translate(${x}px, ${y}px) scale(${scale})`;
    element.dataset.phase = "entering";
    animation = element.animate([
      { transform: `translate(${x}px, ${y - 26}px) scale(${scale * .94})`, opacity: 0, offset: 0, easing: "cubic-bezier(.2,.7,.2,1)" },
      { transform: enlarged, opacity: 1, offset: .18 },
      { transform: enlarged, opacity: 1, offset: .48, easing: "cubic-bezier(.45,0,.12,1)" },
      { transform: "none", opacity: 1, offset: 1 },
    ], { duration: 3200, fill: "both" });
    animation.onfinish = finish;
  };

  const interrupt = () => { automaticCancelled = true; finish(); };
  const key = (event: KeyboardEvent) => { if (event.key === "Escape") interrupt(); };
  // Navigating or changing the viewport immediately puts the decoration away.
  window.addEventListener("scroll", interrupt, { passive: true });
  window.addEventListener("resize", interrupt);
  window.addEventListener("keydown", key);
  motion.addEventListener("change", interrupt);
  return {
    play, finish,
    dispose() {
      finish();
      window.removeEventListener("scroll", interrupt);
      window.removeEventListener("resize", interrupt);
      window.removeEventListener("keydown", key);
      motion.removeEventListener("change", interrupt);
    },
  };
}
