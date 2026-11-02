import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { COUNTRIES } from "@/lib/enquiry";

/**
 * Country-code picker used by the enquiry popup. Pure UI: value / onChange(iso) come from the form hook.
 * The list is rendered in a portal with fixed positioning so the popup panel's scrolling never clips it.
 * It opens downward, flips upward when there isn't room, and never exceeds the viewport.
 * Focus stays on the trigger (aria-activedescendant), so the popup's focus trap keeps working.
 */
export const CountrySelect = ({ id, value, onChange, disabled, tone = "light" }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(null);
  const btn = useRef(null);
  const list = useRef(null);
  const typed = useRef({ s: "", t: 0 });

  const selected = Math.max(0, COUNTRIES.findIndex((c) => c.iso === value));
  const current = COUNTRIES[selected];
  const listId = `${id}-list`;
  const optId = (i) => `${id}-opt-${COUNTRIES[i].iso}`;

  const place = useCallback(() => {
    const b = btn.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const edge = 12, gap = 6;
    const below = vh - r.bottom - gap - edge;
    const above = r.top - gap - edge;
    const up = below < 240 && above > below;
    const width = Math.min(Math.max(r.width, 300), vw - edge * 2);
    setPos({
      up,
      width,
      left: Math.min(Math.max(edge, r.left), vw - edge - width),
      maxH: Math.max(150, Math.min(320, up ? above : below)),
      top: up ? undefined : r.bottom + gap,
      bottom: up ? vh - r.top + gap : undefined,
    });
  }, []);

  const openList = () => { if (disabled) return; setActive(selected); place(); setOpen(true); };
  const close = useCallback(() => setOpen(false), []);
  const choose = (i) => { onChange(COUNTRIES[i].iso); close(); };

  // keep the list attached to the trigger while open; close on outside press
  useEffect(() => {
    if (!open) return undefined;
    const onScroll = (e) => { if (!list.current?.contains(e.target)) place(); };
    const onDown = (e) => {
      if (list.current?.contains(e.target) || btn.current?.contains(e.target)) return;
      close();
    };
    window.addEventListener("resize", place);
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open, place, close]);

  // bring the active row into view (selected row on open, then follows the keyboard)
  useLayoutEffect(() => {
    if (!open || !pos) return;
    const el = document.getElementById(optId(active));
    const ul = list.current;
    if (!el || !ul) return;
    const top = el.offsetTop, bot = top + el.offsetHeight;
    if (top < ul.scrollTop) ul.scrollTop = top - 6;
    else if (bot > ul.scrollTop + ul.clientHeight) ul.scrollTop = bot - ul.clientHeight + 6;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active, pos]);

  const onKeyDown = (e) => {
    const n = COUNTRIES.length;
    const k = e.key;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(k)) { e.preventDefault(); openList(); }
      return;
    }
    if (k === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }        // closes the list, not the popup
    else if (k === "Tab") close();
    else if (k === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % n); }
    else if (k === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + n) % n); }
    else if (k === "Home") { e.preventDefault(); setActive(0); }
    else if (k === "End") { e.preventDefault(); setActive(n - 1); }
    else if (k === "Enter" || (k === " " && Date.now() - typed.current.t > 700)) { e.preventDefault(); choose(active); }
    else if (k.length === 1) {                                                          // type-ahead by country name (a space mid-search is part of the name)
      e.preventDefault();
      const now = Date.now();
      typed.current.s = now - typed.current.t > 700 ? k.toLowerCase() : typed.current.s + k.toLowerCase();
      typed.current.t = now;
      const hit = COUNTRIES.findIndex((c) => c.name.toLowerCase().startsWith(typed.current.s));
      if (hit >= 0) setActive(hit);
    }
  };

  return (
    <>
      <button
        type="button" id={id} ref={btn} className={`bl-ccs-btn bl-ccs--${tone}`}
        role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? optId(active) : undefined}
        aria-label={`Country code, ${current.name} plus ${current.dial}`}
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
      >
        <span>{current.iso} +{current.dial}</span>
        <ChevronDown strokeWidth={1.5} aria-hidden="true" />
      </button>
      {open && pos && createPortal(
        <ul
          id={listId} ref={list} role="listbox" aria-label="Country code" data-lenis-prevent
          className={`bl-ccs-list bl-ccs--${tone}`}
          style={{ left: pos.left, width: pos.width, maxHeight: pos.maxH, top: pos.top, bottom: pos.bottom }}
        >
          {COUNTRIES.map((c, i) => (
            <li
              key={c.iso} id={optId(i)} role="option" className="bl-ccs-opt"
              aria-selected={i === selected} data-active={i === active}
              onMouseDown={(e) => e.preventDefault()}   // keep focus on the trigger
              onMouseMove={() => active !== i && setActive(i)}
              onClick={() => choose(i)}
            >
              <span className="bl-ccs-tick">{i === selected && <Check strokeWidth={2} aria-hidden="true" />}</span>
              <span className="bl-ccs-name">{c.name}</span>
              <span className="bl-ccs-dial">+{c.dial}</span>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </>
  );
};
