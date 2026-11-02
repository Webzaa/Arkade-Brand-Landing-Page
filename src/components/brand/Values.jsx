import { useState } from "react";
import { values as v } from "@/data/arkade";
import { Lines } from "./ui";

export const Values = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="values" data-chapter="values" className="bl-section bl-sand" aria-labelledby="val-t">
      <div className="bl-wrap bl-val-grid">
        <div className="bl-val-side">
          <p className="bl-eyebrow bl-rv">{v.eyebrow}</p>
          <Lines id="val-t" className="bl-h2" lines={["Eight values,", "*one standard.*"]} />
        </div>
        <div className="bl-acc">
          {v.items.map((x, i) => (
            <div className="bl-rv" style={{ "--d": i * 50 }} key={x.title}>
              <div className={`bl-acc-item ${open === i ? "open" : ""}`}>
                <button type="button" className="bl-acc-btn" aria-expanded={open === i} aria-controls={`val-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  <i>0{i + 1}</i><b>{x.title}</b><span className="bl-acc-ic" aria-hidden />
                </button>
                <div className="bl-acc-body" id={`val-${i}`} role="region"><div><p>{x.text}</p></div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
