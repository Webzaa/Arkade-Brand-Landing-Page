import { useEffect, useRef, useState } from "react";

/** Masked line reveal. `*word*` becomes italic gold emphasis. */
export const Lines = ({ lines, as: Tag = "h2", id, className = "", manual = false, ready = false, delay = 0 }) => {
  const render = (s) =>
    s.split(/(\*[^*]+\*)/g).map((part, i) =>
      part.startsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part
    );
  return (
    <Tag id={id} className={`bl-mask ${className} ${manual && ready ? "in" : ""}`} data-manual={manual ? "" : undefined} style={{ "--d": delay }}>
      {lines.map((l, i) => (
        <span className="bl-line" key={i}>
          <span style={{ "--i": i }}>{render(l)}</span>
        </span>
      ))}
    </Tag>
  );
};

/** Counts up to a formatted figure like "5,500+" or "5.5+" once on screen. */
export const CountUp = ({ value, className }) => {
  const ref = useRef(null);
  const m = String(value).match(/^([\d,.]+)(.*)$/);
  const target = m ? parseFloat(m[1].replace(/,/g, "")) : 0;
  const decimals = m ? (m[1].split(".")[1] || "").length : 0;
  const comma = m ? m[1].includes(",") : false;
  const suffix = m ? m[2] : "";
  const [text, setText] = useState(String(value));

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf;
    const fmt = (n) => {
      const f = n.toFixed(decimals);
      return (comma ? Number(f).toLocaleString("en-IN") : f) + suffix;
    };
    setText(fmt(0));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1800;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        setText(p < 1 ? fmt(target * eased) : String(value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <b ref={ref} className={className} aria-label={String(value)}>
      <span aria-hidden>{text}</span>
    </b>
  );
};

export const Arrow = ({ dir = "ur" }) => {
  const d = {
    ur: "M7 17 17 7M8 7h9v9",
    r: "M5 12h14M13 6l6 6-6 6",
    l: "M19 12H5M11 6l-6 6 6 6",
  }[dir];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
};
