import { residentialValues as rv } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const pct = (v) => `${(v / rv.max) * 100}%`;
const fmt = (n) => n.toLocaleString("en-IN");

const Bar = ({ b, i }) => (
  <div className="relative flex h-full flex-1 flex-col justify-end" data-testid={`values-bar-${i}`}>
    {b.premium && (
      <div className="v-label absolute inset-x-[14%] border border-dashed border-gold-deep/70" style={{ bottom: pct(b.premium.min), height: `calc(${pct(b.premium.maxV)} - ${pct(b.premium.min)})` }}>
        <div className="absolute bottom-full right-0 mb-2 w-max text-right font-sans text-[12px] font-bold leading-tight text-gold-deep lg:text-[13px]">
          {b.premium.label}
          <span className="block font-medium tracking-[0.08em]">PER SQ.FT.</span>
          <span className="block font-medium tracking-[0.08em]">PREMIUM PROJECTS</span>
        </div>
      </div>
    )}
    <div className="relative mx-[14%]" style={{ height: pct(b.maxV) }}>
      <div className="v-bar absolute inset-0 origin-bottom" style={{ background: b.tone }}>
        <div className="absolute inset-x-0 border-t border-dashed border-ivory/80" style={{ bottom: `${(b.min / b.maxV) * 100}%` }} aria-hidden />
      </div>
      <div className={b.premium ? "v-label absolute inset-x-0 top-3 px-2 font-sans text-[12px] font-bold leading-tight text-ink lg:text-[13px]" : "v-label absolute bottom-full mb-2 w-max font-sans text-[12px] font-bold leading-tight text-gold-deep lg:text-[13px]"}>
        {b.label}
        <span className="block font-medium tracking-[0.08em]">{b.unit}</span>
      </div>
    </div>
  </div>
);

export const ValuesChart = () => {
  const ref = useScrollAnimation((mm, el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 65%", scrub: 1 } });
    tl.fromTo(".v-grid", { scaleX: 0 }, { scaleX: 1, stagger: 0.05, ease: "power3.out" })
      .fromTo(".v-bar", { scaleY: 0 }, { scaleY: 1, stagger: 0.35, ease: "power3.out" }, 0.2)
      .fromTo(".v-label", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.3, ease: "power3.out" }, 0.6);
  });

  return (
    <figure ref={ref} className="w-full" aria-labelledby="values-caption">
      <figcaption id="values-caption" className="sr-only">
        Average price per sq.ft.: {rv.bars.map((b) => `${b.period} ${b.years}: ${b.label} per sq.ft.${b.premium ? `; premium projects ${b.premium.label} per sq.ft.` : ""}`).join(". ")}
      </figcaption>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/70">{rv.axisLabel}</p>
      <div className="relative mt-16 flex h-[380px] pl-14 sm:h-[460px] lg:h-[520px]" aria-hidden>
        {rv.ticks.map((t) => (
          <div key={t} className="absolute left-14 right-0" style={{ bottom: pct(t) }}>
            <div className="v-grid h-px origin-left border-t border-dashed border-ink/20" />
            <span className="absolute -left-14 -translate-y-1/2 font-sans text-[12px] text-ink/70">{fmt(t)}</span>
          </div>
        ))}
        <div className="absolute bottom-0 left-14 right-0 h-px bg-ink/50" />
        <div className="absolute bottom-0 left-14 top-0 w-px bg-ink/50" />
        <div className="relative z-10 flex h-full w-full">
          {rv.bars.map((b, i) => <Bar key={b.period} b={b} i={i} />)}
        </div>
      </div>
      <div className="mt-6 flex pl-14" aria-hidden>
        {rv.bars.map((b) => (
          <div key={b.period} className="flex-1 px-[14%] pr-2 sm:pr-4">
            <p className="font-sans text-[12px] font-bold text-ink lg:text-[13px]">{b.period}</p>
            <p className="font-sans text-[12px] font-semibold text-gold-deep">{b.years}</p>
            <p className="mt-2 hidden font-sans text-[13px] leading-snug text-ink/75 sm:block">{b.note}</p>
          </div>
        ))}
      </div>
    </figure>
  );
};
