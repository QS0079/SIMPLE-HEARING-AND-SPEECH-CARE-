import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import { clinic } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__logo-wrap">
          <Logo light />
        </div>
        <p className="footer__desc">
          Top Hearing &amp; Speech Care Clinic in Wakad, Pune • Personalised Audiology, Hearing Aids, Vertigo Management &amp; Child Therapies
        </p>
        <div className="footer__links">
          <a
            href={clinic.phoneHref}
            className="footer__badge footer__badge--phone"
            aria-label={`Call ${clinic.phoneDisplay}`}
          >
            <Icon name="phone" size={16} />
            <span>{clinic.phoneDisplay}</span>
          </a>
          <a
            href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
              "Hello, I would like to know more about your services."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__badge footer__badge--whatsapp"
            aria-label="Chat with Simple Hearing on WhatsApp"
          >
            <Icon name="whatsapp" size={18} />
            <span>WhatsApp Enquiry</span>
          </a>
          <a
            href={clinic.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__badge footer__badge--maps"
            aria-label="Open clinic location on Google Maps"
          >
            <Icon name="pin" size={16} />
            <span>Wakad, Pune (Opp. Mont Vert Tropez)</span>
          </a>
        </div>
        <p className="footer__address">{clinic.address}</p>
        <div className="footer__divider" />
        <div className="footer__legal">
          <Link href="/privacy-policy" className="footer__legal-link">
            Privacy Policy
          </Link>
          <span className="footer__legal-sep" aria-hidden="true">
            •
          </span>
          <Link href="/terms-and-conditions" className="footer__legal-link">
            Terms &amp; Conditions
          </Link>
        </div>
        <p className="footer__small">
          © {new Date().getFullYear()} {clinic.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
