import type { NextConfig } from "next";
import { defaultLocale } from "./src/i18n/config";

const nextConfig: NextConfig = {
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
