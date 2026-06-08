import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Static export → S3 + CloudFront (cheapest hosting, no server compute).
  output: "export",
  // Emit /en/index.html etc. so directory-style URLs map cleanly on S3.
  trailingSlash: true,
  // No Next image optimization server in a static export; we use plain <img>.
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // NOTE: security headers (X-Frame-Options, HSTS, etc.) can't be served by a
  // static export — they're applied via a CloudFront response-headers policy
  // instead. The root "/" → "/en" redirect is handled by a CloudFront Function.
};

export default withNextIntl(nextConfig);
