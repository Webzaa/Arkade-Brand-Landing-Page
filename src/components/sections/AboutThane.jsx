import { thaneStory, cityOwnRight, reasons, axis } from "@/data/brochure";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { WordReveal } from "@/components/ui/WordReveal";

export const AboutThane = () => (
  <section id="thane" data-chapter="thane" className="bg-paper text-ink" aria-labelledby="thane-title">
    <div className="mx-auto max-w-[1520px] px-5 py-[clamp(56px,6vw,88px)] sm:px-8 lg:px-12">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <Reveal><p className="eyebrow-serif text-gold">03 / About Thane</p></Reveal>
          <MaskedLines id="thane-title" lines={["A city never stops", "taking shape."]} className="thane-reveal mt-6 font-display text-section font-medium" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal><p className="thane-reveal font-display text-2xl italic leading-tight text-gold-light lg:text-4xl">Thane has already transformed once. Its next transformation is underway.</p></Reveal>
          <WordReveal
            lines={thaneStory.lines.slice(0, 8)}
            className="mt-10 space-y-4"
            lineClassName="font-display text-[clamp(1.35rem,1.9vw,1.9rem)] leading-[1.3] text-ink"
          />
        </div>
      </div>

      {/* Split panel: image + chapter text */}
      <div className="mt-[clamp(44px,5vw,72px)] grid gap-px bg-ink/[.10] lg:grid-cols-12">
        <ParallaxImage src={thaneStory.image} alt={thaneStory.alt} className="h-[58vh] min-h-[420px] lg:col-span-7 lg:h-auto lg:min-h-[640px]" amount={8} />
        <div className="thane-reveal relative flex flex-col justify-center bg-ivory p-8 sm:p-12 lg:col-span-5 lg:p-16">
          <Reveal><p className="font-display text-4xl font-medium leading-[1.02] text-ink lg:text-6xl">A city in its own right.</p></Reveal>
          <Reveal delay={0.12}><p className="mt-7 max-w-[46ch] font-sans text-base leading-relaxed text-ink/70 lg:text-[17px]">{cityOwnRight.lines[1]}</p></Reveal>
          <Reveal delay={0.2}><p className="mt-6 font-display text-2xl italic leading-snug text-gold-light lg:text-3xl">“They are moving for more from life.”</p></Reveal>
        </div>
      </div>

      {/* Reasons */}
      <div className="mt-[clamp(32px,4vw,56px)] grid gap-px bg-ink/[.10] lg:grid-cols-3">
        {reasons.slice(0, 2).map((reason, i) => (
          <Reveal key={reason.num} delay={i * 0.1} className="thane-reveal group sweep bg-paper">
            <ParallaxImage src={reason.image} alt={reason.alt} className="h-[340px] w-full" amount={6} imgClassName="transition-transform duration-1000 ease-cine group-hover:scale-105">
              <span className="num-outline absolute left-5 top-5 text-[5rem]" aria-hidden>{reason.num}</span>
              <span className="sr-only">{reason.num}</span>
            </ParallaxImage>
            <div className="relative p-8 lg:p-10"><h3 className="font-display text-3xl font-medium text-gold-light lg:text-4xl">{reason.title}</h3><p className="mt-5 font-sans text-[15px] leading-relaxed text-ink/70">{reason.lines[1]}</p></div>
          </Reveal>
        ))}
        <Reveal delay={0.2} className="thane-reveal sweep flex flex-col justify-between bg-[#C2A06A] p-8 text-ink lg:p-10">
          <div><p className="eyebrow-serif text-gold">Kasarvadavali</p><h3 className="mt-6 font-display text-4xl font-medium leading-tight lg:text-5xl">{axis.title.join(" ")}</h3><p className="mt-6 font-sans text-[15px] leading-relaxed text-ink/70">{axis.lines[2]}</p></div>
          <p className="mt-12 border-t border-ink/[.14] pt-6 font-sans text-[11px] uppercase tracking-[.2em] text-ink/60">The next premium residential axis</p>
        </Reveal>
      </div>
    </div>
  </section>
);