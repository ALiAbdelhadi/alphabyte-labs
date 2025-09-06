import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
}

const withNextIntl = createNextIntlPlugin();
module.exports = withBundleAnalyzer(withMDX(withNextIntl(nextConfig)))
