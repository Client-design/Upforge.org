// config/creator-network.ts
/**
 * SINGLE SOURCE OF TRUTH for UpForge Creator Network & Startup Distribution.
 * All payout rates, campaign terms, and network parameters MUST reference this file.
 * 
 * Update values here to keep outreach, contracts, and website displays perfectly synchronized.
 */

export const CREATOR_NETWORK_CONFIG = {
  // Payout rate used across outreach, contracts, and website UI
  payoutRatePerViewINR: 0.01,
  payoutRateText: "₹0.01",
  payoutRatePerThousandText: "₹10 / 1,000 views",
  payoutRateDescription: "₹0.01 per verified organic view (equivalent to ₹10 per 1,000 views)",
  payoutCadence: "Weekly",
  payoutMinimumThresholdINR: 500,

  // Campaign parameters for Startup Founders / Brands
  distribution: {
    minimumCampaignViews: 10000,
    supportedCampaignTypes: [
      {
        id: "launch",
        title: "Product Launch",
        description: "Promote new product launches, app debuts, or major version updates through tech and startup creators.",
        recommendedCreators: "3–10 Creators",
      },
      {
        id: "hiring",
        title: "Hiring & Talent Push",
        description: "Amplify engineering, product, or executive openings to targeted tech and professional audiences.",
        recommendedCreators: "2–5 Creators",
      },
      {
        id: "founder",
        title: "Founder Narrative",
        description: "Share founder vision, origin stories, or building-in-public milestones through authentic video breakdown.",
        recommendedCreators: "1–3 Creators",
      },
      {
        id: "growth",
        title: "Growth & User Acquisition",
        description: "Drive user signups and feature adoption for B2B SaaS, developer tools, or consumer platforms.",
        recommendedCreators: "5–15 Creators",
      },
    ],
    contactWhatsApp: "https://wa.link/gmntyi",
    contactEmail: "creators@upforge.org",
  },

  // Trust signals & anchors
  trust: {
    trustpilotUrl: "https://www.trustpilot.com/review/upforge.org",
    trustpilotRating: "4.8 / 5",
    googleSiteVerification: "Verified Google Site & Entity",
    upforgeRegistryUrl: "https://upforge.org/registry",
    upforgeStoriesUrl: "https://upforge.org/founder-stories",
  },

  // Creator application URL
  creatorApplicationUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfkkbdjrw11tStpTFpEaDKodYQmxUJZbpVlu8iaQJg-1HNaoQ/viewform?embedded=true",

  // Dynamic helper for total network follower reach
  calculateTotalReach(creators: { followerCount: number }[]): number {
    return creators.reduce((acc, c) => acc + (c.followerCount || 0), 0)
  },

  // Helper for honest creator count presentation
  formatLiveCreatorCount(count: number): string {
    if (count <= 0) return "Growing Network"
    return `${count} Active Verified Creators`
  },
} as const
