"use client";

import { useGsap } from "@/hooks/useGsap";

const GLASSES_IMG =
  "https://images.unsplash.com/photo-1654257650833-b7398115275a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxzbGVlayUyMHN1bmdsYXNzZXMlMjBwcm9kdWN0JTIwJTIwc2hvdCUyMGJsYWNrJTIwYmFja2dyb3VuZCUyMGNpbmVtYXRpY3xlbnwwfHx8fDE3OTM5NTM4MTV8MA&ixlib=rb-4.1.0&q=85";

export const NtrxCScene = () => {
  const ref = useGsap((el, gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=120%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // content is visible by default; scroll drives a slow cinematic camera move
    tl.fromTo(
      "[data-product]",
      { scale: 0.94, rotate: -4, y: 40 },
      { scale: 1.06, rotate: 4, y: -30, duration: 1.6, ease: "none" }
    )
      .to("[data-product]", { scale: 1, rotate: 0, y: 0, duration: 1, ease: "none" })
      .fromTo(
        "[data-c-mission]",
        { opacity: 0.15, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power1.out" },
        "-=1.4"
      );
  });

  return (
    <section
      id="ntrx-c"
      ref={ref}
      data-testid="ntrx-c-scene"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className="min-h-screen flex flex-col lg:flex-row items-center max-w-[1400px] mx-auto px-6 sm:px-10 py-28 lg:py-0 gap-16 lg:gap-8">
        {/* typography */}
        <div className="lg:w-1/2 order-2 lg:order-1">
          <span className="reveal-mask">
            <span data-c-headline className="block text-[11px] tracking-[0.45em] uppercase text-zinc-500 mb-6">
              NTRX-C
            </span>
          </span>
          <span className="reveal-mask">
            <h2
              data-c-headline
              data-testid="ntrx-c-headline"
              className="block font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.02]"
            >
              Independence,
              <br />
              reimagined.
            </h2>
          </span>
          <span className="reveal-mask mt-8">
            <p data-c-sub className="block text-lg sm:text-xl font-light leading-relaxed text-zinc-400 max-w-md">
              AI-powered assistive technology, designed for compatible smart
              glasses. Helping blind and visually impaired people understand
              their surroundings — hands-free.
            </p>
          </span>
          <p
            data-c-mission
            data-testid="ntrx-c-mission"
            className="mt-10 font-display text-xl sm:text-2xl font-light text-zinc-200 max-w-md leading-relaxed"
          >
            Our mission: to make the world more accessible through artificial
            intelligence.
          </p>
        </div>

        {/* product stage */}
        <div className="lg:w-1/2 order-1 lg:order-2 relative flex items-center justify-center">
          <div className="absolute inset-0 studio-glow" aria-hidden="true" />
          <figure data-product data-testid="ntrx-c-visual" className="relative will-change-transform">
            <img
              src={GLASSES_IMG}
              alt="Concept visual of sleek smart glasses suspended in darkness with studio reflections"
              className="w-[78vw] max-w-[420px] lg:max-w-[520px] aspect-square object-cover rounded-full"
              style={{
                maskImage: "radial-gradient(circle at 50% 50%, black 55%, transparent 72%)",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 55%, transparent 72%)",
              }}
              loading="lazy"
            />
            <figcaption className="mt-6 text-center text-[10px] tracking-[0.35em] uppercase text-zinc-600">
              Concept visual
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
