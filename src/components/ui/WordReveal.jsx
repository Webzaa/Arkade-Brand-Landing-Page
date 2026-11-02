import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

/** Word-by-word light-up driven by scroll (manifesto effect). Text is unchanged. */
export const WordReveal = ({ lines, className, lineClassName }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(".wr-word", { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: 0.6 } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className={className}>
      {lines.map((line) => (
        <p key={line} className={lineClassName}>
          {line.split(" ").map((w, i) => <span key={i} className="wr-word">{w} </span>)}
        </p>
      ))}
    </div>
  );
};
