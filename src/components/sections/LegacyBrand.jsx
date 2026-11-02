import { useLayoutEffect, useRef } from "react";
import { legacy } from "@/data/brochure";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CountUp } from "@/components/ui/CountUp";
import useMediaQuery from "@/hooks/useMediaQuery";

/*
 * 02 / Arkade Legacy
 * The arch opens to reveal the skyline, followed by the two-part
 * "Family First" belief verse. Legacy stats sit on either side on desktop
 * and flow beneath the pinned stage on narrow screens.
 */

const BEATS = [[0, 1]];
const isHero = (line) => line === "Family First.";

const LEFT_STATS = legacy.stats.slice(0, 4);
const RIGHT_STATS = legacy.stats.slice(4);

const words = (text) =>
  text.split(" ").map((word, i) => (
    <span key={i} className="lg-w">
      {word}{" "}
    </span>
  ));

const StatList = ({ items, offset, side }) => (
  <ul className={`lg-stats-col lg-stats-${side}`}>
    {items.map((st, i) => (
      <li key={st.label} className="lg-stat">
        <span className="lg-stat-num">
          <CountUp
            value={st.value}
            plain={st.plain}
            testId={`legacy-stat-${offset + i}`}
          />
        </span>
        <span className="lg-stat-label">{st.label}</span>
      </li>
    ))}
  </ul>
);

const Stats = ({ flow }) => (
  <div className={`lg-stats${flow ? " lg-stats--flow" : ""}`} data-testid="legacy-stats">
    <StatList items={LEFT_STATS} offset={0} side="l" />
    <StatList items={RIGHT_STATS} offset={LEFT_STATS.length} side="r" />
  </div>
);

