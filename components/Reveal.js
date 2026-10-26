"use client";

import { useEffect } from "react";

// Adds unique section-by-section transitions to anything marked data-reveal.
// Elements are visible by default if JS is disabled or during SSR.
export default function Reveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Mark document as ready for reveals
    document.documentElement.classList.add("reveal-ready");

    const els = Array.from(document.querySelectorAll("[data-reveal]"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    const inViewport = [];

    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        inViewport.push(el);
      } else {
        io.observe(el);
      }
    });

    // Stagger-trigger in-viewport elements (Hero) after paint so CSS transitions play gracefully
    const timer = setTimeout(() => {
      inViewport.forEach((el) => {
        el.classList.add("is-in");
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return null;
}

