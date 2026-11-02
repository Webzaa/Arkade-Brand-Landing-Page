import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/brochure";
import { MaskedLines } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";

const EASE = [0.2, 0.75, 0.15, 1];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const go = (d) => { setDir(d); setIndex((i) => (i + d + testimonials.length) % testimonials.length); };

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => { setDir(1); setIndex((i) => (i + 1) % testimonials.length); }, 8000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[index];
  return (
    <section
      id="testimonials"
      data-chapter="testimonials"
      className="relative overflow-hidden bg-paper py-[clamp(56px,6vw,88px)] text-ink"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="pointer-events-none absolute -top-10 left-2 select-none font-display text-[22rem] leading-none text-gold/[.09] lg:-top-24 lg:left-8 lg:text-[34rem]" aria-hidden>“</span>
      <div className="relative mx-auto grid max-w-[1520px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12 xl:pl-20">
        <div className="lg:col-span-4">
          <ChapterTag index="05" label="Families" />
          <MaskedLines id="testimonials-title" lines={["In their", "words"]} lineClasses={["", "italic text-gold-light"]} className="mt-6 font-display text-[clamp(2.75rem,5vw,5rem)] font-medium leading-[1.02]" />
        </div>
        <div className="lg:col-span-8 lg:col-start-5" aria-live="polite">
          <div className="grid min-h-[520px] sm:min-h-[440px] lg:min-h-[460px] [&>*]:[grid-area:1/1]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 90 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -90 }}
                transition={{ duration: 1.3, ease: EASE }}
                data-testid="testimonial-slide"
                className="flex flex-col justify-between gap-10 border border-ink/[.14] bg-ivory p-7 sm:p-10 lg:p-14"
              >
                <blockquote className="font-display text-[1.5rem] leading-[1.32] text-ink sm:text-3xl lg:text-[2.25rem] lg:leading-[1.25]">“{t.quote}”</blockquote>
                <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink/[.14] pt-5">
                  <span className="font-display text-2xl italic text-ink">{t.name}</span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{t.project}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" data-testid="testimonial-prev" className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ink/[.14] transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" data-testid="testimonial-next" className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-ink/[.14] transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink">
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="font-sans text-xs font-semibold tracking-[0.3em] text-ink/70" data-testid="testimonial-counter">
              {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <span className="relative h-px flex-1 bg-ink/[.10]" aria-hidden>
              <span className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-700" style={{ width: `${((index + 1) / testimonials.length) * 100}%` }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};