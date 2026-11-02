import { brand, enquire as e } from "@/data/arkade";
import { Lines } from "./ui";
import { EnquiryForm } from "./EnquiryForm";

export const Enquire = () => (
  <section id="contact-us" data-chapter="contact-us" className="bl-section bl-dark" aria-labelledby="enq-t">
    <div className="bl-enq-bg" aria-hidden><img src={e.image} alt="" loading="lazy" /></div>
    <div className="bl-wrap bl-enq-grid">
      <div>
        <div className="bl-enq-copy">
          <p className="bl-eyebrow bl-rv">{e.eyebrow}</p>
          <Lines id="enq-t" className="bl-h2" lines={e.title.map((l, i) => (i === 1 ? `*${l}*` : l))} />
          <p className="bl-lead bl-rv">{e.text}</p>
          <div className="bl-addr bl-rv"><b>Corporate office</b>{brand.address}</div>
        </div>
      </div>
      <EnquiryForm idPrefix="enq" source="enquire-section" consent={e.consent} tone="dark" />
    </div>
  </section>
);
