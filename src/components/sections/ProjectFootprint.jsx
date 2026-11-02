import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { legacy } from "@/data/brochure";

/* ------------------------------------------------------------------
   Project footprint, drawn as a Mumbai local-train style route map.

   North is up. The Western and Central/Eastern routes run south and
   merge into one trunk that ends in South Mumbai. The schematic is not
   to scale. Station positions are derived from legacy.footprint, so
   editing the data updates the map. Only the geometry below is manual.
------------------------------------------------------------------- */

const VIEW_W = 460;
const VIEW_H = 820;
const GAP = 40; // vertical distance between stations

// Both routes are the same length up to the merge point at (240, 610),
// so the two pulses arrive in South Mumbai together.
const ROUTES = {
  west: [[150, 60], [150, 520], [240, 610], [240, 790]],
  east: [[330, 60], [330, 300], [240, 390], [240, 610]],
};

// Where each region sits on the map. side: -1 labels left, 1 labels right.
const SLOTS = {
  "Western Suburbs": { route: "west", x: 150, labelY: 44, y0: 84, side: -1 },
  "Central Suburbs": { route: "east", x: 330, labelY: 44, y0: 84, side: 1 },
  "Eastern Suburbs": { route: "east", x: 330, labelY: 150, y0: 184, side: 1 },
  "South Mumbai": { route: "west", x: 240, labelY: 640, y0: 684, side: 1 },
};

const DURATION = 6000;

const segLen = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
const polyLen = (pts) => pts.slice(1).reduce((sum, p, i) => sum + segLen(pts[i], p), 0);

const pointAt = (pts, dist) => {
  let rest = dist;
  for (let i = 1; i < pts.length; i += 1) {
    const len = segLen(pts[i - 1], pts[i]);
    if (rest <= len) {
      const t = len === 0 ? 0 : rest / len;
      return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
    }
    rest -= len;
  }
  return pts[pts.length - 1];
};

// Distance along the polyline at which (x, y) sits.
const locate = (pts, x, y) => {
  let travelled = 0;
  for (let i = 1; i < pts.length; i += 1) {
    const a = pts[i - 1];
    const b = pts[i];
    const len = segLen(a, b);
    const t = Math.min(1, Math.max(0, ((x - a[0]) * (b[0] - a[0]) + (y - a[1]) * (b[1] - a[1])) / (len * len)));
    const px = a[0] + (b[0] - a[0]) * t;
    const py = a[1] + (b[1] - a[1]) * t;
    if (Math.hypot(x - px, y - py) < 0.5) return travelled + t * len;
    travelled += len;
  }
  return 0;
};

const pad = (n) => String(n).padStart(2, "0");

