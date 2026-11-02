import { hero } from "@/data/arkade";
import { scrollToId } from "@/lib/gsap";
import { Lines, Arrow } from "./ui";

export const Hero = ({ ready }) => (
  <section id="top" data-chapter="top" className={`bl-hero ${ready ? "bl-ready" : ""}`} aria-label="Arkade — Family First">
    <div className="bl-hero-bg">
      <img src={hero.back} alt="" fetchPriority="high" data-hero-parallax />
    </div>
    <div className="bl-hero-word" aria-hidden>ARKADE</div>

    <div className="bl-wrap bl-hero-grid">
      <div className="bl-hero-copy">
        <p className={`bl-eyebrow bl-rv ${ready ? "in" : ""}`} data-manual style={{ "--d": 200 }}>{hero.eyebrow}</p>
        <Lines as="h1" className="bl-h1" lines={["Homes built on", "*Family First.*"]} manual ready={ready} delay={300} />
        <p className={`bl-lead bl-rv ${ready ? "in" : ""}`} data-manual style={{ "--d": 700 }}>{hero.text}</p>
        <div className={`bl-hero-cta bl-rv ${ready ? "in" : ""}`} data-manual style={{ "--d": 850 }}>
          {/* <button type="button" className="bl-btn" onClick={() => scrollToId("legacy")}>Our legacy <Arrow /></button> */}
          <button type="button" className="bl-btn bl-btn--solid" onClick={() => scrollToId("contact-us")}>Enquire <Arrow /></button>
        </div>
      </div>

      <div className="bl-hero-art">
        <div className={`bl-frame-back bl-rv ${ready ? "in" : ""}`} data-manual style={{ "--d": 900 }} aria-hidden />
        <div className="bl-frame bl-frame--main">
          <div className={`bl-reveal-img ${ready ? "in" : ""}`} data-manual style={{ "--d": 250 }}>
            <img
              src={hero.image}
              alt={hero.imageAlt}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = hero.fallback; }}
            />
          </div>
        </div>
        <div className={`bl-badge bl-rv ${ready ? "in" : ""}`} data-manual style={{ "--d": 1100 }}>
          <svg viewBox="0 0 200 200" aria-hidden>
            <defs><path id="bl-circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text><textPath href="#bl-circ">Arkade · Family First · Four decades · Legacy . Brand . </textPath></text>
          </svg>
          <b>40+</b>
        </div>
      </div>
    </div>
  </section>
);
