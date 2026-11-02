import { legacy as l } from "@/data/arkade";
import { Lines, CountUp } from "./ui";

const svg = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const ICONS = {
  done: svg(<><circle cx="12" cy="12" r="9" /><path d="m8 12.5 3 3 5-6" /></>),
  live: svg(<><path d="M3 21h18M6 21V9l6-5 6 5v12" /><path d="M10 21v-5h4v5M10 11h4" /></>),
  next: svg(<><rect x="3.5" y="5" width="17" height="15" rx="1.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
};

/* Scalloped gold seal used for the BSE/NSE listing and ISO certifications */
const SEAL_EDGE = (() => {
  const n = 28, pts = [];
  for (let i = 0; i < n * 8; i++) {
    const a = (i / (n * 8)) * Math.PI * 2;
    const r = 47 + 1.8 * Math.cos(a * n);
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

const Seal = ({ kind }) => (
  <svg className="bl-seal" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="bl-seal-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#e9d19a" />
        <stop offset="0.5" stopColor="#c9a25e" />
        <stop offset="1" stopColor="#a67c3a" />
      </linearGradient>
    </defs>
    <path d={SEAL_EDGE} fill="url(#bl-seal-g)" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,246,222,0.85)" strokeWidth="1.2" />
    {kind === "exchange" ? (
      <g className="bl-seal-txt" textAnchor="middle">
        <text x="50" y="46" fontSize="19">BSE</text>
        <text x="50" y="66" fontSize="19">NSE</text>
      </g>
    ) : (
      <>
        <g fill="none" stroke="rgba(61,45,27,0.35)" strokeWidth="1">
          <circle cx="50" cy="50" r="29" />
          <ellipse cx="50" cy="50" rx="12" ry="29" />
          <path d="M21 50h58M25 36h50M25 64h50" />
        </g>
        <text className="bl-seal-txt" x="50" y="58" fontSize="24" textAnchor="middle">ISO</text>
      </>
    )}
  </svg>
);

export const Legacy = () => {
  return (
  <section id="about-us" data-chapter="legacy" className="bl-section bl-gold" aria-labelledby="leg-t">
    <div className="bl-wrap">
      <div className="bl-leg-grid">
        <div className="bl-leg-art">
          <div className="bl-frame bl-frame--leg">
            <div className="bl-reveal-img">
              <div className="bl-par">
                 <img
                    src={l.image}
                    alt={l.alt}
                    data-parallax
                    loading="eager"
                    fetchPriority="high"
                  />
              </div>
            </div>
          </div>
          <div className="bl-leg-plate bl-rv" style={{ "--d": 400 }}>
            <ul className="bl-trust">
              {l.badges.map((b) => (
                <li className="bl-trust-item" key={b.title}>
                  <Seal kind={b.seal} />
                  <span className="bl-trust-txt">
                    <small>{b.pre}</small>
                    <b>{b.title}</b>
                    <small>{b.post}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bl-leg-copy">
          <p className="bl-eyebrow bl-rv">{l.eyebrow}</p>
          <Lines id="leg-t" className="bl-h2" lines={["Four decades", "of *shaping Mumbai.*"]} />

          <div className="bl-stats">
            {l.stats.map((s, i) => (
              <div className="bl-stat bl-rv" style={{ "--d": i * 100 }} key={s.label}>
                <CountUp value={s.value} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="bl-pipe-card bl-rv">
        <div className="bl-pipe">
          <div className="bl-pipe-head">
            <small>Our pipeline</small>
            <p>Always building — one journey, three stages</p>
          </div>
          <ol className="bl-pipe-list">
            {l.pipeline.map((x) => (
              <li className={`bl-pipe-row is-${x.key}`} key={x.label}>
                <div className="bl-pipe-label">
                  <span className="bl-pipe-ic" aria-hidden>{ICONS[x.key]}</span>
                  <div>
                    <b>{x.label}</b>
                    <span className="bl-pipe-status">{x.status}</span>
                  </div>
                </div>
                <p className="bl-pipe-note">{x.note}</p>
                <div className="bl-pipe-num"><b>{x.value}{x.plus ? "+" : ""}</b><em>projects</em></div>
              </li>
            ))}
          </ol>
        </div>
      </div> */}
    </div>
  </section>
  );
};