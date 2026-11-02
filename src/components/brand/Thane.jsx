import { useEffect, useRef } from "react";
import { thane as t } from "@/data/arkade";
import { gsap, ScrollTrigger, scrollToId } from "@/lib/gsap";
import { Lines, Arrow } from "./ui";

/* Two route drawings: a wide one laid over the photo on desktop, and a compact one for phones. */
const GEO = {
  wide: {
    vb: [1600, 900],
    d: "M210 430 C 480 560, 760 200, 1040 300 S 1290 350, 1380 220",
    a: [210, 430], b: [1380, 220],
    aLabel: { x: 210, y: 372, anchor: "start", big: 30, small: 15 },
    bLabel: { x: 1380, y: 158, anchor: "middle", big: 46 },
    road: { size: 15, dy: -14, offset: "46%", spacing: "0.22em" },
  },
  narrow: {
    vb: [400, 160],
    d: "M34 112 C 120 146, 270 104, 366 46",
    a: [34, 112], b: [366, 46],
    aLabel: { x: 34, y: 142, anchor: "start", big: 17, small: 11 },
    bLabel: { x: 366, y: 22, anchor: "end", big: 22 },
    road: { size: 9.5, dy: -8, offset: "24%", spacing: "0.14em" },
  },
};

const Route = ({ kind }) => {
  const g = GEO[kind];
  const id = `th-path-${kind}`;
  const r = kind === "wide" ? 1 : 0.38;
  return (
    <svg className={`bl-th-route bl-th-route--${kind}`} viewBox={`0 0 ${g.vb[0]} ${g.vb[1]}`} aria-hidden focusable="false">
      <path className="bl-th-guide" d={g.d} />
      <path className="bl-th-line" id={id} d={g.d} pathLength="1" />

      <text className="bl-th-road" fontSize={g.road.size} dy={g.road.dy} letterSpacing={g.road.spacing}>
        <textPath href={`#${id}`} startOffset={g.road.offset}>{t.route.road}</textPath>
      </text>

      <g transform={`translate(${g.a[0]} ${g.a[1]})`}>
        <g className="bl-th-pop bl-th-pop--a">
          <circle r={15 * r} className="bl-th-ring" />
          <circle r={5.5 * r} className="bl-th-dotfill" />
        </g>
      </g>
      <g className="bl-th-label bl-th-label--a">
        <text x={g.aLabel.x} y={g.aLabel.y} textAnchor={g.aLabel.anchor} className="bl-th-city" fontSize={g.aLabel.big}>{t.route.from}</text>
        <text x={g.aLabel.x} y={g.aLabel.y + g.aLabel.small * 1.7} textAnchor={g.aLabel.anchor} className="bl-th-note" fontSize={g.aLabel.small}>{t.route.fromNote}</text>
      </g>

      <g transform={`translate(${g.b[0]} ${g.b[1]})`}>
        <g className="bl-th-pop bl-th-pop--b">
          <circle r={12 * r} className="bl-th-pulse" />
          <circle r={12 * r} className="bl-th-pulse bl-th-pulse--2" />
          <circle r={13 * r} className="bl-th-pinfill" />
          <circle r={4.5 * r} className="bl-th-pincore" />
        </g>
      </g>
      <g className="bl-th-label bl-th-label--b">
        <text x={g.bLabel.x} y={g.bLabel.y} textAnchor={g.bLabel.anchor} className="bl-th-city bl-th-city--to" fontSize={g.bLabel.big}>{t.route.to}</text>
      </g>
    </svg>
  );
};

