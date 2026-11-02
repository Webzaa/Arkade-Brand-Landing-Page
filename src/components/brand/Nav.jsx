import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { brand, nav } from "@/data/arkade";
import { scrollToId } from "@/lib/gsap";
import useActiveChapter from "@/hooks/useActiveChapter";
import { Arrow } from "./ui";
import { useEnquiry } from "./EnquiryModal";

export const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";
  const chapter = useActiveChapter("top", pathname);
  const active = onHome ? chapter : null;
  const [solid, setSolid] = useState(false);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const bar = useRef(null);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setSolid(y > vh * 0.4);
      setHide(y > last.current && y > vh * 1.1);
      last.current = y;
      const h = document.documentElement.scrollHeight - vh;
      if (bar.current) bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("bl-lock", open);
    if (open) window.__lenis?.stop(); else window.__lenis?.start();
    return () => { document.body.classList.remove("bl-lock"); window.__lenis?.start(); };
  }, [open]);

  // On the home page scroll to the section; from any other page go home first (App scrolls once it mounts).
  
const go = (id) => {
  setOpen(false);

  if (!onHome) {
    navigate(
      { pathname: "/", hash: `#${id}` },
      { state: { scrollTo: id } }
    );
    return;
  }

  window.history.pushState(
    null,
    "",
    `${window.location.pathname}${window.location.search}#${id}`
  );

  setTimeout(() => scrollToId(id), open ? 450 : 0);
};


  return (
    <>
      <div className="bl-progress" ref={bar} aria-hidden />
      <header className={`bl-nav ${solid ? "solid" : ""} ${hide && !open ? "hide" : ""}`}>
        <nav className="bl-wrap bl-nav-in" aria-label="Primary">
          <button type="button" className="bl-nav-logo" onClick={() => go("top")} aria-label="Arkade, back to top">
            <img src={brand.familyLogo.src} alt={brand.logo.alt} />
          </button>
          <ul className="bl-nav-links">
            {nav.map((n) => (
              <li key={n.id}>
                <button type="button" onClick={() => go(n.id)} aria-current={active === n.id ? "true" : undefined}>{n.label}</button>
              </li>
            ))}
          </ul>
          <button type="button" className="bl-btn bl-nav-cta" onClick={openEnquiry}>Enquire Now <Arrow /></button>
          <button type="button" className="bl-burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu strokeWidth={1.3} /></button>
        </nav>
      </header>
      <div className={`bl-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="bl-menu-top">
          <img src={brand.logo.src} alt={brand.logo.alt} style={{ height: 34 }} />
          <button type="button" className="bl-burger" style={{ display: "inline-flex" }} onClick={() => setOpen(false)} aria-label="Close menu"><X strokeWidth={1.3} /></button>
        </div>
        <ul>
          {nav.map((n, i) => (
            <li key={n.id}><button type="button" onClick={() => go(n.id)}><span>0{i + 1}</span>{n.label}</button></li>
          ))}
        </ul>
        <button type="button" className="bl-btn" onClick={() => { setOpen(false); setTimeout(openEnquiry, 450); }}>Enquire now <Arrow /></button>
      </div>
    </>
  );
};
