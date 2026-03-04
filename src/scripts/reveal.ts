export function initReveal() {
  if (typeof window === "undefined") return;

  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!elements.length) return;

  const isMobile = window.innerWidth < 768;

  
  if (isMobile) {
    elements.forEach((el) => {
      el.classList.add("revealed");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
}