import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

// Scoped GSAP context with automatic cleanup; skipped entirely for reduced motion.
export default function useScrollAnimation(setup, deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || reducedMotion()) return undefined;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => setup(mm, ref.current), ref);
    return () => {
      mm.revert();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
