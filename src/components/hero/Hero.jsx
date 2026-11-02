import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { hero } from "@/data/brochure";
import { gsap, scrollToId, reducedMotion } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MaskedLines, Reveal } from "@/components/ui/Motion";
import { Wordmark } from "@/components/ui/ArkadeMark";

const usePointerTilt = (scope) => {
  useEffect(() => {
    const el = scope.current;
    if (!el || reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const tilt = el.querySelector(".hero-tilt");
    const media = el.querySelector(".hero-pointer");
    const rx = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3.out" });
    const ry = gsap.quickTo(tilt, "rotationY", { duration: 1.2, ease: "power3.out" });
    const mx = gsap.quickTo(media, "x", { duration: 1.6, ease: "power3.out" });
    const my = gsap.quickTo(media, "y", { duration: 1.6, ease: "power3.out" });
    gsap.set(tilt, { transformPerspective: 1100 });
    const onMove = (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      ry(px * 7); rx(-py * 5); mx(px * -28); my(py * -18);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [scope]);
};

export const Hero = () => {
  const ref = useScrollAnimation((mm, el) => {
    const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero-media", { yPercent: 16, scale: 1.12, ease: "none", scrollTrigger: st });
    gsap.to(".hero-copy", { yPercent: -35, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "75% top" } });
    gsap.fromTo(".hero-arch", { scaleY: 1 }, { scaleY: 4.5, ease: "none", scrollTrigger: st });
  });
  usePointerTilt(ref);

  return (
    <section ref={ref} id="hero" data-chapter="thane" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ivory text-ink" aria-label="The shape of Thane to come">
      <div className="hero-media absolute inset-0 will-change-transform">
        <div className="hero-pointer absolute -inset-10">
          <img src={hero.image} alt={hero.alt} fetchpriority="high" className="hero-kenburns h-full w-full object-cover object-[50%_58%]" />
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,36,33,0.45)_0%,rgba(22,36,33,0.05)_38%,rgba(22,36,33,0.15)_62%,rgba(22,36,33,0.7)_100%)]" aria-hidden />

      <div className="hero-copy relative z-10 mx-auto flex h-full max-w-[1680px] flex-col justify-end px-5 pb-[18vh] sm:px-8 lg:px-12 lg:pb-[20vh]">
        <Reveal delay={1.6} y={12}>
          <Wordmark accent="#D8BE8E" className="mb-8 text-ink/90" />
        </Reveal>
        <div className="hero-tilt origin-left will-change-transform">
          <MaskedLines
            as="h1"
            onLoad
            delay={1.75}
            stagger={0.16}
            lines={hero.lines}
            className="font-display text-hero font-normal text-ink [text-shadow:0_2px_40px_rgba(22,36,33,0.35)]"
          />
        </div>
        <Reveal delay={2.4} className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <button
            type="button"
            data-testid="hero-explore-btn"
            onClick={() => scrollToId("thane")}
            className="group inline-flex items-center gap-4 font-sans text-[12px] font-semibold uppercase tracking-[0.3em] text-ink"
          >
            <span className="link-underline pb-1">{hero.cta}</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/60 transition-[transform,background-color,border-color] duration-500 group-hover:translate-x-1 group-hover:border-gold group-hover:bg-gold">
              <ArrowDown className="h-4 w-4 -rotate-90" strokeWidth={1.5} />
            </span>
          </button>
          <span className="font-sans text-[11px] tracking-[0.2em] text-ink/80">REPRESENTATIVE IMAGE</span>
        </Reveal>
      </div>

      <div className="hero-arch absolute -bottom-px left-[-10%] z-10 h-[9vh] w-[120%] origin-bottom rounded-[50%_50%_0_0/100%_100%_0_0] bg-ivory" aria-hidden />
    </section>
  );
};
