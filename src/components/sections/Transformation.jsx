import { cityOwnRight } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Stagger } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";

export const Transformation = () => {
  const ref = useScrollAnimation((mm, el) => {
    gsap.fromTo(".city-frame", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "top 10%", scrub: true } });
    gsap.fromTo(".city-img", { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".city-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: el, start: "top 65%" } });
  });

  return (
    <section ref={ref} data-chapter="thane" className="bg-ivory pb-24 lg:pb-40" aria-labelledby="city-title">
      <div className="grid lg:min-h-[92vh] lg:grid-cols-12">
        <div className="relative flex flex-col justify-between gap-16 bg-[#E7ECDD] px-6 py-16 sm:px-10 lg:col-span-5 lg:px-16 lg:py-24 xl:pl-24">
          <div className="space-y-3" aria-hidden>
            {[0, 1, 2].map((i) => (
              <div key={i} className="city-rule h-px origin-left bg-ink/25" style={{ width: `${100 - i * 22}%` }} />
            ))}
          </div>
          <div>
            <ChapterTag index="01" label="A city in its own right" className="mb-8 text-ink/70" />
            <MaskedLines id="city-title" lines={["A city in", "its own right"]} className="font-display text-section text-ink" />
            <Stagger items={cityOwnRight.lines} className="mt-10 max-w-md space-y-4" itemClassName="font-sans text-base leading-relaxed text-ink lg:text-[17px] last:font-display last:text-3xl last:italic" />
          </div>
        </div>
        <div className="relative h-[62vh] overflow-hidden lg:col-span-7 lg:h-auto">
          <div className="city-frame absolute inset-0 overflow-hidden">
            <img src={cityOwnRight.image} alt={cityOwnRight.alt} loading="lazy" className="city-img absolute inset-0 h-full w-full object-cover" />
          </div>
          <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/90">REPRESENTATIVE IMAGE</span>
        </div>
      </div>
    </section>
  );
};
