/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      // We only serve local images (/uploads, /avatar.svg, /placeholder.svg).
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   typescript: {
      ignoreBuildErrors: true,
   },
}

module.exports = nextConfig
