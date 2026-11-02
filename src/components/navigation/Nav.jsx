import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { chapters } from "@/data/brochure";
import { brand } from "@/data/brochure";
import { scrollToId } from "@/lib/gsap";
import { Wordmark } from "@/components/ui/ArkadeMark";
import useActiveChapter from "@/hooks/useActiveChapter";
import { cn } from "@/lib/utils";

export const Nav = () => {
  const activeId = useActiveChapter("brand");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const lastY = useRef(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const current = chapters.find((c) => c.id === activeId) || chapters[0];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > vh * 0.5);
      const focusInside = headerRef.current && headerRef.current.contains(document.activeElement);
      setHidden(y > lastY.current && y > vh * 1.2 && !focusInside);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setOpen(false); scrollToId(id); };

  return <>
    <motion.div className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gold" style={{ scaleX: progress }} aria-hidden />
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b text-ink transition-[background-color,border-color,transform,backdrop-filter] duration-700 ease-cine",
        scrolled ? "border-ink/[.14] bg-white/[.88] backdrop-blur-xl" : "border-transparent",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1520px] items-center justify-between px-5 sm:px-8 lg:h-[76px] lg:px-12" aria-label="Primary">
        <button type="button" onClick={() => go("brand")} aria-label="Arkade, back to top"><img src={brand.brandLogo.src} alt={brand.brandLogo.alt} /></button>
        <ul className="hidden items-center gap-8 lg:flex">{chapters.map((c) => <li key={c.id}><button type="button" onClick={() => go(c.id)} aria-current={activeId === c.id ? "true" : undefined} className={cn("group flex items-baseline gap-2 font-sans text-[13.5px] font-medium transition-[opacity,color] duration-300", activeId === c.id ? "text-gold-light opacity-100" : "opacity-80 hover:text-gold-light hover:opacity-100")}><span className="font-display text-[12px] italic text-gold">{c.index}</span><span className="relative">{c.label}<span className={cn("absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-cine", activeId === c.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} /></span></button></li>)}</ul>
        {/* <div className="font-sans text-[10px] font-semibold uppercase tracking-[.28em] lg:hidden"><span className="text-gold">{current.index}</span> / {current.label}</div> */}
        <button type="button" className="p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" strokeWidth={1.4} /></button>
      </nav>
    </header>
    <AnimatePresence>{open && <motion.div className="fixed inset-0 z-[70] flex flex-col bg-ivory px-6 pb-10 pt-6 text-ink" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: .8, ease: [0.7, 0, 0.2, 1] }}><div className="flex items-center justify-between"><Wordmark accent="#C9A462" showLine={false}/><button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="p-2"><X className="h-6 w-6" strokeWidth={1.4} /></button></div><ul className="mt-16 space-y-6">{chapters.map((c, i) => <motion.li key={c.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 + i * .07, duration: .9, ease: [0.2, 0.75, 0.15, 1] }}><button type="button" onClick={() => go(c.id)} className="group flex items-baseline gap-4 text-left"><span className="font-display text-lg italic text-gold">{c.index}</span><span className="font-display text-5xl transition-colors duration-300 group-hover:text-gold-light">{c.long}</span></button></motion.li>)}</ul></motion.div>}</AnimatePresence>
  </>;
};
