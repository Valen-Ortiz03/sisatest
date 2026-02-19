document.documentElement.classList.add("js");
import { initReveal } from "./reveal";
import { initSmoothScroll } from "./smoothScroll";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

function start() {
  initSmoothScroll();
  initReveal();
}