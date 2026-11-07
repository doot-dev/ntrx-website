import { site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { OpeningScene } from "@/components/OpeningScene";
import { NtrxCScene } from "@/components/NtrxCScene";
import { NtrxPayScene } from "@/components/NtrxPayScene";
import { PhilosophyScene } from "@/components/PhilosophyScene";
import { FinaleScene } from "@/components/FinaleScene";
import { CopyrightYear } from "@/components/CopyrightYear";

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
    <div data-testid="landing-page" className="relative bg-black min-h-screen text-white">
      <script
        type="application/ld+json"
        // escape "<" so the JSON can never close the script tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="grain-overlay" aria-hidden="true" />
      <NavBar />
      <main>
        <OpeningScene />
        <NtrxCScene />
        <NtrxPayScene />
        <PhilosophyScene />
        <FinaleScene year={<CopyrightYear />} />
      </main>
    </div>
  );
}
