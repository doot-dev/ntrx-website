"use client";

import { useRef, type DependencyList } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Font swap can change section heights after first paint; re-measure pins once fonts land.
if (typeof document !== "undefined") {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

type Setup = (el: HTMLElement, g: typeof gsap, st: typeof ScrollTrigger) => void;

/**
 * Runs a GSAP setup function scoped to a container ref,
 * cleaned up on unmount. Disabled under prefers-reduced-motion.
 */
export const useGsap = (setup: Setup, deps: DependencyList = []) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce && ref.current) setup(ref.current, gsap, ScrollTrigger);
    },
    { scope: ref, dependencies: [...deps] },
  );

  return ref;
};

export { gsap, ScrollTrigger };
