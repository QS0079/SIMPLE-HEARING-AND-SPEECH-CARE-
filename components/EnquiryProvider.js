"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { clinic, services } from "@/lib/content";

const EnquiryContext = createContext({ open: () => {} });

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export default function EnquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState("");
  const [sent, setSent] = useState(false);
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);

  const open = useCallback((preset = "") => {
    lastFocus.current = document.activeElement;
    setService(preset);
    setSent(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => dialogRef.current?.querySelector("input")?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, close]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Hello ${clinic.name}, I would like to book an appointment.`,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Service: ${data.get("service") || "Not sure yet"}`,
      data.get("forWhom") ? `For: ${data.get("forWhom")}` : null,
      data.get("message") ? `Message: ${data.get("message")}` : null,
    ].filter(Boolean);
    const url = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    setSent(true);
  };

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}
      <div className={`modal ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="modal__scrim" onClick={close} />
        <div
          className="modal__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
          ref={dialogRef}
        >
          <button className="modal__close" onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {sent ? (
            <div className="modal__done">
              <div className="modal__tick" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="34" height="34">
                  <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 id="enquiry-title">Almost done</h3>
              <p>
                WhatsApp has opened with your details filled in. Press send there and our team will
                get back to you to confirm a time.
              </p>
              <p className="modal__alt">
                Prefer to call? <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
              </p>
              <button className="btn btn--grad" onClick={close}>Close</button>
            </div>
          ) : (
            <>
              <p className="eyebrow">Simple Hearing &amp; Speech Care</p>
              <h3 id="enquiry-title">Book an Appointment</h3>
              <p className="modal__sub">Share a few details and our team will guide you to the right service.</p>
              <form className="form" onSubmit={onSubmit}>
                <label className="field">
                  <span>Your name</span>
                  <input id="enq-name" name="name" required autoComplete="name" placeholder="Full name" />
                </label>
                <label className="field">
                  <span>Phone number</span>
                  <input
                    id="enq-phone"
                    name="phone"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="[0-9+\s\-]{10,15}"
                    placeholder="10-digit mobile number"
                  />
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>Service</span>
                    <select
                      id="enq-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="">Not sure yet</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label className="field">
                    <span>Appointment for</span>
                    <select id="enq-for" name="forWhom" defaultValue="">
                      <option value="">Select</option>
                      <option>Myself</option>
                      <option>My child</option>
                      <option>A parent or family member</option>
                    </select>
                  </label>
                </div>
                <label className="field">
                  <span>Message <em>(optional)</em></span>
                  <textarea id="enq-msg" name="message" rows={3} placeholder="Tell us briefly what you need help with" />
                </label>
                <button type="submit" className="btn btn--grad btn--block">
                  Send on WhatsApp
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <p className="form__note">
                  Or call us on <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </EnquiryContext.Provider>
  );
}
