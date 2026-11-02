import { useEffect, useState } from "react";

// `routeKey` (e.g. the current pathname) re-runs the observer when the page's sections change.
export default function useActiveChapter(defaultId, routeKey) {
  const [active, setActive] = useState(defaultId);
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-chapter]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-chapter"));
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [routeKey]);
  return active;
}
