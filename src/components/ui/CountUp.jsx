import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const parse = (value) => {
  const m = value.match(/^([\d,.]+)(.*)$/);
  if (!m) return null;
  const raw = m[1];
  return { num: parseFloat(raw.replace(/,/g, "")), decimals: (raw.split(".")[1] || "").length, comma: raw.includes(","), suffix: m[2] };
};

const format = (n, p) => {
  const fixed = n.toFixed(p.decimals);
  return (p.comma ? Number(fixed).toLocaleString("en-IN") : fixed) + p.suffix;
};

// Counts up to the exact brochure figure; final value is always exposed to assistive tech.
export const CountUp = ({ value, plain, className, testId }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const p = plain ? null : parse(value);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!p || reduce || !inView) return undefined;
    const controls = animate(0, p.num, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setText(format(v, p)), onComplete: () => setText(value) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className} data-testid={testId} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
};
