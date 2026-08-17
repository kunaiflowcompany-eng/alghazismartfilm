/**
 * Plain ESM JavaScript rather than TypeScript.
 *
 * Hostinger's build image ships glibc < 2.29, so Next's native SWC binary
 * cannot load and the build falls back to WASM. That fallback cannot compile a
 * TypeScript config, which aborted the deploy with ERR_MODULE_NOT_FOUND.
 * A .mjs config needs no compilation step at all.
 */

/** Public routes, used to build the legacy /en and /ar redirects below. */
const PAGES = ["/about", "/products", "/applications", "/contact"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Media is pre-optimised in public/media (WebP photography, H.264 video),
  // so the image pipeline only needs to produce responsive variants.
  images: {
    formats: ["image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  devIndicators: false,

  /*
   * URLs are locale-free: language is client state, not a route segment. The
   * old /en and /ar prefixes 308-redirect to their clean equivalent so any
   * indexed or shared link keeps working and no duplicate page stays reachable.
   *
   * There is deliberately NO "/" -> "/en" redirect: the homepage must serve
   * directly at "/".
   */
  async redirects() {
    const locales = ["en", "ar"];
    const list = [];

    for (const locale of locales) {
      list.push({ source: `/${locale}`, destination: "/", permanent: true });
      for (const page of PAGES) {
        list.push({ source: `/${locale}${page}`, destination: page, permanent: true });
      }
    }

    return list;
  },
};

export default nextConfig;
