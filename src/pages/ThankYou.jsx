import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { Arrow } from "@/components/brand/ui";

/**
 * Shown at /thank-you after either enquiry form is sent. Opening the URL directly also works (generic message).
 * Conversion tracking: fire your Google Ads / Meta Pixel / GA event in the effect below, so it runs once per visit.
 */
export default function ThankYou() {
  const { state } = useLocation();
  const first = ((state && state.name) || "").trim().split(/\s+/)[0];
  const heading = useRef(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Thank you | Arkade Developers";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    heading.current?.focus({ preventScroll: true });
    // e.g. window.gtag?.("event", "conversion", { send_to: "AW-XXXX/YYYY" }); window.fbq?.("track", "Lead");
    return () => { document.title = prev; robots.remove(); };
  }, []);

  return (
    <main className="bl-ty" id="top">
      <div className="bl-wrap bl-ty-in">
        <span className="bl-ty-mark" aria-hidden><Check strokeWidth={1.4} /></span>
        <span className="bl-eyebrow">Enquiry received</span>
        <h1 className="bl-h1" tabIndex={-1} ref={heading}>
          Thank you{first ? `, ${first}` : ""}. <em>We’ll be in touch.</em>
        </h1>
        <p className="bl-lead">The Arkade team will reach out shortly. Welcome to the family.</p>
        <Link to="/" className="bl-btn bl-btn--solid">Back to home <Arrow /></Link>
      </div>
    </main>
  );
}
