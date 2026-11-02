import { cn } from "@/lib/utils";

export const Marquee = ({ items, className }) => {
  const row = items.map((t, i) => (
    <span key={`${t}-${i}`} className="flex shrink-0 items-center gap-10 pr-10">
      <span>{t}</span>
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
    </span>
  ));
  return (
    <div className={cn("relative overflow-hidden", className)} aria-label={items.join(", ")}>
      <div className="marquee-track flex w-max" aria-hidden>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
};
