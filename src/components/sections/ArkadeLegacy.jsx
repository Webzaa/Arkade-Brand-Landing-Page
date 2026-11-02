import { motion, useReducedMotion } from "framer-motion";
import { legacy } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Reveal, Stagger } from "@/components/ui/Motion";
import { Wordmark } from "@/components/ui/ArkadeMark";
import { CountUp } from "@/components/ui/CountUp";
import { Marquee } from "@/components/ui/Marquee";

const EASE = [0.16, 1, 0.3, 1];

const Stats = () => (
  <dl className="grid grid-cols-2 border-t border-gold/50 lg:grid-cols-4" data-testid="legacy-stats">
    {legacy.stats.map((s, i) => (
      <Reveal key={s.label} delay={(i % 4) * 0.08} className="flex flex-col border-b border-gold/50 py-8 pr-4 even:pl-5 lg:border-l lg:py-12 lg:pl-8 lg:even:pl-8 lg:[&:nth-child(4n+1)]:border-l-0 lg:[&:nth-child(4n+1)]:pl-0 max-lg:odd:border-r">
        <dt className="order-2 mt-3 font-sans text-sm leading-snug text-ink/75">{s.label}</dt>
        <dd className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none text-ink">
          <CountUp value={s.value} plain={s.plain} testId={`legacy-stat-${i}`} />
        </dd>
      </Reveal>
    ))}
  </dl>
);

const Timeline = () => {
  const reduce = useReducedMotion();
  return (
    <motion.ol
      className="relative grid gap-10 border-l border-gold/60 pl-8 lg:grid-cols-4 lg:gap-8 lg:border-l-0 lg:pl-0"
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
      data-testid="legacy-timeline"
    >
      <motion.span className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gold lg:block" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: EASE } } }} aria-hidden />
      {legacy.timeline.map((t) => (
        <motion.li key={t.mark} className="relative lg:pt-12" variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }}>
          <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rotate-45 border border-gold bg-ivory lg:left-0 lg:top-0" aria-hidden />
          <p className="font-display text-4xl text-gold-deep lg:text-5xl">{t.mark}</p>
          <p className="mt-3 max-w-xs font-sans text-[15px] leading-relaxed text-ink/80">{t.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
};

export const ArkadeLegacy = () => {
  const ref = useScrollAnimation(() => {
    gsap.fromTo(".legacy-img", { yPercent: -12 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".legacy-band", start: "top bottom", end: "bottom top", scrub: true } });
  });
  const places = legacy.footprint.flatMap((r) => r.places);

  return (
    <section ref={ref} data-chapter="arkade" className="bg-ivory pt-24 lg:pt-36" aria-labelledby="legacy-title">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12 xl:pl-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Wordmark accent="#BD9C68" className="text-ink" />
            <MaskedLines id="legacy-title" lines={legacy.title} className="mt-10 font-display text-section uppercase tracking-[0.02em] text-gold-deep" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-20">
            <Stagger items={legacy.lines} className="space-y-3" itemClassName="font-sans text-base leading-relaxed text-ink/85 lg:text-[17px] [&:nth-child(2)]:font-display [&:nth-child(2)]:text-3xl [&:nth-child(2)]:italic [&:nth-child(2)]:text-gold-deep" />
            <Stagger items={legacy.closing} className="mt-8 space-y-4 border-l border-gold pl-6" itemClassName="font-sans text-base leading-relaxed text-ink lg:text-[17px]" />
          </div>
        </div>
        <div className="mt-24 lg:mt-32"><Stats /></div>
        <div className="mt-24 lg:mt-32"><Timeline /></div>
      </div>

      <div className="mt-24 border-y border-gold/40 py-8 lg:mt-32 lg:py-10">
        <Marquee items={places} className="font-display text-4xl italic text-ink lg:text-6xl" />
      </div>

      <div className="mx-auto grid max-w-[1680px] gap-10 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12 xl:pl-20" data-testid="legacy-footprint">
        {legacy.footprint.map((r) => (
          <div key={r.region}>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep">{r.region}</p>
            <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink/80">{r.places.join(" · ")}</p>
          </div>
        ))}
      </div>

      <div className="legacy-band relative h-[48vh] overflow-hidden lg:h-[70vh]">
        <img src={legacy.image} alt={legacy.alt} loading="lazy" className="legacy-img absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover object-bottom" />
        <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/90">REPRESENTATIVE IMAGE</span>
      </div>
    </section>
  );
};
