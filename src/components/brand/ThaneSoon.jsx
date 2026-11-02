import { useEffect, useRef } from "react";
import { thaneSoon as t } from "@/data/arkade";
import { scrollToId } from "@/lib/gsap";
import { Lines, Arrow } from "./ui";

const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const seg = (p, a, b) => clamp((p - a) / (b - a));

/**
 * "Coming soon to Thane": a pinned intro that, as you scroll, opens (circular reveal) onto the
 * Thane opportunity. Scroll progress feeds CSS variables (--a intro out, --b circle, --c content),
 * so there is no animation dependency; with reduced motion it renders as a plain static layout.
 */
export const ThaneSoon = () => {
  const track = useRef(null);
  const stage = useRef(null);

  useEffect(() => {
    const tr = track.current;
    const st = stage.current;
    if (!tr || !st || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    tr.classList.add("bl-cs-anim");
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = tr.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = clamp(-r.top / span);
      const b = seg(p, 0.12, 0.6);
      st.style.setProperty("--a", seg(p, 0, 0.3).toFixed(4));
      st.style.setProperty("--b", b.toFixed(4));
      st.style.setProperty("--c", seg(p, 0.55, 0.9).toFixed(4));
      st.dataset.open = b > 0 ? "1" : "0";
    };
    const tick = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      cancelAnimationFrame(raf);
      tr.classList.remove("bl-cs-anim");
    };
  }, []);

  return (
    <section id="thane" data-chapter="thane" className="bl-cs" aria-labelledby="cs-t">
      <div className="bl-cs-track" ref={track}>
        <div className="bl-cs-stage" ref={stage} data-open="0">
          <span className="bl-cs-ghost" aria-hidden>{t.ghost}</span>

          <div className="bl-cs-intro">
            <p className="bl-eyebrow bl-rv">{t.intro.eyebrow}</p>
            <Lines id="cs-t" className="bl-h2 bl-cs-h" lines={t.intro.lines} />
            <span className="bl-cs-rule bl-rv" aria-hidden><i /></span>
            <span className="bl-cs-cue" aria-hidden>{t.intro.hint}<b /></span>
          </div>

          <div className="bl-cs-reveal">
            {/* <div className="bl-cs-bg" aria-hidden>
              <img src={t.image} alt="" loading="lazy" decoding="async" />
            </div> */}
            <div className="bl-cs-body">
              <div className="bl-cs-copy">
                <p className="bl-eyebrow" data-cs style={{ "--i": 0 }}>{t.eyebrow}</p>
                <h3 className="bl-h2 bl-cs-title" data-cs style={{ "--i": 1 }}>
                  {t.title.map((l, i) => (
                    <span key={i} className="bl-cs-tl">{l.startsWith("*") ? <em>{l.slice(1, -1)}</em> : l}</span>
                  ))}
                </h3>
                <span className="bl-cs-rule bl-cs-rule--l" aria-hidden data-cs style={{ "--i": 2 }}><i /></span>
                <p className="bl-cs-text" data-cs style={{ "--i": 2 }}>{t.text}</p>
                <button type="button" className="bl-btn" data-cs style={{ "--i": 3 }} onClick={() => scrollToId("contact-us")}>
                  {t.cta}<Arrow />
                </button>
              </div>

              <div className="bl-cs-bar" data-cs style={{ "--i": 4 }}>
                <ul className="bl-cs-stats">
                  {t.stats.map((x) => (
                    <li key={x.label}><b>{x.value}</b><span>{x.label}</span><small>{x.note}</small></li>
                  ))}
                  <li className="bl-cs-panel"><span>{t.panel.label}</span><strong>{t.panel.title}</strong></li>
                </ul>
                {/* <p className="bl-cs-src"><b>Source</b>{t.source}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
