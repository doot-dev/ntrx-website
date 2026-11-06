import { site } from "@/lib/site";

// ponytail: placeholder hero; Phase 2 swaps in the five ported scenes.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      slogan: "Intelligence You Can Wear.",
      logo: `${site.url}/icon`,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <script
        type="application/ld+json"
        // escape "<" so the JSON can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <h1 className="text-[18vw] font-medium leading-none tracking-[0.08em] sm:text-[14vw] lg:text-[10rem]">
        {site.name}
      </h1>
      <p className="mt-8 font-display text-3xl font-light tracking-tight text-zinc-300 sm:text-5xl">
        {site.tagline}
      </p>
      <p className="mt-8 text-base font-light tracking-wide text-zinc-500 sm:text-lg">
        Intelligence You Can Wear.
      </p>
    </main>
  );
}
