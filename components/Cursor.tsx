"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Dot follows the pointer exactly; ring trails it and grows over links.
// Mouse/trackpad only, and off for reduced motion: everyone else keeps the system cursor.
export const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!fine.matches || !dot.current || !ring.current) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor");
    const els = [dot.current, ring.current];
    const dotX = gsap.quickSetter(dot.current, "x", "px");
    const dotY = gsap.quickSetter(dot.current, "y", "px");
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      gsap.set(els, { opacity: 1 });
    };
    const onOver = (e: PointerEvent) => {
      const link = (e.target as Element).closest("a, button, [role='button']");
      ring.current?.classList.toggle("is-link", Boolean(link));
    };
    const onLeave = () => gsap.set(els, { opacity: 0 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
};
