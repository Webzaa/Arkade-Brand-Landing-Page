import { infrastructure } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";
import { LineIcon } from "@/components/ui/LineIcon";
import { cn } from "@/lib/utils";

const statusTone = {
  "Under construction": "bg-ivory text-ink",
  Proposed: "border border-gold-deep text-gold-deep",
  Planned: "border border-ink/40 text-ink",
};

const Milestone = ({ item, i }) => (
  <article className="infra-card relative pb-14 pl-12 lg:flex lg:h-[70vh] lg:w-[30vw] lg:min-w-[380px] lg:shrink-0 lg:flex-col lg:justify-between lg:border-l lg:border-gold/40 lg:px-10 lg:pb-0" data-testid={`infra-card-${i}`}>
    <span className="absolute -left-[6.5px] top-2 h-3 w-3 rotate-45 bg-gold lg:hidden" aria-hidden />
    <div className="flex items-start justify-between gap-6">
      <span className="font-display text-7xl leading-none text-gold/70 lg:text-[7rem]" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
      <LineIcon name={item.icon} />
    </div>
    <div className="mt-6 lg:mt-0">
      <span className={cn("inline-block px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em]", statusTone[item.status])}>{item.status}</span>
      <h3 className="mt-5 font-display text-[2rem] leading-[1.08] text-ink lg:text-[2.6rem]">{item.name}</h3>
      <p className="mt-4 max-w-sm font-sans text-[15px] leading-relaxed text-ink/80">{item.text}</p>
    </div>
  </article>
);

export const Infrastructure = () => {
  const ref = useScrollAnimation((mm, el) => {
    mm.add("(min-width: 1024px)", () => {
      const track = el.querySelector(".infra-track");
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${dist()}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
      gsap.fromTo(".infra-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true } });
    });
  });

  return (
    <section ref={ref} data-chapter="connectivity" className="relative overflow-hidden bg-paper py-24 lg:h-screen lg:py-0" aria-labelledby="infra-title">
      <div className="infra-track relative flex flex-col px-5 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:items-center lg:px-0">
        <div className="mb-14 lg:mb-0 lg:w-[42vw] lg:shrink-0 lg:pl-20 lg:pr-16">
          <ChapterTag index="03" label="Infrastructure" />
          <MaskedLines id="infra-title" lines={infrastructure.title} className="mt-6 font-display text-section text-ink" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-ink/80 lg:text-[17px]">{infrastructure.intro}</p>
            <p className="mt-10 hidden font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-deep lg:block">Scroll to move forward →</p>
          </Reveal>
        </div>
        <div className="relative border-l border-gold/50 lg:flex lg:border-l-0">
          {infrastructure.items.map((item, i) => <Milestone key={item.name} item={item} i={i} />)}
          <div className="hidden lg:block lg:w-[10vw] lg:shrink-0" />
        </div>
      </div>
      <div className="absolute inset-x-12 bottom-10 hidden h-px bg-ink/15 lg:block" aria-hidden>
        <div className="infra-progress h-px origin-left bg-gold-deep" />
      </div>
    </section>
  );
};
