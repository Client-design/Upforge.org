import fs from "fs"
import path from "path"

try {
  const componentsPath = path.resolve("./components")
  if (fs.existsSync(componentsPath)) {
    console.log("DIAGNOSTIC - Components Directory Structure on Vercel:")
    const items = fs.readdirSync(componentsPath)
    items.forEach(item => {
      const fullPath = path.join(componentsPath, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        console.log(`Folder: ${item}`)
        try {
          const subItems = fs.readdirSync(fullPath)
          console.log(`  Contents: ${subItems.join(", ")}`)
        } catch (subErr) {
          console.log(`  Failed to read: ${subErr.message}`)
        }
      } else {
        console.log(`File: ${item}`)
      }
    })
  } else {
    console.log("DIAGNOSTIC - Components directory not found at path:", componentsPath)
  }
} catch (err) {
  console.error("DIAGNOSTIC ERROR listing components:", err)
}

/** @type {import('next').NextConfig} */
const nextConfig = {


  // ─── IMAGE OPTIMIZATION ──────────────────────────────────────────────────
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.inc42.com" },
      { protocol: "https", hostname: "assets.inc42.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.browserstack.com" },
      { protocol: "https", hostname: "**" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 hours
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ─── COMPRESSION ────────────────────────────────────────────────────────
  compress: true,

  // ─── HEADERS ────────────────────────────────────────────────────────────
  async headers() {
    return [
      // Global security headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",       value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      // OG images - cache 1 day
      {
        source: "/og/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      // Static images - cache 1 week
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
      // Static assets (JS, CSS, fonts) - cache 1 year
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Public files - cache 1 day
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      // API routes - no cache, CORS enabled
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://www.upforge.org",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, x-upforge-domain",
          },
          {
            key: "Vary",
            value: "Origin",
          },
          {
            key: "Access-Control-Max-Age",
            value: "7200",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ]
  },

  // ─── REDIRECTS ──────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect upforge.in (no www) to www.upforge.org
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "upforge.in",
          },
        ],
        destination: "https://www.upforge.org/:path*",
        permanent: true,
      },
      // Redirect www.upforge.in to www.upforge.org
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.upforge.in",
          },
        ],
        destination: "https://www.upforge.org/:path*",
        permanent: true,
      },
    ]
  },

  // ─── GENERAL CONFIG ─────────────────────────────────────────────────────
  trailingSlash: false,
  reactStrictMode: true,

  // ─── EXPERIMENTAL ───────────────────────────────────────────────────────
  experimental: {
    optimizeCss: true,
    // Optimize package imports for smaller bundles
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
    ],
  },
}

export default nextConfig
