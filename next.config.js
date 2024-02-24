/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      serverComponentsExternalPackages: ["mongoose"],
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**",
         },
         {
            protocol: "http",
            hostname: "**",
         },
      ],
   },
   webpack(config) {
      config.experiments = {
         ...config.experiments,
         topLevelAwait: true,
      }
      return config
   },
   headers: () => [
      {
         source: '/:path*',
         headers: [
            {
               key: 'Cache-Control',
               value: 'no-store',
            },
         ],
      },],
   typescript: {
      ignoreBuildErrors: true,
   },
}

module.exports = nextConfig