export const LegacyBrand = () => {
  const root = useRef(null);
  const isNarrow = useMediaQuery("(max-width: 760px)");

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return undefined;

    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        narrow: "(max-width: 760px)",
      },
      (ctx) => {
        if (!ctx.conditions.motion) return undefined;

        const narrow = ctx.conditions.narrow;
        el.classList.add("is-live");

        const track = q(".lg-pin")[0];
        const arch = q(".lg-arch")[0];
        const img = q(".lg-arch img")[0];
        const shade = q(".lg-shade")[0];
        const t1 = q(".lg-t1")[0];
        const t2 = q(".lg-t2")[0];
        const eyebrow = q(".lg-eyebrow")[0];
        const beats = q(".lg-beat");
        const bar = q(".lg-prog")[0];
        const barFill = q(".lg-prog i")[0];

        const win = {
          top: narrow ? 24 : 20,
          side: narrow ? 12 : 31,
          bottom: narrow ? 20 : 16,
          rad: 999,
        };

        const paint = () => {
          arch.style.clipPath = `inset(${win.top}% ${win.side}% ${win.bottom}% ${win.side}% round ${win.rad}px ${win.rad}px 0 0)`;
        };

        paint();
        gsap.set(img, { scale: 1.35 });
        gsap.set(shade, { opacity: 0 });
        gsap.set(beats, { autoAlpha: 0 });

        const tl = gsap.timeline({ defaults: { ease: "none" } });

        // 1. Open the arch and clear the heading.
        tl.to(
          win,
          {
            top: 0,
            side: 0,
            bottom: 0,
            rad: 0,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: paint,
          },
          0
        )
          .to(img, { scale: 1, duration: 1.8, ease: "power2.out" }, 0)
          .to(shade, { opacity: 1, duration: 1.0 }, 0.7)
          .to(eyebrow, { autoAlpha: 0, duration: 0.4 }, 0.1)
          .to(t1, { yPercent: -140, xPercent: -6, autoAlpha: 0, duration: 1, ease: "power2.in" }, 0.15)
          .to(t2, { yPercent: 140, xPercent: 6, autoAlpha: 0, duration: 1, ease: "power2.in" }, 0.15);

        // The desktop side stats slide outward as the arch opens.
        const statsL = q(".lg-stats-l .lg-stat");
        const statsR = q(".lg-stats-r .lg-stat");
        if (statsL.length) {
          tl.to(statsL, { xPercent: -22, autoAlpha: 0, duration: 0.8, ease: "power2.in", stagger: 0.05 }, 0.05);
        }
        if (statsR.length) {
          tl.to(statsR, { xPercent: 22, autoAlpha: 0, duration: 0.8, ease: "power2.in", stagger: 0.05 }, 0.05);
        }

        // 2. Reveal the belief sentence, lift its mask, then reveal the hero line.
        const HOLD = [3.4];
        let at = 2.0;

        beats.forEach((beat, i) => {
          const lines = beat.querySelectorAll(".lg-line");
          const masks = beat.querySelectorAll(".lg-mask");

          tl.set(beat, { autoAlpha: 1 }, at);

          if (i === 0 && lines.length >= 2 && masks.length >= 2) {
            const settle = 1.0 + 1.6;

            tl.fromTo(
              lines[0],
              { yPercent: 115 },
              { yPercent: 0, duration: 1.0, ease: "power3.out" },
              at
            )
              .fromTo(
                masks[0],
                { y: () => masks[1].offsetHeight / 2 },
                { y: 0, duration: 1.1, ease: "power3.inOut" },
                at + settle
              )
              .fromTo(
                lines[1],
                { yPercent: 115 },
                { yPercent: 0, duration: 1.2, ease: "power3.out" },
                at + settle + 0.25
              );

            at += settle + 0.25 + 1.2 + HOLD[i];
          } else {
            tl.fromTo(
              lines,
              { yPercent: 115 },
              { yPercent: 0, duration: 1.0, ease: "power3.out", stagger: 0.8 },
              at
            );
            at += 1.0 + Math.max(0, lines.length - 1) * 0.8 + (HOLD[i] ?? 2.0);
          }
        });

        tl.to({}, { duration: 1.0 }, at);

        // Slow skyline drift and scroll progress indicator.
        const verseStart = 2.0;
        const total = tl.duration();
        tl.to(img, { scale: 1.1, duration: total - verseStart, ease: "none" }, verseStart);
        gsap.set(bar, { autoAlpha: 0 });
        tl.to(bar, { autoAlpha: 1, duration: 0.5 }, verseStart).fromTo(
          barFill,
          { scaleX: 0 },
          { scaleX: 1, duration: Math.max(0.1, total - verseStart - 0.5), ease: "none" },
          verseStart + 0.3
        );

        const UNIT = narrow ? 42 : 48;
        track.style.height = `${Math.round(tl.duration() * UNIT + 100)}vh`;

        const master = ScrollTrigger.create({
          animation: tl,
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.1,
          invalidateOnRefresh: true,
        });

        // 3. Ink the closing copy in word by word.
        q(".lg-say").forEach((para) => {
          const paragraphWords = para.querySelectorAll(".lg-w");
          gsap.fromTo(
            paragraphWords,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.12,
              scrollTrigger: {
                trigger: para,
                start: "top 82%",
                end: "bottom 50%",
                scrub: 0.6,
              },
            }
          );
        });

        gsap.fromTo(
          q(".lg-sayrule"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: q(".lg-sayrule")[0],
              start: "top 90%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );

        return () => {
          el.classList.remove("is-live");
          master.kill();
          arch.style.clipPath = "";
          track.style.height = "";
        };
      }
    );

    return () => mm.revert();
  }, [isNarrow]);

  return (
    <section id="legacy" data-chapter="legacy" className="lg" aria-labelledby="legacy-title" ref={root}>
      <div className="lg-pin">
        <div className="lg-stage">
          <div className="lg-arch">
            <img src={legacy.image} alt={legacy.alt} loading="eager" decoding="async" />
            <span className="lg-shade" aria-hidden="true" />
          </div>

          <div className="lg-head">
            <p className="lg-eyebrow">02 / Arkade Legacy</p>
            <h2 id="legacy-title" className="lg-title">
              <span className="lg-t1">{legacy.title[0]}</span>
              <span className="lg-t2">{legacy.title[1]}</span>
            </h2>
          </div>

          {!isNarrow && <Stats />}

          <div className="lg-verse">
            {BEATS.map((indexes) => (
              <div key={indexes.join("-")} className="lg-beat">
                {indexes.map((index) => (
                  <span key={index} className="lg-mask">
                    <p className={`lg-line${isHero(legacy.lines[index]) ? " lg-line--hero" : ""}`}>
                      {legacy.lines[index]}
                    </p>
                  </span>
                ))}
              </div>
            ))}
            <div className="lg-prog" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      </div>

      {isNarrow && <Stats flow />}

      {/* <div className="lg-close">
        <p className="lg-say lg-say-a">{words(legacy.closing[0])}</p>
        <span className="lg-sayrule" aria-hidden="true" />
        <p className="lg-say lg-say-b">{words(legacy.closing[1])}</p>
      </div> */}
    </section>
  );
};
