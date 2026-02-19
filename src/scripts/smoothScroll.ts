import Lenis from "lenis";

export function initSmoothScroll() {
  if (typeof window === "undefined") return;

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // DEBUG visual en consola
  console.log("Lenis iniciado");
}