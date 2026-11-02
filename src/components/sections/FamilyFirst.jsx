import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { ArkadeMark } from "@/components/ui/ArkadeMark";

export const FamilyFirst = () => {
  const ref = useScrollAnimation((mm, el) => {
    gsap.fromTo(".ff-type", { scale: 0.86, yPercent: 10 }, { scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center center", scrub: true } });
  });
  return (
    <section ref={ref} data-chapter="arkade" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ivory px-5 py-24 text-ink sm:px-8 lg:px-12 xl:pl-20" aria-labelledby="ff-title">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.34em] text-gold-light">Four decades. One enduring belief.</p>
      <div className="ff-type origin-left">
        <MaskedLines id="ff-title" lines={["Family", "First."]} stagger={0.18} className="font-display text-[clamp(5rem,19vw,19rem)] leading-[0.86] tracking-[-0.03em] text-gold" lineClassName="[&]:pb-[0.04em]" />
      </div>
      <Reveal className="flex flex-wrap items-end justify-between gap-8">
        <div className="flex items-center gap-5">
          <ArkadeMark className="h-14 w-14 text-ink" accent="#BD9C68" />
          <span className="font-sans text-2xl font-bold tracking-[0.3em] lg:text-3xl">ARKADE</span>
        </div>
        <p className="max-w-sm font-display text-2xl italic text-ink/90 lg:text-3xl">The shape of Thane to come.</p>
      </Reveal>
    </section>
  );
};
