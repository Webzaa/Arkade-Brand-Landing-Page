import { motion, useReducedMotion } from "framer-motion";
import { caseForThane } from "@/data/brochure";
import { MaskedLines } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";
import { LineIcon } from "@/components/ui/LineIcon";

// Branch lengths echo the brochure's staggered tree layout.
const reach = ["8%", "52%", "30%", "52%", "30%", "8%"];
const EASE = [0.16, 1, 0.3, 1];

const Branch = ({ item, i }) => {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className="relative flex flex-col gap-4 py-8 lg:flex-row lg:items-center lg:gap-0 lg:py-7"
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.span
        className="absolute left-0 top-[52px] h-px w-6 origin-left bg-gold lg:static lg:block lg:w-[var(--reach)] lg:shrink-0"
        style={{ "--reach": reach[i] }}
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE } } }}
        aria-hidden
      />
      <motion.div
        className="flex items-start gap-5 pl-10 lg:pl-6"
        variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.5, ease: EASE } } }}
      >
        <LineIcon name={item.icon} />
        <div className="max-w-xs">
          <h3 className="font-display text-[1.9rem] leading-[1.05] text-gold-deep">{item.title}</h3>
          <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink/80">{item.text}</p>
        </div>
      </motion.div>
    </motion.li>
  );
};

export const CaseForThane = () => (
  <section data-chapter="opportunity" className="bg-ivory py-24 lg:py-36" aria-labelledby="case-title">
    <div className="mx-auto grid max-w-[1680px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12 xl:pl-20">
      <div className="lg:sticky lg:top-[38vh] lg:col-span-3 lg:self-start">
        <ChapterTag index="04" label="Why Thane" />
        <MaskedLines id="case-title" lines={caseForThane.title} className="mt-6 font-display text-section text-ink" />
      </div>
      <ul className="relative border-l border-gold lg:col-span-9" data-testid="case-for-thane-list">
        {caseForThane.items.map((item, i) => <Branch key={item.title} item={item} i={i} />)}
      </ul>
    </div>
  </section>
);
