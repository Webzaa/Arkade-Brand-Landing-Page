import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { developments } from "@/data/brochure";
import { MaskedLines } from "@/components/ui/Motion";
import { ChapterTag } from "@/components/ui/Eyebrow";

const useDragScroll = (ref) => {
  const state = useRef({ down: false, x: 0, left: 0, moved: false });
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    state.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const s = state.current;
    if (!s.down) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 4) s.moved = true;
    ref.current.scrollLeft = s.left - dx;
  };
  const end = () => { state.current.down = false; };
  const onClickCapture = (e) => { if (state.current.moved) e.preventDefault(); };
  return { onPointerDown, onPointerMove, onPointerUp: end, onPointerLeave: end, onClickCapture };
};

const Project = ({ p, i }) => (
  <figure className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[27vw]" data-testid={`development-card-${i}`}>
    <div className="relative aspect-[4/5] overflow-hidden bg-beige">
      <img src={p.image} alt={`${p.name}, ${p.place} (artistic impression)`} loading="lazy" draggable="false" className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(22,36,33,0.75))] opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden />
      <div className="absolute inset-x-6 bottom-6 hidden translate-y-4 text-ink opacity-0 transition-[opacity,transform] duration-700 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
        <p className="font-display text-4xl">{p.name}</p>
        <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-[0.28em]">{p.place}</p>
      </div>
    </div>
    <figcaption className="mt-4 flex items-baseline justify-between gap-4 font-sans text-[12px] uppercase tracking-[0.22em] text-ink lg:transition-opacity lg:duration-500 lg:group-hover:opacity-0">
      <span className="font-bold">{p.name}</span>
      <span className="text-ink/70">{p.place}</span>
    </figcaption>
  </figure>
);

export const Developments = () => {
  const track = useRef(null);
  const drag = useDragScroll(track);
  const nudge = (dir) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.6, behavior: "smooth" });

  return (
    <section data-chapter="arkade" className="overflow-hidden bg-paper py-24 lg:py-36" aria-labelledby="dev-title">
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-8 px-5 sm:px-8 lg:px-12 xl:pl-20">
        <div>
          <ChapterTag index="05" label="Landmarks" />
          <MaskedLines id="dev-title" lines={developments.title} className="mt-6 font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[1.02] text-ink" />
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous developments" data-testid="developments-prev" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/40 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next developments" data-testid="developments-next" className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/40 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink">
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div
        ref={track}
        {...drag}
        tabIndex={0}
        aria-label="Ongoing developments gallery, scroll horizontally"
        data-testid="developments-track"
        className="no-scrollbar mt-14 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 active:cursor-grabbing sm:px-8 lg:mt-20 lg:gap-8 lg:scroll-px-12 lg:px-12 xl:pl-20"
      >
        {developments.items.map((p, i) => <Project key={p.name} p={p} i={i} />)}
        <div className="w-4 shrink-0 lg:w-12" aria-hidden />
      </div>
      <p className="mt-6 px-5 font-sans text-[11px] tracking-[0.2em] text-ink/60 sm:px-8 lg:px-12 xl:pl-20">{developments.note.toUpperCase()}</p>
    </section>
  );
};
