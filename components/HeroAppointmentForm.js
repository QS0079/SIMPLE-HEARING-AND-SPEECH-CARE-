"use client";

import { useState } from "react";
import { clinic, services } from "@/lib/content";
import { useEnquiry } from "./EnquiryProvider";
import Icon from "./Icon";

export default function HeroAppointmentForm() {
  const { service, setService } = useEnquiry();
  const [sent, setSent] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [lead, setLead] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms || isSubmitting) return;

    setErrorMsg("");
    setIsSubmitting(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name")?.trim(),
      phone: data.get("phone")?.trim(),
      service: data.get("service") || "General Consultation",
      forWhom: data.get("forWhom") || "Not specified",
      message: data.get("message")?.trim() || "",
    };

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit appointment request.");
      }

      setLead(result.lead || payload);
      setSent(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMsg(err.message || "Failed to submit request. Please try again or call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hero-form-card" id="appointment-form">
      <div className="hero-form-card__header">
        <span className="eyebrow">Direct Appointment Booking</span>
        <h3 className="hero-form-card__title">Book Your Consultation</h3>
        <p className="hero-form-card__sub">
          Fill in your details below to schedule your consultation with our specialist.
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
          <h4>Appointment Request Received!</h4>
          <p>
            Thank you, <strong>{lead?.name || "Patient"}</strong>. Your consultation request for <strong>{lead?.service || "Care"}</strong> has been received. Our clinical specialist will call you at <strong>{lead?.phone}</strong> shortly to confirm your time slot.
          </p>
          <div className="hero-form-card__success-alt">
            <span>Need immediate assistance?</span>
            <a href={clinic.phoneHref} className="hero-form-card__call-link">
              <Icon name="phone" size={15} />
              <span>{clinic.phoneDisplay}</span>
            </a>
          </div>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => {
              setSent(false);
              setAcceptedTerms(false);
            }}
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form className="form hero-form" onSubmit={onSubmit}>
          {errorMsg && (
            <div className="hero-form__error" role="alert">
              <span>{errorMsg}</span>
            </div>
          )}
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

          <button
            type="submit"
            className="btn btn--grad btn--block hero-form__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="hero-form__spinner" aria-hidden="true" />
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <span>Book Appointment</span>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="btn__arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
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
