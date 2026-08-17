/**
 * Plain ESM JavaScript rather than TypeScript.
 *
 * Hostinger's build image ships glibc < 2.29, so Next's native SWC binary
 * (@next/swc-linux-x64-gnu) cannot load and the build falls back to WASM. That
 * fallback fails to compile a TypeScript config, which killed the deploy with
 * ERR_MODULE_NOT_FOUND. A .mjs config needs no compilation step at all.
 *
 * For the same reason `defaultLocale` is inlined below instead of imported from
 * src/i18n/config.ts — importing a TypeScript module from here would reintroduce
 * the compile step. The literal must stay in step with `defaultLocale` in
 * src/i18n/config.ts (currently "en").
 */

/** Mirrors `defaultLocale` in src/i18n/config.ts */
const defaultLocale = "en";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Media is pre-optimised in public/media (WebP photography, H.264 video),
  // so the image pipeline only needs to produce responsive variants.
  images: {
    formats: ["image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
  },
  devIndicators: false,

  // Send the bare root and the pre-i18n paths to the default locale so older
  // links keep working after routes moved under /[locale].
  async redirects() {
    const paths = ["", "/about", "/products", "/applications", "/contact"];
    return paths.map((p) => ({
      source: p === "" ? "/" : p,
      destination: `/${defaultLocale}${p}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
