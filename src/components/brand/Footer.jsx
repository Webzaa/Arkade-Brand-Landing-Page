import { Link } from "react-router-dom";
import { brand } from "@/data/arkade";

export const Footer = () => (
  <footer className="bl-foot">
    <div className="bl-wrap">
      <div className="bl-foot-top">
        <div className="bl-foot-brand">
          <img src={brand.logo.src} alt={brand.logo.alt} />
          <p>{brand.tagline}.</p>
        </div>
        {/* <div className="bl-foot-reg">
          <span>RERA: {brand.rera}</span>
        </div> */}
      </div>
      <div className="bl-foot-legal">
        <p>{brand.disclaimer}</p>
      </div>
      <div className="bl-foot-bar">
        <p className="bl-foot-copy">© {new Date().getFullYear()} Arkade Developers. All rights reserved.</p>
        <p className="bl-foot-partner">Digital marketing partner: <span>SSV Technologies</span></p>
        <Link to="/privacy-policy" className="bl-foot-link">Privacy Policy</Link>
      </div>
    </div>
  </footer>
);
