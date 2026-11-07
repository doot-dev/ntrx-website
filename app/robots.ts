import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Answer engines: named explicitly so the site can be cited in AI search and chat answers.
const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  // /_next/ (JS, CSS, images) stays crawlable so pages render for bots.
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiBots, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
