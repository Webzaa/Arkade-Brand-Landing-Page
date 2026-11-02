import { motion, useReducedMotion } from "framer-motion";
import { opportunity } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { ChapterTag } from "@/components/ui/Eyebrow";

const WordReveal = ({ text, className }) => {
  const reduce = useReducedMotion();
  return (
    <motion.h2
      id="opp-title"
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
    >
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span className="inline-block" variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } } }}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
};

export const Opportunity = () => {
  const ref = useScrollAnimation((mm, el) => {
    gsap.utils.toArray(".opp-line").forEach((l) => {
      gsap.fromTo(l, { opacity: 0.35 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: l, start: "top 85%", end: "top 55%", scrub: true } });
    });
    gsap.fromTo(".opp-frame", { clipPath: "inset(18% 0% 18% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".opp-frame", start: "top 90%", end: "top 30%", scrub: true } });
    gsap.fromTo(".opp-img", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".opp-frame", start: "top bottom", end: "bottom top", scrub: true } });
  });

  return (
    <section ref={ref} id="opportunity" data-chapter="opportunity" className="bg-ivory py-24 text-ink lg:py-40" aria-labelledby="opp-title">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12 xl:pl-20">
        <ChapterTag index="04" label="The Opportunity" light />
        <p className="mt-10 font-display text-3xl italic text-gold-light lg:text-4xl">{opportunity.eyebrow}</p>
        <WordReveal text={opportunity.title} className="mt-3 max-w-6xl font-display text-[clamp(2.75rem,7vw,7rem)] leading-[1] text-gold" />

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
            <div className="opp-frame relative h-[52vh] overflow-hidden lg:h-[76vh]">
              <img src={opportunity.image} alt={opportunity.alt} loading="lazy" className="opp-img absolute inset-0 h-full w-full object-cover" />
              <span className="absolute bottom-4 right-4 font-sans text-[11px] tracking-[0.2em] text-ink/85">REPRESENTATIVE IMAGE</span>
            </div>
          </div>
          <div className="space-y-5 lg:col-span-5 lg:pt-6">
            {opportunity.lines.map((l, i) => (
              <p key={l} className={i >= 10 ? "opp-line pt-4 font-display text-3xl italic text-gold-light lg:text-4xl" : "opp-line font-sans text-[17px] leading-relaxed text-ink lg:text-lg"}>
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
