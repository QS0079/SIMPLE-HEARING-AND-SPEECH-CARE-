import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import { clinic } from "@/lib/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="footer__grid">
          {/* Column 1: Brand & Contact */}
          <div className="footer__col footer__col--brand">
            <div className="footer__logo-wrap">
              <Logo light />
            </div>
            <p className="footer__brand-text">
              Simple Hearing &amp; Speech Care is a premier audiology and child developmental therapy centre in Wakad, Pune.
            </p>
            <div className="footer__quick-contact">
              <a href={clinic.phoneHref} className="footer__contact-pill">
                <Icon name="phone" size={15} />
                <span>{clinic.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
                  "Hello Simple Hearing & Speech Care, I would like to consult with your team."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-pill footer__contact-pill--wa"
              >
                <Icon name="whatsapp" size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Hearing & Adult Care */}
          <div className="footer__col">
            <h4 className="footer__heading">Hearing &amp; Adult Care</h4>
            <ul className="footer__links-list">
              <li>
                <a href="/#adults">Digital Hearing Aids</a>
              </li>
              <li>
                <a href="/#adults">Vertigo Management</a>
              </li>
              <li>
                <a href="/#adults">Adult Swallowing and Voice Therapy</a>
              </li>
              <li>
                <a href="/#adults">Post Stroke Speech Therapy</a>
              </li>
              <li>
                <a href="/#appointment-form">Hearing Assessment &amp; Trial</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Pediatric Care */}
          <div className="footer__col">
            <h4 className="footer__heading">Pediatric Care</h4>
            <ul className="footer__links-list">
              <li>
                <a href="/#pediatrics">Speech and Language Therapy</a>
              </li>
              <li>
                <a href="/#pediatrics">Occupational Therapy</a>
              </li>
              <li>
                <a href="/#pediatrics">Pediatrics Feeding Clinic</a>
              </li>
              <li>
                <a href="/#pediatrics">Sensory Integration Therapy</a>
              </li>
              <li>
                <a href="/#pediatrics">Primitive Reflexes Integration</a>
              </li>
              <li>
                <a href="/#pediatrics">ABA-Behavioural Therapy</a>
              </li>
              <li>
                <a href="/#pediatrics">School Readiness Program</a>
              </li>
              <li>
                <a href="/#neuro">Neuro Sensory Accelerator - Tomatis</a>
              </li>
              <li>
                <a href="/#appointment-form">Online International Therapy</a>
              </li>
              <li>
                <a href="/#cogniva">Cogniva Learning Skill development</a>
              </li>
              <li>
                <a href="/#appointment-form">Parent Training/Home Plan Therapy</a>
              </li>
              <li>
                <a href="/#appointment-form">Cochlear Implant and AVT</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate Hospital Service Partner + Clinic Location */}
          <div className="footer__col">
            {/* Corporate Hospital Service Partner (above Clinic Location) */}
            <div className="footer__sub-block--top">
              <h4 className="footer__heading">Corporate Hospital Service Partner</h4>
              <ul className="footer__partners-sublist">
                <li>
                  <span className="footer__partner-bullet" aria-hidden="true" />
                  <span>Sai Vita Life Hospital, Wakad</span>
                </li>
                <li>
                  <span className="footer__partner-bullet" aria-hidden="true" />
                  <span>Ankura Hospital, Wakad</span>
                </li>
                <li>
                  <span className="footer__partner-bullet" aria-hidden="true" />
                  <span>Asian Pacific Hospital, Hinjewadi</span>
                </li>
              </ul>
            </div>

            {/* Clinic Location */}
            <div className="footer__sub-block">
              <h4 className="footer__heading">Clinic Location</h4>
              <p className="footer__address-text">{clinic.address}</p>
              <p className="footer__timings-text">
                <strong>Mon – Sat:</strong> 10:00 AM – 8:00 PM<br />
                <span className="footer__muted">Sunday: By Appointment Only</span>
              </p>
              <a
                href={clinic.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__maps-link"
              >
                <Icon name="pin" size={14} />
                <span>Directions on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {clinic.name}. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link href="/privacy-policy" className="footer__legal-link">
              Privacy Policy
            </Link>
            <span className="footer__legal-sep" aria-hidden="true">•</span>
            <Link href="/terms-and-conditions" className="footer__legal-link">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
