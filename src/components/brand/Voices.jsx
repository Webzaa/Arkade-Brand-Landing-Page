import { useEffect, useState } from "react";
import { testimonials as T } from "@/data/arkade";
import { Lines, Arrow } from "./ui";

export const Voices = () => {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const go = (n) => setI((n + T.length) % T.length);

  useEffect(() => {
    if (hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setTimeout(() => setI((x) => (x + 1) % T.length), 9000);
    return () => clearTimeout(id);
  }, [i, hover]);

  const t = T[i];
  return (
    <section id="voices" data-chapter="voices" className="bl-section" aria-labelledby="vo-t">
      <div className="bl-wrap bl-voices-grid">
        <div className="bl-voices-head">
          <p className="bl-eyebrow bl-rv">In their words</p>
          <Lines id="vo-t" className="bl-h2" lines={["Voices from", "*our families.*"]} />
        </div>
        <div className="bl-voices-main" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="bl-qmark" aria-hidden>“</div>
          <blockquote className="bl-quote" key={i} aria-live="polite">{t.quote}</blockquote>
          <div className="bl-who" key={`w${i}`}>
            <div><b>{t.name}</b><span>{t.project}</span></div>
          </div>
          <div className="bl-voices-ctrl">
            <div className="bl-ctrl">
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous testimonial"><Arrow dir="l" /></button>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next testimonial"><Arrow dir="r" /></button>
            </div>
            <span className="bl-voices-count">0{i + 1} / 0{T.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
