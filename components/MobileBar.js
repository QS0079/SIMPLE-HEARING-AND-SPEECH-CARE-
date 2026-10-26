"use client";

import { useEnquiry } from "./EnquiryProvider";
import { clinic } from "@/lib/content";
import Icon from "./Icon";

export default function MobileBar() {
  const { open } = useEnquiry();
  return (
    <div className="mobilebar">
      <a href={clinic.phoneHref} className="mobilebar__btn" aria-label={`Call ${clinic.phoneDisplay}`}>
        <Icon name="phone" size={18} />
        <span>Call</span>
      </a>
      <a
        href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about your services.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mobilebar__btn"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 000-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z"
          />
        </svg>
        <span>WhatsApp</span>
      </a>
      <button className="mobilebar__btn mobilebar__btn--grad" onClick={() => open("")}>
        Book Appointment
      </button>
    </div>
  );
}
