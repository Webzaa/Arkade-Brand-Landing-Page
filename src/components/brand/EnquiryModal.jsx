import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { enquire as e } from "@/data/arkade";
import { EnquiryForm } from "./EnquiryForm";

const Ctx = createContext({ openEnquiry: () => {} });
/** `const { openEnquiry } = useEnquiry();` opens the popup from anywhere inside <EnquiryProvider>. */
export const useEnquiry = () => useContext(Ctx);

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal = ({ onClose }) => {
  const panel = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    document.body.classList.add("bl-lock");
    window.__lenis?.stop();
    // focus the first field once the panel is on screen
    const t = setTimeout(() => document.getElementById("pop-name")?.focus({ preventScroll: true }), 60);

    const onKey = (ev) => {
      if (ev.key === "Escape") { ev.stopPropagation(); onClose(); return; }
      if (ev.key !== "Tab" || !panel.current) return;
      const els = [...panel.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("bl-lock");
      window.__lenis?.start();
      if (opener && typeof opener.focus === "function") opener.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="bl-modal" onMouseDown={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}>
      <div className="bl-modal-panel" role="dialog" aria-modal="true" aria-labelledby="pop-t" ref={panel} data-lenis-prevent>
        <button type="button" className="bl-modal-x" onClick={onClose} aria-label="Close enquiry form"><X strokeWidth={1.3} /></button>
        <p id="pop-t" className="bl-eyebrow">Enquire now</p>
        <EnquiryForm
          idPrefix="pop"
          source="popup"
          consent={e.consent}
          onSent={onClose}
        />
      </div>
    </div>
  );
};

export const EnquiryProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openEnquiry = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <Ctx.Provider value={{ openEnquiry }}>
      {children}
      {open && <Modal onClose={close} />}
    </Ctx.Provider>
  );
};
