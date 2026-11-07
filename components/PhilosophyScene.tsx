"use client";

import { useGsap } from "@/hooks/useGsap";

const LINES = [
  "Technology should adapt to people.",
  "Not the other way around.",
];

const VALUES = [
  { title: "Accessibility", text: "Designed around independence — for people with visual impairments, and for everyone." },
  { title: "Simplicity", text: "Advanced technology that disappears into everyday life." },
  { title: "Practical Innovation", text: "Real-world solutions, seamlessly integrated with what you already own." },
];

export const PhilosophyScene = () => {
  const ref = useGsap((el, gsap) => {
    gsap.from("[data-phil-line]", {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.22,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 65%", once: true },
    });
    gsap.from("[data-phil-values] > *", {
      opacity: 0,
      y: 40,
      duration: 0.9,
      stagger: 0.18,
      ease: "power2.out",
      scrollTrigger: { trigger: "[data-phil-values]", start: "top 80%", once: true },
    });
  });

  return (
    <section
      id="philosophy"
      ref={ref}
      data-testid="philosophy-scene"
      className="relative min-h-screen bg-white text-black overflow-hidden"
    >
      <div className="min-h-screen flex flex-col items-center justify-center max-w-[1400px] mx-auto px-6 sm:px-10 py-28 text-center">
        {LINES.map((line, i) => (
          <span key={i} className="reveal-mask">
            <h2
              data-phil-line
              data-testid={i === 0 ? "philosophy-headline" : undefined}
              className={`block font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] ${
                i === 0 ? "font-medium text-black" : "font-light text-zinc-400"
              }`}
            >
              {line}
            </h2>
          </span>
        ))}

        <div data-phil-values className="mt-20 sm:mt-28 grid sm:grid-cols-3 gap-12 sm:gap-16 max-w-5xl">
          {VALUES.map((v) => (
            <div key={v.title} data-testid={`philosophy-value-${v.title.toLowerCase().replace(" ", "-")}`}>
              <h3 className="font-display text-lg font-medium tracking-wide text-black">{v.title}</h3>
              <div className="mx-auto mt-4 h-px w-10 bg-zinc-300" aria-hidden="true" />
              <p className="mt-4 text-base font-light leading-relaxed text-zinc-400">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
