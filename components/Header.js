"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useEnquiry } from "./EnquiryProvider";
import { clinic } from "@/lib/content";

const links = [
  { href: "#adults", label: "Adults" },
  { href: "#pediatrics", label: "Kids" },
  { href: "#neuro", label: "Neuro Accelerator" },
  { href: "#cogniva", label: "Cogniva" },
  { href: "#why", label: "Why Us" },
];

export default function Header() {
  const { open } = useEnquiry();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${menu ? "menu-open" : ""}`}>
      <div className="wrap header__inner">
        <a href="#top" className="header__brand" aria-label="Simple Hearing & Speech Care home">
          <Logo priority />
        </a>

        <nav className="header__nav" aria-label="Sections">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__call" href={clinic.phoneHref}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.6a1 1 0 01-.25 1z"
                fill="currentColor"
              />
            </svg>
            <span>{clinic.phoneDisplay}</span>
          </a>
          <button className="btn btn--grad btn--sm" onClick={() => open("")}>
            Book an Appointment
          </button>
          <button
            className="header__burger"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