export const ProjectFootprint = () => {
  const reduce = useReducedMotion();
  const mapRef = useRef(null);
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = hover ?? pinned;

  const model = useMemo(() => {
    const routes = Object.entries(ROUTES).map(([key, pts]) => ({
      key,
      pts,
      len: polyLen(pts),
      d: `M${pts.map((p) => p.join(" ")).join(" L")}`,
    }));

    const regions = legacy.footprint
      .map((group, r) => ({ ...group, r, slot: SLOTS[group.region] }))
      .filter((group) => group.slot)
      .map((group) => ({
        ...group,
        stations: group.places.map((place, i) => {
          const x = group.slot.x;
          const y = group.slot.y0 + i * GAP;
          return {
            place,
            x,
            y,
            i,
            d: locate(ROUTES[group.slot.route], x, y),
            hero: place === "Thane",
          };
        }),
      }));

    const total = regions.reduce((sum, g) => sum + g.places.length, 0);
    return { routes, regions, total };
  }, []);

  /* Orchestrated moment: both routes draw south at the same speed. Each
     station lights up as the pulse reaches it, the counter ticks with
     them, and the routes merge into the trunk toward South Mumbai. */
  useEffect(() => {
    const svg = svgRef.current;
    const wrap = mapRef.current;
    if (!svg || !wrap) return undefined;

    const routes = {};
    model.routes.forEach((rt) => {
      routes[rt.key] = {
        len: rt.len,
        pts: rt.pts,
        line: svg.querySelector(`[data-route="${rt.key}"]`),
        head: svg.querySelector(`[data-head="${rt.key}"]`),
      };
    });
    const stations = [...svg.querySelectorAll("[data-station]")].map((el) => ({
      el,
      route: el.dataset.route,
      d: Number(el.dataset.d),
      label: el.dataset.first === "1" ? svg.querySelector(`[data-region-label="${el.dataset.r}"]`) : null,
      on: false,
    }));
    const counter = svg.querySelector("[data-count]");
    const longest = Math.max(...model.routes.map((rt) => rt.len));
    let lit = 0;
    let raf = 0;

    const render = (s) => {
      Object.values(routes).forEach((rt) => {
        const drawn = Math.min(s, rt.len);
        rt.line.style.strokeDashoffset = String(rt.len - drawn);
        const [x, y] = pointAt(rt.pts, drawn);
        rt.head.setAttribute("transform", `translate(${x} ${y})`);
        rt.head.style.opacity = s > 0 && s < rt.len ? "1" : "0";
      });
      stations.forEach((st) => {
        if (st.on) return;
        if (Math.min(s, routes[st.route].len) >= st.d) {
          st.on = true;
          st.el.dataset.on = "1";
          if (st.label) st.label.dataset.on = "1";
          lit += 1;
          counter.textContent = String(lit);
        }
      });
      if (s >= longest) svg.dataset.done = "1";
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      if (reduce) {
        render(longest);
        return;
      }
      const t0 = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - t0) / DURATION);
        render((0.5 - 0.5 * Math.cos(Math.PI * t)) * longest);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      start();
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(wrap);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [model, reduce]);

  const hoverProps = (r) => ({
    onPointerEnter: (e) => e.pointerType === "mouse" && setHover(r),
    onPointerLeave: () => setHover(null),
  });

  return (
    <div className="ak-fp">
      <div className="ak-fp-grid">
        <div className="ak-fp-copy">
          <Reveal><p className="eyebrow-serif text-gold">Project footprint</p></Reveal>
          <MaskedLines
            id="footprint-title"
            lines={["Where Arkade is", "already active"]}
            className="mt-5 font-display text-section font-medium"
          />
          <Reveal delay={0.15}>
            <p className="ak-fp-hint">Select a region to see its neighbourhoods on the map.</p>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="ak-fp-legend">
              {model.regions.map((g) => (
                <li key={g.region}>
                  <button
                    type="button"
                    aria-pressed={pinned === g.r}
                    onClick={() => setPinned((p) => (p === g.r ? null : g.r))}
                    onFocus={(e) => e.target.matches(":focus-visible") && setHover(g.r)}
                    onBlur={() => setHover(null)}
                    {...hoverProps(g.r)}
                    data-current={active === g.r ? "1" : undefined}
                  >
                    <span className="ak-fp-legend-name">{g.region}</span>
                    <span className="ak-fp-legend-count">{pad(g.places.length)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="ak-fp-map" ref={mapRef}>
          <svg
            ref={svgRef}
            className="ak-fp-svg"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            aria-hidden="true"
            focusable="false"
            data-active={active ?? undefined}
          >
            <text className="ak-fp-sea" transform="translate(22 440) rotate(-90)" textAnchor="middle">Arabian Sea</text>

            {model.routes.map((rt) => (
              <g key={rt.key}>
                <path className="ak-fp-track" d={rt.d} />
                <path
                  className="ak-fp-route"
                  d={rt.d}
                  data-route={rt.key}
                  strokeDasharray={rt.len}
                  strokeDashoffset={rt.len}
                />
              </g>
            ))}
            <path className="ak-fp-buffer" d="M226 793 H254" />

            {model.regions.map((g) => (
              <g key={g.region}>
                <text
                  className="ak-fp-item ak-fp-region"
                  data-r={g.r}
                  data-region-label={g.r}
                  x={g.slot.x + g.slot.side * 14}
                  y={g.slot.labelY}
                  textAnchor={g.slot.side < 0 ? "end" : "start"}
                >
                  {g.region}
                </text>

                {g.stations.map((st) => (
                  <g
                    key={st.place}
                    className={`ak-fp-item ak-fp-station${st.hero ? " ak-fp-station--hero" : ""}`}
                    transform={`translate(${st.x} ${st.y})`}
                    data-station
                    data-r={g.r}
                    data-route={g.slot.route}
                    data-d={st.d}
                    data-first={st.i === 0 ? "1" : "0"}
                    {...hoverProps(g.r)}
                  >
                    {st.hero && <circle className="ak-fp-halo" r="11" />}
                    <circle className="ak-fp-ripple" r={st.hero ? 11 : 7.5} />
                    <circle className="ak-fp-ring" r={st.hero ? 11 : 7.5} />
                    <circle className="ak-fp-dot" r={st.hero ? 4.5 : 3} />
                    <text
                      className="ak-fp-place"
                      x={g.slot.side * (st.hero ? 22 : 18)}
                      y="0"
                      dy="0.36em"
                      textAnchor={g.slot.side < 0 ? "end" : "start"}
                      style={{ "--shift": `${g.slot.side * -10}px` }}
                    >
                      {st.place}
                    </text>
                  </g>
                ))}
              </g>
            ))}

            <text className="ak-fp-big" x="262" y="540" data-count>0</text>
            <text className="ak-fp-bigcap" x="266" y="570">neighbourhoods</text>
            <text className="ak-fp-bigcap" x="266" y="592">across {model.regions.length} regions</text>

            {model.routes.map((rt) => (
              <g key={rt.key} className="ak-fp-head" data-head={rt.key} style={{ opacity: 0 }}>
                <circle r="17" className="ak-fp-head-halo" />
                <circle r="5.5" className="ak-fp-head-core" />
              </g>
            ))}
          </svg>

          <ul className="sr-only">
            {model.regions.map((g) => (
              <li key={g.region}>{g.region}: {g.places.join(", ")}</li>
            ))}
          </ul>
        </div>
      </div>

      <Reveal delay={0.2}>
        <p className="ak-fp-note">
          Schematic, not to scale. Locations and project status are based on the supplied Arkade Thane opportunity document; project imagery is representative.
        </p>
      </Reveal>
    </div>
  );
};
