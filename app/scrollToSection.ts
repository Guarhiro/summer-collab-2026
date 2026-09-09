import type { MouseEvent } from "react";

export function scrollToSection(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented || event.button !== 0 ||
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  ) return;

  const hash = event.currentTarget.hash;
  const section = document.getElementById(hash.slice(1));
  if (!section) return;

  // Native fragment navigation also fires popstate, which the app router
  // handles as a page navigation. Keep this jump within the current document.
  event.preventDefault();
  if (window.location.hash !== hash) {
    window.history.pushState(window.history.state, "", hash);
  }
  const margin = Number.parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;
  window.scrollTo({
    top: window.scrollY + section.getBoundingClientRect().top - margin,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
