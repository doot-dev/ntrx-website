"use client";

import { useGsap } from "@/hooks/useGsap";

const TAG_IMG =
  "https://images.unsplash.com/photo-1785771922765-af83ff0cc254?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYmxhY2slMjBtYWNybyUyMHRlY2glMjBwcm9kdWN0JTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MHx8fHwxNzkzOTUzODA5fDA&ixlib=rb-4.1.0&q=85";
const STRAP_IMG =
  "https://images.unsplash.com/photo-1675676708853-841f9566bb6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxibGFjayUyMG1pbmltYWxpc3QlMjBicmFjZWxldCUyMHByb2R1Y3QlMjBzaG90JTIwZGFya3xlbnwwfHx8fDE3OTM5NTM4MTV8MA&ixlib=rb-4.1.0&q=85";

export const NtrxPayScene = () => {
  const ref = useGsap((el, gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "+=130%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // content visible by default; scroll rotates the tag and ignites the NFC pulse
    tl.fromTo(
      "[data-tag]",
      { rotate: -8, scale: 0.95 },
      { rotate: 8, scale: 1.06, duration: 1.6, ease: "none" }
    )
      .fromTo(
        "[data-pulse]",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=1"
      )
      .fromTo(
        "[data-attach]",
        { opacity: 0.25, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power1.out" },
        "-=0.8"
      )
      .to("[data-tag]", { rotate: 0, scale: 1, duration: 1, ease: "none" });
  });

  return (
    <section
      id="ntrx-pay"
      ref={ref}
      data-testid="ntrx-pay-scene"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className="min-h-screen flex flex-col items-center justify-center max-w-[1400px] mx-auto px-6 sm:px-10 py-28">
        <span className="reveal-mask">
          <span data-pay-headline className="block text-[11px] tracking-[0.45em] uppercase text-zinc-500 mb-6 text-center">
            NTRX Pay
          </span>
        </span>
        <span className="reveal-mask">
          <h2
            data-pay-headline
            data-testid="ntrx-pay-headline"
            className="block font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-white text-center leading-[1.02]"
          >
            Payments. Simplified.
          </h2>
        </span>

        <div className="mt-16 lg:mt-20 flex flex-col lg:flex-row items-center gap-14 lg:gap-24">
          {/* the tag */}
          <div className="relative flex items-center justify-center">
            <div data-pulse className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span className="nfc-ring h-56 w-56 sm:h-72 sm:w-72" />
              <span className="nfc-ring nfc-ring-2 h-56 w-56 sm:h-72 sm:w-72" />
              <span className="nfc-ring nfc-ring-3 h-56 w-56 sm:h-72 sm:w-72" />
            </div>
            <figure data-tag data-testid="ntrx-pay-visual" className="relative will-change-transform">
              <div className="absolute inset-0 studio-glow" aria-hidden="true" />
              <img
                src={TAG_IMG}
                alt="Concept visual of the compact NTRX Pay NFC tag"
                className="w-[60vw] max-w-[280px] sm:max-w-[320px] aspect-square object-cover rounded-full"
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

          {/* attachment concept */}
          <figure data-attach data-testid="ntrx-pay-attach" className="relative max-w-sm">
            <img
              src={STRAP_IMG}
              alt="Concept visual of the NTRX Pay tag attached to an everyday accessory"
              className="w-full aspect-[4/3] object-cover rounded-2xl opacity-80"
              loading="lazy"
            />
            <figcaption className="mt-5">
              <span className="block font-display text-xl sm:text-2xl font-light text-white">
                Wear It. Tap It. Pay.
              </span>
              <span className="mt-3 block text-base font-light leading-relaxed text-zinc-400">
                A compact NFC-enabled tag that attaches to the accessories you
                already own — bracelets, rings, watch straps, keychains.
              </span>
              <span className="mt-3 block text-xs tracking-wide text-zinc-600">
                Concept visual. NTRX does not manufacture jewellery, watches or
                fashion accessories.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
