import { useEffect, useRef } from "react";
import { principles as p } from "@/data/arkade";
import { gsap } from "@/lib/gsap";
import { Lines } from "./ui";

export const Principles = () => {
  const root = useRef(null);
  const track = useRef(null);
  const meter = useRef(null);

  // Desktop: pin the section and scroll the panels sideways.
  // Under 860px (or reduced motion) the panels simply stack.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current;
      const dist = () => Math.max(0, t.scrollWidth - window.innerWidth);
      gsap.to(t, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          pin: root.current.querySelector(".bl-hs-pin"),
          start: "top top",
          end: () => `+=${dist()}`,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => { if (meter.current) meter.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="principles" data-chapter="principles" className="bl-hs" ref={root} aria-labelledby="pr-t">
      <div className="bl-hs-pin">
        <div className="bl-hs-track" ref={track}>
          <div className="bl-hs-intro">
            <p className="bl-eyebrow bl-rv">{p.eyebrow}</p>
            <Lines id="pr-t" className="bl-h2" lines={["Principles we", "*build by.*"]} />
            <p className="bl-lead bl-rv" style={{ "--d": 200 }}>Four commitments that have guided every Arkade home — and what the families who live in them say.</p>
            <div className="bl-hs-meter" aria-hidden><i ref={meter} /></div>
          </div>

          {p.items.map((x) => (
            <article className="bl-panel" key={x.num}>
              <div>
                <div className="bl-panel-num" aria-hidden>{x.num}</div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
                {/* <div className="bl-prooof"> */}
                  {/* <q>{x.proof}</q>
                  <span>{x.who}</span> */}
                {/* </div> */}
              </div>
              <div className="bl-panel-img">
                <div className="bl-arch"><img src={x.image} alt={x.alt} loading="lazy" /></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
