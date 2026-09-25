import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 1,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: 0,
      duration: 1.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { duration: 2.2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
