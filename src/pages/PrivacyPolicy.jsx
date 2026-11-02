import { useEffect } from "react";
import { Link } from "react-router-dom";
import { privacyPolicy as doc, legalMeta } from "@/data/privacy";
import { Arrow } from "@/components/brand/ui";
import { useEnquiry } from "@/components/brand/EnquiryModal";

const HEADER_OFFSET = 110; // fixed nav height + breathing room

const jumpTo = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -HEADER_OFFSET, duration: 1.2 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
};

const Block = ({ b, site }) => {
  if (b.ul) {
    return (
      <ul className="bl-legal-list">
        {b.ul.map((li) => <li key={li}>{li}</li>)}
      </ul>
    );
  }
  return (
    <p>
      {b.label && <strong>{b.label} </strong>}
      {b.p.replace("{site}", site)}
    </p>
  );
};

export default function PrivacyPolicy() {
  const { openEnquiry } = useEnquiry();
  const site = typeof window !== "undefined" ? window.location.host : "this website";

  useEffect(() => {
    const prev = document.title;
    document.title = `${doc.title} | Arkade Developers`;
    return () => { document.title = prev; };
  }, []);

  // Deep link such as /privacy-policy#cookies
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET });
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="bl-legal" id="top">
      <header className="bl-legal-head">
        <div className="bl-wrap">
          <nav className="bl-legal-crumb" aria-label="Breadcrumb">
            <Link to="/"><Arrow dir="l" /> Back to home</Link>
          </nav>
          <span className="bl-eyebrow">{doc.eyebrow}</span>
          <h1 className="bl-h1">Privacy <em>Policy</em></h1>
        </div>
      </header>

      <div className="bl-wrap bl-legal-grid">
        <aside className="bl-legal-toc" aria-label="On this page">
          <p className="bl-legal-toc-h">On this page</p>
          {doc.parts.map((part) => (
            <div key={part.id}>
              <p className="bl-legal-toc-part">{part.title}</p>
              <ul>
                {part.sections.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} onClick={(e) => jumpTo(e, s.id)}>{s.title}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <article className="bl-legal-body">
          <div className="bl-legal-intro">
            {doc.intro.map((t) => <p key={t}>{t}</p>)}
            {legalMeta.effectiveDate && <p>This policy is effective from {legalMeta.effectiveDate}.</p>}
          </div>

          {doc.parts.map((part) => (
            <div key={part.id} className="bl-legal-part">
              <h2 className="bl-legal-part-h">{part.title}</h2>
              {part.sections.map((s) => (
                <section key={s.id} id={s.id} className="bl-legal-sec" aria-labelledby={`${s.id}-h`}>
                  <h3 id={`${s.id}-h`}>{s.title}</h3>
                  {s.blocks.map((b, i) => <Block key={i} b={b} site={site} />)}
                </section>
              ))}
            </div>
          ))}

          <p className="bl-legal-contact">
            For any queries regarding this Privacy Policy, please contact us
            {legalMeta.contactEmail
              ? <> at <a href={`mailto:${legalMeta.contactEmail}`}>{legalMeta.contactEmail}</a>.</>
              : <> through the <button type="button" className="bl-legal-link" onClick={openEnquiry}>enquiry form</button>.</>}
          </p>
        </article>
      </div>
    </main>
  );
}
