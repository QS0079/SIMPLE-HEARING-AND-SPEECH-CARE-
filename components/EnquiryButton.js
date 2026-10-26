"use client";

import { useEnquiry } from "./EnquiryProvider";

export default function EnquiryButton({ service = "", variant = "grad", children, className = "" }) {
  const { open } = useEnquiry();
  return (
    <button type="button" className={`btn btn--${variant} ${className}`} onClick={() => open(service)}>
      <span>{children}</span>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="btn__arrow">
        <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
