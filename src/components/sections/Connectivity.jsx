import { mapSection } from "@/data/brochure";
import { MaskedLines, Stagger } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";
import { ThaneMap } from "@/components/map/ThaneMap";

export const Connectivity = () => (
  <section id="connectivity" data-chapter="connectivity" className="bg-ivory py-24 lg:py-36" aria-labelledby="map-title">
    <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12 xl:pl-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <ChapterTag index="03" label="Connectivity" />
          <p className="mt-8 font-display text-3xl italic text-gold-deep lg:text-4xl">{mapSection.eyebrow}</p>
          <MaskedLines id="map-title" lines={mapSection.title} className="mt-2 font-display text-section text-ink" />
        </div>
        <Stagger items={mapSection.lines} className="space-y-3 lg:col-span-6 lg:col-start-7 lg:pt-16" itemClassName="font-sans text-base leading-relaxed text-ink/80 lg:text-[17px]" />
      </div>
      <div className="mt-16 lg:mt-20">
        <ThaneMap />
        <p className="mt-4 text-right font-sans text-xs text-ink/60">{mapSection.source}</p>
      </div>
    </div>
  </section>
);
