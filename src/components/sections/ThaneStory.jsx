import { thaneStory } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Stagger } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";

export const ThaneStory = () => {
  const ref = useScrollAnimation((mm, el) => {
    gsap.fromTo(".story-frame", { clipPath: "inset(10% 14% 10% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "top 15%", scrub: true } });
    gsap.fromTo(".story-img", { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={ref} id="thane" data-chapter="thane" className="relative bg-ivory pb-24 pt-16 lg:pb-40 lg:pt-28" aria-labelledby="thane-title">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 xl:pl-20">
        <div className="relative lg:sticky lg:top-24 lg:col-span-8 lg:self-start">
          <div className="story-frame relative h-[62vh] overflow-hidden sm:h-[72vh] lg:h-[84vh]">
            <img src={thaneStory.image} alt={thaneStory.alt} loading="lazy" className="story-img absolute inset-0 h-full w-full object-cover" />
            <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/90">REPRESENTATIVE IMAGE</span>
          </div>
          <ChapterTag index="01" label="Thane" className="mt-5" />
        </div>

        <div className="lg:col-span-4 lg:pt-[12vh]">
          <p className="font-display text-3xl italic text-gold-deep lg:text-4xl">{thaneStory.eyebrow}</p>
          <MaskedLines id="thane-title" lines={thaneStory.title} className="mt-3 font-display text-section text-ink" />
          <div className="mt-10 h-px w-16 bg-gold" aria-hidden />
          <Stagger items={thaneStory.lines} className="mt-10 space-y-4" itemClassName="font-sans text-base leading-relaxed text-ink/80 lg:text-[17px] [&:nth-child(7)]:mt-10 [&:nth-child(7)]:font-display [&:nth-child(7)]:text-2xl [&:nth-child(7)]:text-ink [&:nth-child(10)]:mt-10 [&:nth-child(10)]:font-display [&:nth-child(10)]:text-2xl [&:nth-child(10)]:text-ink" />
        </div>
      </div>
    </section>
  );
};
