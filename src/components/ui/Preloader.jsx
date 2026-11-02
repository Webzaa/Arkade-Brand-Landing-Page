import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/ui/ArkadeMark";

export const Preloader = () => {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let v = 0;
    let lift;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9));
      setN(v);
      if (v >= 100) { clearInterval(id); lift = setTimeout(() => setShow(false), 250); }
    }, reduce ? 1 : 55);
    const failsafe = setTimeout(() => setShow(false), 3500);
    return () => { clearInterval(id); clearTimeout(lift); clearTimeout(failsafe); };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-ivory text-ink"
          exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.7, 0, 0.2, 1] } }}
          aria-hidden
        >
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.2, 0.75, 0.15, 1] }} className="flex flex-col items-center gap-5">
            <Wordmark className="h-100 w-100" accent="#C9A462" showLine={false} />
          </motion.div>
          <span className="font-display text-[15px] tracking-[0.08em] text-gold tabular-nums">{n}%</span>
          <span className="absolute bottom-0 left-0 h-px w-full origin-left bg-gold transition-transform duration-200" style={{ transform: `scaleX(${n / 100})` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
