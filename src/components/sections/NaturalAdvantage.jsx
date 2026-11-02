import { reasons } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Stagger } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

const Reason = ({ r, flip }) => (
  <article className="reason relative" aria-labelledby={`reason-${r.num}`}>
    <div className="reason-rule mx-5 h-px origin-left bg-gold/60 sm:mx-8 lg:mx-12" aria-hidden />
    <div className="mx-auto flex max-w-[1680px] items-baseline justify-between px-5 py-5 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/60 sm:px-8 lg:px-12">
      <span>No. {r.num}</span>
      <span className="hidden sm:inline">The Transformation</span>
    </div>
    <div className="mx-auto grid max-w-[1680px] items-center gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:pb-32">
      <div className={cn("relative h-[56vh] overflow-hidden sm:h-[70vh] lg:col-span-7 lg:h-[82vh]", flip && "lg:order-2")}>
        <img src={r.image} alt={r.alt} loading="lazy" className="reason-img absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover" />
        <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/90">REPRESENTATIVE IMAGE</span>
      </div>
      <div className={cn("relative lg:col-span-5", flip ? "lg:order-1 lg:pr-8" : "lg:pl-4")}>
        <span className="reason-num pointer-events-none absolute -top-16 right-0 select-none font-display text-[9rem] leading-none text-gold/30 lg:-top-28 lg:text-[14rem]" aria-hidden>
          {r.num}
        </span>
        {r.eyebrow && <p className="relative font-display text-3xl italic text-gold-deep lg:text-4xl">{r.eyebrow}</p>}
        <MaskedLines id={`reason-${r.num}`} lines={[r.title]} className="relative mt-2 font-display text-section text-ink" />
        <Stagger items={r.lines} className="relative mt-8 max-w-lg space-y-4" itemClassName="font-sans text-base leading-relaxed text-ink/80 lg:text-[17px]" />
      </div>
    </div>
  </article>
);

export const NaturalAdvantage = () => {
  const ref = useScrollAnimation(() => {
    gsap.utils.toArray(".reason").forEach((row) => {
      gsap.fromTo(row.querySelector(".reason-img"), { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(row.querySelector(".reason-num"), { yPercent: 40 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(row.querySelector(".reason-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 85%" } });
    });
  });

  return (
    <section ref={ref} id="transformation" data-chapter="transformation" className="bg-ivory">
      <h2 className="sr-only">The transformation: three reasons</h2>
      {reasons.map((r, i) => <Reason key={r.num} r={r} flip={i % 2 === 1} />)}
    </section>
  );
};
