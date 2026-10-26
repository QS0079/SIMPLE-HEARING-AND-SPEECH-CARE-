"use client";

import { useEffect, useRef } from "react";

// A live "voice" waveform in the brand gradient. It swells near the pointer,
// like sound getting clearer as you lean in.
export default function Waveform({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t = 0;
    let pointer = 0.5, target = 0.5, boost = 0, boostTarget = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lines = [
      { amp: 0.34, freq: 1.6, speed: 0.9, width: 2.4, alpha: 1 },
      { amp: 0.24, freq: 2.3, speed: -1.2, width: 1.4, alpha: 0.55 },
      { amp: 0.16, freq: 3.4, speed: 1.6, width: 1, alpha: 0.35 },
      { amp: 0.42, freq: 1.1, speed: -0.6, width: 1, alpha: 0.22 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "rgba(24, 33, 46, 0.4)");
      grad.addColorStop(0.25, "#f5bf03");
      grad.addColorStop(0.5, "#d97706");
      grad.addColorStop(0.75, "#f5bf03");
      grad.addColorStop(1, "rgba(24, 33, 46, 0.4)");
      pointer += (target - pointer) * 0.06;
      boost += (boostTarget - boost) * 0.05;
      const mid = h / 2;
      lines.forEach((l) => {
        ctx.beginPath();
        ctx.lineWidth = l.width;
        ctx.strokeStyle = grad;
        ctx.globalAlpha = l.alpha;
        for (let x = 0; x <= w; x += 3) {
          const p = x / w;
          // speech-like envelope: tapered ends, a moving swell, a bump at the pointer
          const taper = Math.sin(Math.PI * p);
          const swell = 0.55 + 0.45 * Math.sin(p * 5 - t * 0.7);
          const near = Math.exp(-Math.pow((p - pointer) * 6, 2)) * boost;
          const env = taper * (swell + near * 1.2);
          const y =
            mid +
            Math.sin(p * Math.PI * 2 * l.freq * 3 + t * l.speed) *
              Math.cos(p * Math.PI * l.freq + t * 0.4) *
              mid * l.amp * env * 2;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 0.022;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      target = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      boostTarget = 1;
    };
    const onLeave = () => (boostTarget = 0);

    resize();
    window.addEventListener("resize", resize);
    const host = canvas.parentElement;
    host?.addEventListener("pointermove", onMove);
    host?.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) loop();
    });
    io.observe(canvas);
    if (reduce) draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={`waveform ${className}`} aria-hidden="true" />;
}
