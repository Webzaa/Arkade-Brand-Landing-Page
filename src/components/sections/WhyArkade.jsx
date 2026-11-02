import { whyArkade } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Stagger } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";

export const WhyArkade = () => {
  const ref = useScrollAnimation((mm, el) => {
    gsap.fromTo(".why-img", { yPercent: -10, scale: 1.1 }, { yPercent: 6, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={ref} id="arkade" data-chapter="arkade" className="relative min-h-[115vh] overflow-hidden bg-paper" aria-labelledby="why-title">
      <img src={whyArkade.image} alt={whyArkade.alt} loading="lazy" className="why-img absolute inset-0 h-full w-full object-cover object-[50%_70%]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,241,232,0.96)_0%,rgba(245,241,232,0.85)_42%,rgba(245,241,232,0)_75%)] lg:bg-[linear-gradient(90deg,rgba(245,241,232,0)_30%,rgba(245,241,232,0.9)_62%),linear-gradient(180deg,rgba(245,241,232,0.7)_0%,rgba(245,241,232,0)_60%)]" aria-hidden />
      <div className="relative mx-auto max-w-[1680px] px-5 pb-[45vh] pt-28 sm:px-8 lg:px-12 lg:pb-32 lg:pt-36">
        <div className="lg:ml-auto lg:w-[44%]">
          <ChapterTag index="05" label="Why Arkade" />
          <MaskedLines id="why-title" lines={["Why Arkade", "chose Thane"]} className="mt-6 font-display text-section text-ink" />
          <Stagger items={whyArkade.lines} className="mt-10 max-w-lg space-y-4" itemClassName="font-sans text-base leading-relaxed text-ink lg:text-[17px] [&:nth-child(2)]:font-display [&:nth-child(2)]:text-3xl [&:nth-child(2)]:italic [&:nth-child(2)]:text-gold-deep" />
        </div>
      </div>
      <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/90">REPRESENTATIVE IMAGE</span>
    </section>
  );
};
