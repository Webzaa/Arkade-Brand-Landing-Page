import { ArrowRight } from "lucide-react";
import { axis } from "@/data/brochure";
import { gsap, scrollToId } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Stagger } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";

export const ResidentialAxis = () => {
  const ref = useScrollAnimation((mm, el) => {
    mm.add("(min-width: 1024px)", () => {
      const panel = el.querySelector(".axis-panel");
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=140%", scrub: 1, pin: true, invalidateOnRefresh: true } });
      tl.fromTo(panel, { x: () => window.innerWidth - panel.offsetWidth - panel.offsetLeft - 64 }, { x: 0, ease: "power2.inOut" }, 0)
        .fromTo(".axis-img", { scale: 1.18 }, { scale: 1, ease: "none" }, 0)
        .fromTo(".axis-word", { xPercent: 10 }, { xPercent: -30, ease: "none" }, 0);
    });
  });

  return (
    <section ref={ref} data-chapter="transformation" className="relative overflow-hidden bg-ivory lg:h-screen" aria-labelledby="axis-title">
      <div className="relative h-[72vh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <img src={axis.image} alt={axis.alt} loading="lazy" className="axis-img absolute inset-0 h-full w-full object-cover object-[62%_50%]" />
        <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/90">REPRESENTATIVE IMAGE</span>
      </div>
      <p className="axis-word pointer-events-none absolute bottom-[-0.12em] left-0 hidden select-none whitespace-nowrap font-display text-[16vw] italic leading-none text-ink/25 lg:block" aria-hidden>
        Kasarvadavali
      </p>
      <div className="relative z-10 -mt-28 px-5 pb-16 sm:px-8 lg:absolute lg:inset-y-0 lg:left-0 lg:mt-0 lg:flex lg:items-center lg:px-12 lg:pb-0 xl:pl-20">
        <div className="axis-panel bg-ivory p-8 sm:p-12 lg:w-[min(520px,40vw)] lg:p-14">
          <ChapterTag index="02" label="The next axis" />
          <p className="mt-8 font-display text-3xl italic text-ink">{axis.eyebrow}</p>
          <MaskedLines id="axis-title" lines={axis.title} className="mt-1 font-display text-[clamp(2.25rem,3.6vw,3.75rem)] leading-[1.02] text-gold-deep" />
          <Stagger items={axis.lines} className="mt-8 space-y-3" itemClassName="font-sans text-[15px] leading-relaxed text-ink/80 lg:text-base" />
          <button type="button" onClick={() => scrollToId("register")} data-testid="axis-register-link" className="group mt-10 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ink">
            <span className="link-underline pb-1">Register your interest</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};
