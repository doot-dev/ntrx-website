import { cacheLife } from "next/cache";

// Server-side so the page stays prerendered; refreshed daily so it rolls over at New Year.
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
