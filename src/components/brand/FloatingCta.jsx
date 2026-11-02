import { useEffect, useState } from "react";
import { useEnquiry } from "./EnquiryModal";
import { Arrow } from "./ui";

// Phones: "Enquire now" pill appears once the hero is passed, hides at the form. Opens the enquiry popup.
export const FloatingCta = () => {
  const [show, setShow] = useState(false);
  const { openEnquiry } = useEnquiry();
  useEffect(() => {
    const on = () => {
      const enq = document.getElementById("enquire");
      const r = enq ? enq.getBoundingClientRect() : null;
      const inForm = r && r.top < window.innerHeight * 0.7 && r.bottom > 0;
      setShow(window.scrollY > window.innerHeight * 0.9 && !inForm);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button type="button" className={`bl-btn bl-float ${show ? "show" : ""}`} onClick={openEnquiry} tabIndex={show ? 0 : -1}>
      Enquire now <Arrow />
    </button>
  );
};
