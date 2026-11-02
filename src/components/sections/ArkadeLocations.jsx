import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { developments, legacy } from "@/data/brochure";
import { ProjectFootprint } from "@/components/sections/ProjectFootprint";

const groups = [
  { id: "all", label: "All Mumbai" },
  // { id: "south", label: "South Mumbai" },
  { id: "west", label: "Western Suburbs" },
  { id: "east", label: "Eastern Suburbs" },
  // { id: "thane", label: "Thane" },
];

const classify = (place) => {
  const p = place.toLowerCase();
  if (p.includes("tardeo") || p.includes("mazgaon") || p.includes("carmichael")) return "south";
  if (["virar", "vasai", "mira", "dahisar", "borivali", "kandivali", "malad", "goregaon", "andheri", "vile parle", "santacruz"].some((x) => p.includes(x))) return "west";
  if (["mulund", "bhandup", "kanjurmarg"].some((x) => p.includes(x))) return "east";
  if (p.includes("thane")) return "thane";
  return "all";
};

export const ArkadeLocations = () => {
  const [filter, setFilter] = useState("all");
  const footprintRef = useRef(null);

  const footprint = useMemo(
    () =>
      legacy.footprint.flatMap((g) =>
        g.places.map((place) => ({
          place,
          region: classify(place),
          sourceRegion: g.region,
        }))
      ),
    []
  );

  const projects = developments.items.filter(
    (item) => filter === "all" || classify(item.place) === filter
  );

  useEffect(() => {
    const el = footprintRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="locations" data-chapter="locations" className="bg-ivory py-[clamp(56px,6vw,88px)] text-ink" aria-labelledby="locations-title">
      <div className="mx-auto max-w-[1520px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <Reveal><p className="eyebrow-serif text-gold">04 / Arkade in Mumbai</p></Reveal>
            <MaskedLines id="locations-title" lines={["Already shaping", "Mumbai."]} lineClasses={["", "italic text-gold-light"]} className="mt-6 font-display text-section font-medium" />
            <Reveal delay={0.15}><p className="mt-7 max-w-lg font-sans text-base leading-relaxed text-ink/70 lg:text-[17px]">Arkade's footprint spans established neighbourhoods across Mumbai, with projects across South Mumbai, the Western Suburbs, Eastern Suburbs and Thane.</p></Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-3">
                {groups.map((g) => <button key={g.id} type="button" aria-pressed={filter === g.id} onClick={() => setFilter(g.id)} className="pill px-5 py-3 font-sans text-[13px] font-semibold tracking-[.02em] text-ink">{g.label}</button>)}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-px sm:grid-cols-3">
              {projects.map((project, i) => (
                <motion.article
                  key={project.name}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 1.1, ease: [0.2, 0.75, 0.15, 1], delay: (i % 3) * 0.09 }}
                  className="group sweep bg-ivory p-3 sm:p-4"
                >
                  <div className="overflow-hidden"><img src={project.image} alt={`${project.name}, ${project.place}`} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-1000 ease-cine group-hover:scale-[1.06]" /></div>
                  <div className="relative px-1 pb-2 pt-5"><h3 className="font-display text-2xl font-medium">{project.name}</h3><p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[.18em] text-gold">{project.place}</p></div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <ProjectFootprint />
      </div>
    </section>
  );
};