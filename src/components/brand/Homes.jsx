import { useCallback, useEffect, useRef, useState } from "react";
import { homes as h, footprint as f } from "@/data/arkade";
import { Lines, Arrow } from "./ui";

const total = f.regions.reduce((n, r) => n + r.places.length, 0);
const pad = (n) => String(n).padStart(2, "0");
// Neighbourhoods that already have a signature residence card.
const withHome = new Set(h.items.map((x) => x.area));

/**
 * Signature residences + Across the city, merged.
 * Region index (neighbourhood data) filters the project strip (project cards).
 */
export const Homes = () => {
  const strip = useRef(null);
  const [sel, setSel] = useState(-1); // -1 = all regions
  const [prog, setProg] = useState({ left: 0, width: 20 });
  const [edge, setEdge] = useState({ start: true, end: false });
  const drag = useRef({ down: false, x: 0, sl: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const region = sel < 0 ? null : f.regions[sel];
  const shown = h.items.filter((x) => !region || x.region === region.region);
  const places = region ? region.places : f.regions.flatMap((r) => r.places);

  const update = useCallback(() => {
    const el = strip.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const w = Math.min(100, (el.clientWidth / el.scrollWidth) * 100);
    setProg({ width: w, left: max > 0 ? (el.scrollLeft / max) * (100 - w) : 0 });
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // New filter → back to the first card.
  useEffect(() => {
    if (strip.current) strip.current.scrollLeft = 0;
    update();
  }, [sel, update]);

  const by = (dir) => {
    const el = strip.current;
    const card = el.querySelector(".bl-home:not([hidden])");
    if (card) el.scrollBy({ left: dir * (card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 28)), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch already scrolls natively).
  const down = (e) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { down: true, x: e.clientX, sl: strip.current.scrollLeft, moved: false };
  };
  const move = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) { d.moved = true; setDragging(true); }
    if (d.moved) strip.current.scrollLeft = d.sl - dx;
  };
  const up = () => {
    if (!drag.current.down) return;
    drag.current.down = false;
    setDragging(false);
  };

  // Centre the chosen tab inside the tab bar only (scrollIntoView would also shift the page sideways).
  const pick = (i, btn) => {
    setSel(i);
    const bar = btn.parentElement;
    if (bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: btn.offsetLeft - (bar.clientWidth - btn.offsetWidth) / 2, behavior: "smooth" });
    }
  };

  const tabs = [{ region: "All Mumbai", count: total }, ...f.regions.map((r) => ({ region: r.region, count: r.places.length }))];

  return (
    <section id="portfolio" data-chapter="homes" className="bl-section bl-sand bl-homes" aria-labelledby="homes-t">
      <div className="bl-fp-rings" aria-hidden>
        <svg viewBox="0 0 600 600" fill="none" stroke="#C2A06A" strokeWidth="1">
          {[290, 250, 210, 170, 130, 90].map((r, i) => (
            <path key={r} d={`M${300 - r} 300 A${r} ${r} 0 0 1 ${300 + r} 300`} opacity={1 - i * 0.13} />
          ))}
          <path d="M300 300 V10" opacity=".25" strokeDasharray="2 8" />
        </svg>
      </div>

      <div className="bl-wrap bl-homes-head">
        <div className="bl-homes-copy">
          <p className="bl-eyebrow bl-rv">{h.eyebrow}</p>
          <Lines id="homes-t" className="bl-h2" lines={h.title} />
          <p className="bl-lead bl-rv">{h.text}</p>
        </div>
        <div className="bl-fp-big bl-rv" style={{ "--d": 200 }}>
          <b>{total}</b><span>Neighbourhoods across Mumbai</span>
        </div>
      </div>

      <div className="bl-wrap">
        <div className="bl-regions bl-rv" role="tablist" aria-label="Filter residences by region">
          {tabs.map((t, i) => {
            const on = sel === i - 1;
            return (
              <button
                key={t.region} type="button" role="tab" id={`hm-tab-${i}`} aria-selected={on}
                aria-controls="hm-panel" className="bl-region"
                onClick={(e) => pick(i - 1, e.currentTarget)}
              >
                <i>{pad(i)}</i><b>{t.region}</b>
              </button>
            );
          })}
        </div>

        <div className="bl-hoods" key={sel} id="hm-panel" role="tabpanel" aria-labelledby={`hm-tab-${sel + 1}`}>
          <ul className="bl-places">
            {places.map((p, j) => (
              <li key={p} className={withHome.has(p) ? "has" : ""} style={{ "--i": j }}>{p}</li>
            ))}
          </ul>
          <p className="bl-hoods-key"><i aria-hidden /> Signature residence</p>
        </div>
      </div>

      <div
        className={`bl-strip ${dragging ? "drag" : ""}`}
        ref={strip}
        onScroll={update}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        role="list"
      >
        {h.items.map((x, i) => (
          <article
            className="bl-home bl-rv" style={{ "--d": i * 80 }} key={x.name} role="listitem"
            hidden={!!region && x.region !== region.region}
          >
            <div className="bl-home-img">
              <div className="bl-home-pic">
                <img src={x.image} alt={`${x.name}, ${x.place} — artistic impression`} loading="lazy" draggable={false} />
              </div>
              <span className="bl-home-n">{pad(i + 1)} / {pad(h.items.length)}</span>
            </div>
            <h3>{x.name}</h3>
            <p>{x.place}</p>
          </article>
        ))}

        {region && shown.length === 0 && (
          <div className="bl-home-empty" role="listitem">
            <span className="bl-eyebrow">{region.region}</span>
            <h3>Neighbourhood by <em>neighbourhood.</em></h3>
            <p>
              Arkade has built in {region.places.join(", ").replace(/, ([^,]*)$/, " and $1")}.
              Our signature residence showcase for this region is not on display yet.
            </p>
            <button type="button" onClick={() => setSel(-1)}>View all residences <Arrow dir="r" /></button>
          </div>
        )}
      </div>

      <div className="bl-wrap bl-strip-foot">
        <div className="bl-strip-prog" aria-hidden><i style={{ left: `${prog.left}%`, width: `${prog.width}%` }} /></div>
        <span className="bl-note">{h.note} · drag to explore</span>
        <div className="bl-ctrl">
          <button type="button" onClick={() => by(-1)} disabled={edge.start} aria-label="Previous residence"><Arrow dir="l" /></button>
          <button type="button" onClick={() => by(1)} disabled={edge.end} aria-label="Next residence"><Arrow dir="r" /></button>
        </div>
      </div>
    </section>
  );
};
