import { useState } from "react";
import { mapSection } from "@/data/brochure";
import { gsap } from "@/lib/gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { MarkerIcon } from "@/components/map/MarkerIcon";
import { cn } from "@/lib/utils";

const GREEN = [
  "M0 0 L565 0 L470 120 L420 230 L380 320 L300 450 L250 560 L170 650 L330 660 L430 600 L560 545 L600 520 L640 600 L560 690 L420 705 L330 730 L300 910 L0 910 Z",
  "M560 690 L640 600 L700 640 L770 700 L850 655 L885 760 L905 910 L520 910 L540 800 Z",
  "M1030 0 L1330 0 L1330 190 L1265 180 L1205 105 L1080 60 Z",
  "M1250 910 L1268 800 L1305 790 L1330 820 L1330 910 Z",
];
const WATER = [
  "M490 110 C520 70 600 60 660 76 C690 80 700 70 712 60",
  "M370 595 C420 590 430 560 470 580 S560 620 620 600 S700 592 735 565 C770 540 790 520 800 472 C830 430 870 470 900 452 C960 446 990 440 1022 450 C1050 420 1062 380 1082 362",
  "M470 580 C480 640 470 700 450 760 C440 820 420 860 418 910",
  "M430 610 C420 650 400 690 330 722 C250 760 200 820 110 905",
  "M1135 380 C1160 390 1180 385 1200 360 L1240 345",
];
const ROADS = [
  "M642 0 L572 131 L639 191 L657 236 L770 371 L770 405",
  "M752 71 L712 116 L660 262 L602 290 L586 326 L545 436 L492 418",
  "M586 326 L687 361 L657 486",
  "M492 418 L707 511",
  "M492 418 L442 551 L392 510 L360 520 L335 486",
  "M732 501 C760 470 778 430 770 371",
  "M770 405 L857 326 L992 268 L1092 271 L1330 291",
  "M732 561 L812 584 L1072 496 L1102 506",
  "M1012 0 L1012 161 L1097 191 L1082 271",
  "M1047 146 L1032 268",
  "M992 268 L1014 311 L992 441 L1042 561 L1122 676 L1062 910",
  "M1157 271 L1132 441 L1042 561",
  "M1330 291 L1248 380 L1232 500 L1192 591 L1122 676",
  "M1192 591 L1330 705",
];

export const ThaneMap = () => {
  const [filter, setFilter] = useState("all");
  const ref = useScrollAnimation((mm, el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%" } });
    tl.from(".m-green", { opacity: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" })
      .fromTo(".m-road", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.06, ease: "power3.out" }, 0.2)
      .fromTo(".m-water", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, stagger: 0.1, ease: "power2.out" }, 0.3)
      .from(".m-dot", { scale: 0, transformOrigin: "50% 50%", duration: 0.8, stagger: 0.05, ease: "back.out(2)" }, 1.1)
      .from(".m-pin", { y: -140, opacity: 0, duration: 1.1, ease: "bounce.out" }, 1.6)
      .from(".m-label, .m-rlabel", { opacity: 0, duration: 0.8, stagger: 0.03, ease: "power3.out" }, 1.8);
  });

  return (
    <div ref={ref} className="relative">
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter map markers">
        {mapSection.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            data-testid={`map-filter-${f.id}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn("border px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300", filter === f.id ? "border-ink bg-ink text-ink" : "border-ink/25 text-ink hover:border-ink")}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0" data-lenis-prevent-touch>
        <svg viewBox="0 0 1330 910" className="h-auto w-full min-w-[980px] bg-[#F8F6F0]" role="img" aria-labelledby="map-svg-title" data-testid="thane-map">
          <title id="map-svg-title">Stylised map of the Kasarvadavali neighbourhood showing Arkade and nearby landmarks. Map not to scale.</title>
          {GREEN.map((d) => <path key={d} d={d} className="m-green" fill="#DFE7D5" />)}
          {WATER.map((d) => <path key={d} d={d} pathLength="1" strokeDasharray="1" className="m-water" fill="none" stroke="#8FB6C4" strokeWidth="2.2" />)}
          <g className="m-road-main">
            <path d="M727 0 L1022 910" pathLength="1" strokeDasharray="1" className="m-road" stroke="#BD9C68" strokeWidth="13" fill="none" />
            <path d="M727 0 L1022 910" stroke="#F8F6F0" strokeWidth="3" fill="none" className="m-green" />
          </g>
          {ROADS.map((d) => <path key={d} d={d} pathLength="1" strokeDasharray="1" className="m-road" fill="none" stroke="#BD9C68" strokeWidth="3.2" strokeLinejoin="round" />)}
          {mapSection.roadLabels.map((r) => (
            <text key={r.text} className="m-rlabel" x={r.x} y={r.y} transform={`rotate(${r.rotate} ${r.x} ${r.y})`} fontFamily="Manrope" fontSize="16" fontWeight="600" fill="#8A6A3B">{r.text}</text>
          ))}
          {mapSection.markers.map((m) => (
            <g key={m.name.join(" ")} transform={`translate(${m.x} ${m.y})`} style={{ opacity: filter === "all" || filter === m.cat ? 1 : 0.15, transition: "opacity 0.5s ease" }}>
              <g className="m-dot">
                <circle r="21" fill="#FDFBF7" stroke="#BD9C68" strokeWidth="1.6" />
                <MarkerIcon cat={m.cat} />
              </g>
              <text className="m-label" x={m.lx} y={m.ly} textAnchor={m.anchor} fontFamily="Manrope" fontSize="17" fontWeight="700" fill="#8A6A3B">
                {m.name.map((line, i) => <tspan key={line} x={m.lx} dy={i === 0 ? 0 : 20}>{line}</tspan>)}
              </text>
            </g>
          ))}
          <g transform={`translate(${mapSection.pin.x} ${mapSection.pin.y})`}>
           <g className="m-pin">
            <path d="M0 0 C-10 -22 -32 -38 -32 -62 A32 32 0 1 1 32 -62 C32 -38 10 -22 0 0 Z" fill="#BD9C68" />
            <circle cy="-62" r="14" fill="#FDFBF7" />
            <text x="10" y="44" textAnchor="middle" fontFamily="Manrope" fontSize="30" fontWeight="800" letterSpacing="2" fill="#2B1E14">ARKADE</text>
           </g>
          </g>
        </svg>
      </div>
      <p className="mt-3 font-sans text-xs text-ink/60 sm:hidden">Swipe to explore the map →</p>
    </div>
  );
};
