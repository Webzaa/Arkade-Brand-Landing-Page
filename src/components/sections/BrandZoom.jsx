import { useEffect, useRef } from "react";
import { gsap, scrollToId, reducedMotion } from "@/lib/gsap";
import { Wordmark } from "@/components/ui/ArkadeMark";
import { hero } from "@/data/brochure";

export const BrandZoom = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      const update = () => {
        const rect = el.getBoundingClientRect();
        const max = Math.max(1, el.offsetHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, -rect.top / max));

        el.style.setProperty("--hero-p", p);

        // Reference HTML: THANE accelerates dramatically into the screen.
        const zoom = Math.pow(Math.min(1, p / 0.6), 3) * 38;
        el.style.setProperty("--hero-z", zoom);
      };

      const onScroll = () => requestAnimationFrame(update);

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", update);

      update();

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", update);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="brand"
      data-chapter="brand"
      className="ak-hero"
      aria-label="The shape of Thane to come"
    >
      <div className="ak-hero-sticky">

        {/* Background image */}
        <div className="ak-hero-image">
          <img
            src={hero.image}
            alt={hero.alt}
            fetchPriority="high"
          />
        </div>

        {/* THANE image-mask */}
        <svg
          className="ak-hero-cut"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <mask
              id="thane-mask"
              maskUnits="userSpaceOnUse"
              x="-4000"
              y="-4000"
              width="9600"
              height="8900"
            >
              <rect
                x="-4000"
                y="-4000"
                width="9600"
                height="8900"
                fill="#fff"
              />

              <text
                x="800"
                y="502"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="400"
                fontWeight="800"
                fill="#000"
                textLength="1360"
                lengthAdjust="spacingAndGlyphs"
              >
                ARKADE
              </text>
            </mask>
          </defs>

          <rect
            x="-4000"
            y="-4000"
            width="9600"
            height="8900"
            fill="#F7F5EF"
            mask="url(#thane-mask)"
          />
        </svg>

        {/* Top copy */}
        <p className="ak-hero-top">
          <span></span>
        </p>

        {/* Bottom copy */}
        <p className="ak-hero-bottom">
          <span>Family First</span>
        </p>

        {/* Chapter */}
        {/* <div className="ak-hero-chapter">
          <span>01</span> / BRAND
        </div> */}

        {/* Final state */}
        <div className="ak-hero-end">
          <h1>The shape of Thane to come.</h1>
          <p>
            Arkade arrives in Kasarvadavali, Ghodbunder Road,
            where Thane takes its next shape.
          </p>
        </div>

        {/* Scroll hint */}
        <button
          type="button"
          className="ak-hero-hint"
          onClick={() => scrollToId("legacy")}
        >
          <span>SCROLL TO DISCOVER</span>
          <i />
        </button>

        {/* Existing Arkade branding */}
        <div className="ak-hero-logo">
          {/* <Wordmark accent="#C9A462" className="text-ink" /> */}
        </div>
      </div>
    </section>
  );
};