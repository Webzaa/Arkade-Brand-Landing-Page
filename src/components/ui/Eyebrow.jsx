import { cn } from "@/lib/utils";

// Italic serif eyebrow, as in the cinematic reference.
export const Eyebrow = ({ children, className, light }) => (
  <p className={cn("eyebrow-serif flex items-center gap-4", light ? "text-gold-light" : "text-gold", className)}>
    <span className="h-px w-8 bg-current opacity-70" aria-hidden />
    {children}
  </p>
);

export const ChapterTag = ({ index, label, className, light }) => (
  <div className={cn("pointer-events-none select-none font-sans text-[11px] font-semibold uppercase tracking-[0.34em]", light ? "text-ink/80" : "text-ink/60", className)}>
    <span className="text-gold">{index}</span> / {label}
  </div>
);
