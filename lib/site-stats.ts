// lib/site-stats.ts
/**
 * Single source of truth for platform-wide statistics.
 * Any numeric claim regarding startup counts, verified profile counts,
 * country reach, sectors, and verified creators MUST reference this file.
 */

export const SITE_STATS = {
  verifiedStartupsCount: 1050,
  trackedStartupsCount: 47000,
  sectorCount: 30,
  countryCount: 190,
  verifiedCreatorsCount: 17,
  
  // Formatted string helpers
  get verifiedStartupsText() {
    return `${this.verifiedStartupsCount}`
  },
  get trackedStartupsText() {
    return `${this.trackedStartupsCount.toLocaleString()}+`
  },
  get sectorsText() {
    return `${this.sectorCount}+`
  },
  get countriesText() {
    return `${this.countryCount}+`
  },
  get creatorsText() {
    return `${this.verifiedCreatorsCount}`
  }
} as const
