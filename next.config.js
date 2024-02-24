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
   typescript: {
      ignoreBuildErrors: true,
   },
}

module.exports = nextConfig