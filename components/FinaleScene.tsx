"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";

const CONTACT_EMAIL = "hello@ntrx.in";

export const FinaleScene = ({ year }: { year: ReactNode }) => {
  const ref = useGsap((el, gsap) => {
    gsap.from("[data-fin-line]", {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 65%", once: true },
    });
    gsap.from("[data-fin-items]", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 55%", once: true },
    });
  });

  return (
    <section
      id="contact"
      ref={ref}
      data-testid="finale-scene"
      className="relative min-h-screen bg-black overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 studio-glow" aria-hidden="true" />

      <div className="relative flex-1 flex flex-col items-center justify-center max-w-[1400px] mx-auto px-6 sm:px-10 py-28 text-center">
        <span className="reveal-mask">
          <h2
            data-fin-line
            data-testid="finale-headline"
            className="block font-display text-4xl sm:text-6xl lg:text-8xl font-medium tracking-tight text-white leading-[1.02]"
          >
            Designed for
            <br />
            what&apos;s next.
          </h2>
        </span>
        <span className="reveal-mask mt-8">
          <p data-fin-line className="block text-lg sm:text-xl font-light leading-relaxed text-zinc-400 max-w-xl mx-auto">
            Two products. One vision — intelligent, accessible technology that
            fits the life you already live.
          </p>
        </span>

        <div data-fin-items className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center gap-10 sm:gap-20">
          <div data-testid="finale-product-ntrxc">
            <div className="font-display text-xl font-medium tracking-wide text-white">NTRX-C</div>
            <div className="mt-2 text-sm font-light text-zinc-500">Intelligence Beyond Vision.</div>
          </div>
          <div className="hidden sm:block h-12 w-px bg-zinc-800" aria-hidden="true" />
          <div data-testid="finale-product-ntrxpay">
            <div className="font-display text-xl font-medium tracking-wide text-white">NTRX Pay</div>
            <div className="mt-2 text-sm font-light text-zinc-500">Wear It. Tap It. Pay.</div>
          </div>
        </div>

        <a
          data-fin-items
          href={`mailto:${CONTACT_EMAIL}`}
          data-testid="contact-email-link"
          className="group mt-20 inline-flex flex-col items-center gap-3"
        >
          <span className="text-[11px] tracking-[0.45em] uppercase text-zinc-500">Begin the conversation</span>
          <span className="font-display text-2xl sm:text-4xl font-light text-white group-hover:text-zinc-300 transition-colors duration-300 border-b border-zinc-700 group-hover:border-white pb-2">
            {CONTACT_EMAIL}
          </span>
        </a>
      </div>

      <footer data-testid="footer" className="relative border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-sm tracking-[0.35em] text-zinc-500">NTRX</span>
          <span className="text-xs font-light text-zinc-600">
            &copy; {year} NTRX. Intelligence You Can Wear.
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-testid="footer-email-link"
            className="text-xs font-light text-zinc-500 hover:text-white transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </footer>
    </section>
  );
};