export const Thane = () => {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia();

    // Desktop only: the arch photo expands to full-bleed as you scroll through a sticky stage.
    // On phones and with reduced motion, the section stays as a finished, static layout.
    mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      el.classList.add("bl-th-anim");
      const $ = (s) => el.querySelector(s);
      const route = $(".bl-th-route--wide");
      const line = route.querySelector(".bl-th-line");
      const popA = route.querySelector(".bl-th-pop--a");
      const popB = route.querySelector(".bl-th-pop--b");
      const labA = route.querySelector(".bl-th-label--a");
      const labB = route.querySelector(".bl-th-label--b");
      const road = route.querySelector(".bl-th-road");
      const frame = $(".bl-th-frame");
      const img = $(".bl-th-frame img");
      const shade = $(".bl-th-shade");
      const ghost = $(".bl-th-ghost");
      const items = el.querySelectorAll("[data-th]");

      // Arch -> full-bleed. The clip-path string is built by hand (not tweened by GSAP) so every
      // corner radius stays intact. Arch width is 38% of the stage, so its radius is 19% of the width.
      const r0 = window.innerWidth * 0.19;
      const k = { p: 0 };
      const paint = () => {
        const q = 1 - k.p;
        const rad = (r0 * q).toFixed(1);
        frame.style.clipPath = `inset(${(12 * q).toFixed(3)}% ${(31 * q).toFixed(3)}% ${(7 * q).toFixed(3)}% ${(31 * q).toFixed(3)}% round ${rad}px ${rad}px 0px 0px)`;
      };
      paint();

      gsap.set(img, { scale: 1.32 });
      gsap.set(shade, { opacity: 0 });
      gsap.set(ghost, { xPercent: -42, yPercent: -50 });
      gsap.set(route, { color: "#25251f" });
      gsap.set(line, { strokeDashoffset: 1 });
      gsap.set([popA, popB], { scale: 0, transformOrigin: "50% 50%" });
      gsap.set([labA, labB, road], { opacity: 0 });
      gsap.set(items, { opacity: 0, y: 44 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true },
      });

      tl
        // 1 · the route draws from Kandivali to Thane
        .to(popA, { scale: 1, duration: 0.5, ease: "back.out(2.2)" }, 0)
        .to(labA, { opacity: 1, duration: 0.6 }, 0.25)
        .to(line, { strokeDashoffset: 0, duration: 3.2 }, 0.2)
        .to(road, { opacity: 1, duration: 0.7 }, 1.5)
        .to(popB, { scale: 1, duration: 0.7, ease: "back.out(2.6)" }, 3.1)
        .to(labB, { opacity: 1, duration: 0.7 }, 3.2)
        .to(ghost, { xPercent: -58, duration: 7 }, 0)
        // 2 · the arch opens into the full skyline
        .to(k, { p: 1, duration: 3.6, ease: "power2.inOut", onUpdate: paint }, 3.9)
        .to(img, { scale: 1, duration: 3.8, ease: "power2.out" }, 3.9)
        .to(ghost, { opacity: 0, duration: 1.8 }, 4.2)
        .to(shade, { opacity: 1, duration: 2.6 }, 4.6)
        .to(route, { color: "#f7f5ef", duration: 1.6 }, 5)
        .to(line, { stroke: "#f7f5ef", duration: 1.6 }, 5)
        // 3 · the message lands
        .to(items, { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power3.out" }, 7.4)
        .to({}, { duration: 1.2 }); // hold on the finished frame

      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => { cancelAnimationFrame(raf); frame.style.clipPath = ""; el.classList.remove("bl-th-anim"); };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="thane" data-chapter="thane" className="bl-section bl-th" aria-labelledby="th-t">
      <div className="bl-wrap bl-th-head">
        <div>
          <p className="bl-eyebrow bl-rv"><i className="bl-th-dot" aria-hidden />{t.eyebrow}</p>
          <Lines id="th-t" className="bl-h2" lines={t.title} />
        </div>
        <p className="bl-lead bl-rv">{t.text}</p>
      </div>

      <div className="bl-th-track" ref={track}>
        <div className="bl-th-stage">
          <span className="bl-th-ghost" aria-hidden>Thane</span>

          <div className="bl-th-frame">
            <img src={t.image} alt={t.alt} loading="lazy" decoding="async" />
            <span className="bl-th-shade" aria-hidden />
          </div>

          <Route kind="wide" />
          <Route kind="narrow" />

          <div className="bl-th-final">
            <div data-th><Lines as="h3" className="bl-th-h3" lines={t.statement} /></div>
            <button type="button" className="bl-btn" data-th onClick={() => scrollToId("contact-us")}>
              {t.cta}<Arrow />
            </button>
            <ul className="bl-th-facts">
              {t.facts.map((f) => (
                <li key={f.title} data-th><b>{f.title}</b><span>{f.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
