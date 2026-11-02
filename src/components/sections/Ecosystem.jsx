import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ecosystem } from "@/data/brochure";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";
import { LineIcon } from "@/components/ui/LineIcon";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

const Visual = ({ active, setActive }) => (
  <div className="relative aspect-[2147/2400] w-full overflow-hidden bg-beige" data-testid="ecosystem-visual">
    <img src={ecosystem.image} alt={ecosystem.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    {ecosystem.categories.map((c) => (
      <div
        key={c.id}
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", active === c.id ? "opacity-100" : "opacity-0")}
        style={{ background: `radial-gradient(circle at ${c.spot.x}% ${c.spot.y}%, rgba(22,36,33,0) 0, rgba(22,36,33,0) 11%, rgba(22,36,33,0.58) 30%)` }}
      />
    ))}
    {ecosystem.categories.map((c) => (
      <button
        key={c.id}
        type="button"
        data-testid={`ecosystem-hotspot-${c.id}`}
        aria-label={`Highlight ${c.label}`}
        onClick={() => setActive(c.id)}
        className="group absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${c.spot.x}%`, top: `${c.spot.y}%` }}
      >
        <span className={cn("relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-ivory transition-[background-color,transform] duration-500", active === c.id ? "scale-125 bg-gold" : "bg-ivory/40")}>
          {active === c.id && <span className="pulse-ring absolute inset-0 rounded-full border border-ivory" />}
        </span>
        <span className={cn("absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap bg-ivory px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-[opacity,transform] duration-500", active === c.id ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}>
          {c.label}
        </span>
      </button>
    ))}
    <span className="absolute bottom-3 left-4 font-sans text-[11px] tracking-[0.2em] text-ink/90">REPRESENTATIVE IMAGE</span>
  </div>
);

const Category = ({ c, open, onSelect, onHover }) => (
  <li className="border-t border-gold/40 last:border-b">
    <button
      type="button"
      data-testid={`ecosystem-tab-${c.id}`}
      aria-expanded={open}
      aria-controls={`eco-panel-${c.id}`}
      onClick={() => onSelect(c.id)}
      onMouseEnter={() => onHover(c.id)}
      onFocus={() => onHover(c.id)}
      className="group flex w-full items-center gap-6 py-6 text-left"
    >
      <LineIcon name={c.icon} size="sm" className={cn("transition-colors duration-500", open && "border-gold bg-gold text-ink")} />
      <span className="flex-1">
        <span className="block font-display text-[1.9rem] leading-tight text-ink">{c.label}</span>
        <span className="mt-1 block font-sans text-sm text-ink/70">{c.summary}</span>
      </span>
      <Plus className={cn("h-5 w-5 shrink-0 text-gold-deep transition-transform duration-500", open && "rotate-45")} strokeWidth={1.3} />
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`eco-panel-${c.id}`}
          key="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="overflow-hidden"
        >
          <ul className="grid gap-x-8 gap-y-3 pb-8 pl-16 sm:grid-cols-2">
            {c.items.map((it) => (
              <li key={it} className="flex gap-3 font-sans text-[15px] text-ink/85">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-gold" aria-hidden />
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </li>
);

export const Ecosystem = () => {
  const [open, setOpen] = useState("education");
  const [hover, setHover] = useState(null);
  const active = hover || open;
  const select = (id) => { setOpen(id); setHover(null); };
  return (
    <section data-chapter="transformation" className="bg-paper py-24 lg:py-36" aria-labelledby="eco-title">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12 xl:pl-20">
        <Reveal className="lg:sticky lg:top-24 lg:col-span-6 lg:self-start">
          <Visual active={active} setActive={select} />
        </Reveal>
        <div className="lg:col-span-6 lg:pt-10">
          <ChapterTag index="02" label="Ecosystem" />
          <MaskedLines id="eco-title" lines={ecosystem.title} className="mt-6 font-display text-section text-ink" />
          <ul className="mt-14" data-testid="ecosystem-list" onMouseLeave={() => setHover(null)}>
            {ecosystem.categories.map((c) => (
              <Category key={c.id} c={c} open={open === c.id} onSelect={select} onHover={setHover} />
            ))}
          </ul>
          <p className="mt-6 font-sans text-xs text-ink/60">{ecosystem.note}</p>
        </div>
      </div>
    </section>
  );
};
