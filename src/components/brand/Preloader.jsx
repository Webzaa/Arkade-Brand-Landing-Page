import { useEffect, useState } from "react";
import { brand } from "@/data/arkade";

export const Preloader = ({ onDone }) => {
  const [n, setN] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let v = 0;
    let lift;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9));
      setN(v);
      if (v >= 100) {
        clearInterval(id);
        lift = setTimeout(() => setOut(true), 250);
      }
    }, reduce ? 1 : 50);
    const failsafe = setTimeout(() => setOut(true), 3600);
    return () => { clearInterval(id); clearTimeout(lift); clearTimeout(failsafe); };
  }, []);

  useEffect(() => {
    if (!out) return undefined;
    onDone?.();
    const t = setTimeout(() => setGone(true), 1300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out]);

  if (gone) return null;
  return (
    <div className={`bl-pre ${out ? "out" : ""}`} aria-hidden data-testid="preloader">
      <img src={brand.logo.src} alt="" />
      <span className="bl-pre-tag">{brand.tagline}</span>
      <span className="bl-pre-n">{n}%</span>
      <span className="bl-pre-bar" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  );
};
