import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "@/styles/brand.css";
import "@/styles/enquiry.css";
import useLenis from "@/hooks/useLenis";
import { gsap, ScrollTrigger, reducedMotion, scrollToId } from "@/lib/gsap";
import { Preloader } from "@/components/brand/Preloader";
import { Nav } from "@/components/brand/Nav";
import { Footer } from "@/components/brand/Footer";
import { FloatingCta } from "@/components/brand/FloatingCta";
import { EnquiryProvider } from "@/components/brand/EnquiryModal";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ThankYou from "@/pages/ThankYou";

export default function App() {
  const [ready, setReady] = useState(false);
  const { pathname, state } = useLocation();
  useLenis();

  // On every route change: jump to the top, or to the section the link asked for (e.g. "enquire" from the legal page).
  useEffect(() => {
    const id = state && state.scrollTo;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      if (id && id !== "top") { scrollToId(id); return; }
      window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    }, id ? 150 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, state]);

  // Scroll-reveal: adds `.in` to anything marked bl-rv / bl-mask / bl-reveal-img.
  useEffect(() => {
    const els = document.querySelectorAll(".bl-rv:not([data-manual]), .bl-mask:not([data-manual]), .bl-reveal-img:not([data-manual]), .bl-pipe");
    if (reducedMotion() || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return undefined; }
    // clip-path hides an element from IntersectionObserver, so reveal-images are watched via their parent.
    const target = (el) => (el.classList.contains("bl-reveal-img") ? el.parentElement : el);
    const map = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        map.get(e.target)?.forEach((el) => el.classList.add("in"));
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    els.forEach((el) => {
      const t = target(el);
      map.set(t, [...(map.get(t) || []), el]);
      io.observe(t);
    });
    return () => io.disconnect();
  }, [pathname]);

  // Parallax for images marked data-parallax / data-hero-parallax.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-parallax]").forEach((img) => {
        gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.to("[data-hero-parallax]", { yPercent: 12, ease: "none", scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true } });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { window.removeEventListener("load", refresh); ctx.revert(); };
  }, [pathname]);

  return (
    <div className="bl-root">
      {/* inside .bl-root so the popup inherits the page's resets (buttons, links, headings) */}
      <EnquiryProvider>
        <Preloader onDone={() => setReady(true)} />
        <Nav />
        <Routes>
          <Route path="/" element={<Home ready={ready} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        {pathname === "/" && <FloatingCta />}
      </EnquiryProvider>
    </div>
  );
}
