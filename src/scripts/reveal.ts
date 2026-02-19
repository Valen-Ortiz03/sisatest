export function initReveal() {
  if (typeof window === "undefined") return;

  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.revealDelay || 0);

        setTimeout(() => {
          el.classList.add("revealed");
        }, delay);

        observer.unobserve(el);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -80px 0px",
    }
  );

  elements.forEach((el, i) => {
    if (!el.dataset.revealDelay) {
      el.dataset.revealDelay = String(i * 40);
    }
    observer.observe(el);
  });

  console.log("Reveal PRO iniciado:", elements.length);
}