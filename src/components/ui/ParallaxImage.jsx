import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Image frame with scroll-scrubbed parallax and a one-shot clip-path + zoom reveal.
 * The wrapper owns the size (pass height/aspect via className); the image is
 * oversized inside it so it can drift without exposing edges.
 */
export const ParallaxImage = ({ src, alt, className, imgClassName, amount = 7, reveal = true, loading = "lazy", children }) => {
  const wrap = useRef(null);
  const layer = useRef(null);
  const img = useRef(null);

  useEffect(() => {
    const w = wrap.current;
    if (!w || reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(layer.current, { yPercent: -amount }, { yPercent: amount, ease: "none", scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true } });
      if (reveal) {
        gsap.fromTo(w, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut", clearProps: "clipPath", scrollTrigger: { trigger: w, start: "top 90%", once: true } });
        gsap.fromTo(img.current, { scale: 1.16 }, { scale: 1, duration: 2.4, ease: "power3.out", scrollTrigger: { trigger: w, start: "top 90%", once: true } });
      }
    }, w);
    return () => ctx.revert();
  }, [amount, reveal]);

  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)}>
      <div ref={layer} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
        <img ref={img} src={src} alt={alt} loading={loading} className={cn("h-full w-full object-cover will-change-transform", imgClassName)} />
      </div>
      {children}
    </div>
  );
};
