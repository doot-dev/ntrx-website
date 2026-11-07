"use client";

import { useGsap } from "@/hooks/useGsap";

const HERO_IMG =
  "https://images.unsplash.com/photo-1632059368252-be6d65abc4e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwbWluaW1hbCUyMHNsZWVrJTIwdGVjaG5vbG9neSUyMG9iamVjdCUyMHN0dWRpbyUyMGxpZ2h0aW5nfGVufDB8fHx8MTc5Mzk1MzgxNXww&ixlib=rb-4.1.0&q=85&w=1920&auto=format";

export const OpeningScene = () => {
  const ref = useGsap((el, gsap) => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      "[data-hero-light]",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out" }
    )
      .fromTo(
        "[data-hero-line-1]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2 },
        "-=1.4"
      )
      .fromTo(
        "[data-hero-line-2]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.2 },
        "-=0.8"
      )
      .fromTo(
        "[data-hero-tagline]",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1 },
        "-=0.5"
      )
      .fromTo(
        "[data-hero-cue]",
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.2"
      );
  });

  return (
    <section
      id="top"
      ref={ref}
      data-testid="opening-scene"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* slow-reveal studio light */}
      <div data-hero-light className="absolute inset-0 studio-glow-strong" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, black 30%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative text-center px-6">
        <span className="reveal-mask">
          <h1
            data-hero-line-1
            data-testid="hero-wordmark"
            className="font-display text-[18vw] sm:text-[14vw] lg:text-[10rem] font-medium tracking-[0.08em] leading-none text-white"
          >
            NTRX
          </h1>
        </span>
        <span className="reveal-mask mt-6 sm:mt-8">
          <h2
            data-hero-line-2
            data-testid="hero-tagline-main"
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-300"
          >
            Technology. <span className="text-white font-medium">Made Human.</span>
          </h2>
        </span>
        <p
          data-hero-tagline
          data-testid="hero-subline"
          className="mt-8 sm:mt-10 text-base sm:text-lg font-light tracking-wide text-zinc-500 max-w-md mx-auto"
        >
          Intelligence You Can Wear.
        </p>
      </div>

      <a
        href="#ntrx-c"
        data-hero-cue
        data-testid="hero-scroll-cue"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-zinc-500 hover:text-white transition-colors"
        aria-label="Scroll to NTRX-C"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <span className="cue-drift block h-8 w-px bg-gradient-to-b from-zinc-500 to-transparent" />
      </a>
    </section>
  );
};
