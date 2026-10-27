"use client";

import { clinic } from "@/lib/content";
import Icon from "./Icon";

export default function FloatingContact() {
  const whatsappUrl = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
    "Hello Simple Hearing & Speech Care, I would like to enquire about your services and book an appointment."
  )}`;

  return (
    <aside className="floating-contact" aria-label="Quick contact shortcuts">
      <a
        href={clinic.phoneHref}
        className="floating-contact__btn floating-contact__btn--phone"
        aria-label={`Call clinic at ${clinic.phoneDisplay}`}
      >
        <Icon name="phone" size={22} />
        <span className="floating-contact__tooltip">Call Us: {clinic.phoneDisplay}</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn floating-contact__btn--wa"
        aria-label="Chat with Simple Hearing on WhatsApp"
      >
        <span className="floating-contact__pulse" aria-hidden="true" />
        <Icon name="whatsapp" size={26} />
        <span className="floating-contact__tooltip">Chat on WhatsApp</span>
      </a>
    </aside>
  );
}
