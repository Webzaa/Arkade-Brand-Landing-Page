import { campaign } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines } from "@/components/ui/Motion";

const Panel = ({ c, i }) => (
  <div className="cmp-panel sticky top-0 h-[100svh] overflow-hidden" style={{ zIndex: i + 1 }}>
    <img src={c.image} alt={c.alt} loading="lazy" className="cmp-img absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,36,33,0.15)_0%,rgba(22,36,33,0.1)_45%,rgba(22,36,33,0.72)_100%)]" aria-hidden />
    <div className="absolute right-5 top-24 font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-ink/85 sm:right-8 lg:right-12">
      {String(i + 1).padStart(2, "0")} / 03
    </div>
    <div className="cmp-copy absolute inset-x-0 bottom-0 px-5 pb-14 text-ink sm:px-8 lg:px-12 lg:pb-16 xl:pl-20">
      {c.pre && <p className="font-display text-4xl italic lg:text-6xl">{c.pre}</p>}
      <MaskedLines as="p" lines={[c.word]} className="font-display text-giant" lineClassName="pb-[0.06em]" />
      <MaskedLines as="p" lines={[c.post]} delay={0.25} className="mt-2 font-display text-4xl italic sm:text-5xl lg:text-7xl" />
    </div>
    <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/80">REPRESENTATIVE IMAGE</span>
  </div>
);

export const SixOneMore = () => {
  const ref = useScrollAnimation(() => {
    gsap.utils.toArray(".cmp-panel").forEach((p) => {
      gsap.fromTo(p.querySelector(".cmp-img"), { scale: 1.25, yPercent: -6 }, { scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "top top", scrub: true } });
      gsap.fromTo(p.querySelector(".cmp-copy"), { yPercent: 30 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "top top", scrub: true } });
    });
  });

  return (
    <section ref={ref} data-chapter="connectivity" className="relative bg-ivory" aria-label="Six different routes. One clear direction. A more connected Thane.">
      {campaign.map((c, i) => <Panel key={c.word} c={c} i={i} />)}
    </section>
  );
};
