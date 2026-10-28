"use client";

import { useEnquiry } from "./EnquiryProvider";
import { clinic } from "@/lib/content";
import Icon from "./Icon";

export default function MobileBar() {
  const { open } = useEnquiry();
  return (
    <div className="mobilebar">
      <a href={clinic.phoneHref} className="mobilebar__btn mobilebar__btn--call" aria-label={`Call ${clinic.phoneDisplay}`}>
        <Icon name="phone" size={18} />
        <span>Call</span>
      </a>
      <a
        href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about your services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mobilebar__btn mobilebar__btn--wa"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="whatsapp" size={18} />
        <span>WhatsApp</span>
      </a>
      <button className="mobilebar__btn mobilebar__btn--grad" onClick={() => open("")}>
        Book Appointment
      </button>
    </div>
  );
}
