import { ArrowRight } from "lucide-react";
import { residentialValues as rv } from "@/data/brochure";
import { scrollToId } from "@/lib/gsap";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";
import { ValuesChart } from "@/components/charts/ValuesChart";

export const ResidentialValues = () => (
  <section data-chapter="opportunity" className="bg-paper py-24 lg:py-36" aria-labelledby="values-title">
    <div className="mx-auto grid max-w-[1680px] gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:px-12 xl:pl-20">
      <div className="lg:col-span-4">
        <ChapterTag index="04" label="Values" />
        <MaskedLines id="values-title" lines={rv.title} className="mt-6 font-display text-section text-gold-deep" />
        <Reveal delay={0.2} className="mt-14 border-t border-gold/50 pt-8">
          <p className="font-display text-6xl leading-none text-ink lg:text-7xl" data-testid="rental-yield">{rv.rental.figure}</p>
          <p className="mt-4 max-w-xs font-sans text-base leading-relaxed text-ink/80">{rv.rental.text}</p>
        </Reveal>
        <button type="button" onClick={() => scrollToId("register")} data-testid="values-discover-link" className="group mt-12 inline-flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ink">
          <span className="link-underline pb-1">Discover more</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
        </button>
      </div>
      <div className="lg:col-span-8 lg:pl-8">
        <ValuesChart />
        <div className="mt-10 space-y-2 border-t border-ink/15 pt-6">
          <p className="font-sans text-xs font-semibold text-ink/75" data-testid="values-disclaimer">{rv.disclaimer}</p>
          <p className="font-sans text-xs text-ink/65">{rv.source}</p>
        </div>
      </div>
    </div>
  </section>
);
