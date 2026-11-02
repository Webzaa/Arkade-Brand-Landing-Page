import { useEffect, useRef } from "react";
import { philosophy as p } from "@/data/arkade";
import { gsap, reducedMotion } from "@/lib/gsap";

const words = (line) => line.split(" ").map((w, j) => <span className="w" key={j}>{w} </span>);

export const Philosophy = () => {
  const ref = useRef(null);
  const [intro, key, lede, body] = p.lines;
  const founders = p.founders.replace(/^Built by\s*/i, "").split(" and ").map((n) => n.replace(/ /g, "\u00A0")).join(" and ");

  // Word-by-word light-up as the statement scrolls through.
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(".bl-manifesto .w", { opacity: 0.18 }, {
        opacity: 1, ease: "none", stagger: 0.12,
        scrollTrigger: { trigger: ".bl-manifesto", start: "top 80%", end: "bottom 55%", scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" data-chapter="philosophy" className="bl-section" ref={ref} aria-labelledby="phil-t">
      <div className="bl-wrap">
        <div className="bl-phil-top">
          <div className="bl-phil-copy">
            <p className="bl-eyebrow bl-rv">{p.eyebrow}</p>
            <h2 id="phil-t" className="bl-sr">Our philosophy</h2>
            <div className="bl-manifesto">
              <p>{words(intro)}</p>
              <p className="is-key">{words(key)}</p>
              <p className="is-lede">{words(lede)}</p>
              <p>{words(body)}</p>
            </div>
          </div>

          <div className="bl-phil-art">
            <div className="bl-arch bl-reveal-img">
              <img src={p.image} alt={p.alt} loading="lazy" data-parallax />
            </div>
            <div className="bl-founders bl-rv" style={{ "--d": 300 }}>
              <small>Built by</small>
              <span>{founders}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};