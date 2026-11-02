import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.2, 0.75, 0.15, 1];

// Masked line-by-line reveal. Observer sits on the unclipped parent.
export const MaskedLines = ({ lines, as = "h2", id, className, lineClassName, lineClasses, delay = 0, onLoad = false, stagger = 0.12 }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child = {
    hidden: { y: "105%", rotate: 2 },
    show: { y: "0%", rotate: 0, transition: { duration: 1.2, ease: EASE } },
  };
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.1 } };
  return (
    <Tag id={id} className={className} initial={reduce ? "show" : "hidden"} {...trigger} variants={parent}>
      {lines.map((line, li) => (
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span className={cn("block origin-top-left", lineClassName, lineClasses && lineClasses[li])} variants={child}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export const Reveal = ({ children, className, delay = 0, y = 28, as = "div" }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
};

export const Stagger = ({ items, className, itemClassName, as = "div" }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      {items.map((t) => (
        <motion.p
          key={t}
          className={itemClassName}
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
        >
          {t}
        </motion.p>
      ))}
    </Tag>
  );
};
