"use client";

import { useState } from "react";
import { clinic, services } from "@/lib/content";
import { useEnquiry } from "./EnquiryProvider";
import Icon from "./Icon";

export default function HeroAppointmentForm() {
  const { service, setService } = useEnquiry();
  const [sent, setSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) return;

    const data = new FormData(e.currentTarget);
    const lines = [
      `Hello ${clinic.name}, I would like to book an appointment.`,
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Service: ${data.get("service") || "Not sure yet (Need Guidance)"}`,
      data.get("forWhom") ? `For: ${data.get("forWhom")}` : null,
      data.get("message") ? `Message: ${data.get("message")}` : null,
    ].filter(Boolean);
    const url = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div className="hero-form-card" id="appointment-form">
      <div className="hero-form-card__header">
        <span className="eyebrow">Direct Appointment Booking</span>
        <h3 className="hero-form-card__title">Book Your Consultation</h3>
        <p className="hero-form-card__sub">
          Fill in your details below for instant WhatsApp confirmation.
        </p>
      </div>

      {sent ? (
        <div className="hero-form-card__success">
          <div className="hero-form-card__success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="34" height="34">
              <path
                d="M5 12.5l4.2 4.2L19 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4>WhatsApp Opened!</h4>
          <p>
            Your appointment details are filled in WhatsApp. Please press <strong>Send</strong> in WhatsApp and our clinic team will confirm your slot.
          </p>
          <div className="hero-form-card__success-alt">
            <span>Need immediate help?</span>
            <a href={clinic.phoneHref} className="hero-form-card__call-link">
              <Icon name="phone" size={15} />
              <span>{clinic.phoneDisplay}</span>
            </a>
          </div>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => setSent(false)}
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form className="form hero-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Your Name <strong className="required">*</strong></span>
            <input
              id="hero-enq-name"
              name="name"
              required
              autoComplete="name"
              placeholder="e.g. Rahul Sharma"
            />
          </label>

          <label className="field">
            <span>Phone Number <strong className="required">*</strong></span>
            <input
              id="hero-enq-phone"
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
                id="hero-enq-service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Not sure yet (Guidance)</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Appointment For</span>
              <select id="hero-enq-for" name="forWhom" defaultValue="">
                <option value="">Select</option>
                <option value="Myself">Myself</option>
                <option value="My child">My child</option>
                <option value="A parent or family member">Parent / Family</option>
              </select>
            </label>
          </div>

          <label className="field">
            <span>Message <em>(optional)</em></span>
            <textarea
              id="hero-enq-msg"
              name="message"
              rows={2}
              placeholder="Briefly describe your concern or preferred time"
            />
          </label>

          <label className="hero-form__consent">
            <input
              type="checkbox"
              id="hero-enq-consent"
              name="acceptTerms"
              required
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              I accept the{" "}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                Terms &amp; Conditions
              </a>
              <strong className="required">*</strong>
            </span>
          </label>

          <button type="submit" className="btn btn--grad btn--block hero-form__submit">
            <Icon name="whatsapp" size={19} />
            <span>Book Appointment on WhatsApp</span>
          </button>

          <div className="hero-form__footer">
            <a href={clinic.phoneHref} className="hero-form__call">
              <Icon name="phone" size={13} />
              <span>Prefer to call? {clinic.phoneDisplay}</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
