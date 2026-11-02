import { cn } from "@/lib/utils";
import { brand } from "@/data/brochure";

const ticks = [-162, -138, -114, -90, -66, -42, -18];

export const ArkadeMark = ({ className, accent = "currentColor", title }) => (
  <svg viewBox="0 0 48 48" className={cn("h-7 w-7", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
    {title && <title>{title}</title>}
    {ticks.map((a) => {
      const r = (a * Math.PI) / 180;
      return (
        <line
          key={a}
          x1={24 + Math.cos(r) * 13.5}
          y1={25 + Math.sin(r) * 13.5}
          x2={24 + Math.cos(r) * 19.5}
          y2={25 + Math.sin(r) * 19.5}
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
      );
    })}
    <path d="M6.5 29 A18 18 0 0 0 41.5 29" fill="none" stroke={accent} strokeWidth="5.5" strokeLinecap="round" />
  </svg>
);

export const Wordmark = ({ className, accent, showLine = true }) => (
  <span className={cn("inline-flex items-center gap-3", className)}>
    {/* <ArkadeMark accent={accent} /> */}
    <img src={brand.brandLogo.src} alt={brand.brandLogo.alt} />
    {showLine && (
      <>
        <span className="h-4 w-px bg-current opacity-50" aria-hidden />
        <span className="font-sans text-[11px] font-medium tracking-[0.28em]">FAMILY FIRST</span>
      </>
    )}
  </span>
);
