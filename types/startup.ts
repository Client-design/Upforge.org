/**
 * Industry Registry Clusters
 * Defines specific tags for structured data expansion in the global registry.
 */
export type IndustryCluster = 'Fintech' | 'SaaS' | 'AI' | 'HealthTech' | 'E-commerce' | 'EdTech' | 'Other';

/**
 * UpForge Registry Number (UFRN)
 * Format: UF-YYYY-IND-XXXXX (e.g., UF-2026-IND-00001)
 * Used as the primary unique identifier across domains.
 */
export type UFRN = string;

export interface Startup {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo_url?: string | null;
  website?: string | null;
  founders?: string | null;
  founded_year?: number | null;
  category?: string | null;
  city?: string | null;
  status: "pending" | "approved" | "rejected";
  is_featured?: boolean;
  is_sponsored?: boolean;
  linkedin_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  created_at?: string;
  updated_at?: string | null;

  /**
   * ── UFRN (UpForge Registry Number) ──────────────────────────────────────
   * Generated server-side on approval; unique across the entire registry.
   * Required for approved startups as the primary global identifier.
   */
  ufrn?: UFRN | null;

  /**
   * ── Industry Registry Clusters ───────────────────────────────────────────
   * Added for structured data expansion as per the audit requirements.
   */
  industry_cluster?: IndustryCluster | null;
  tags?: string[] | null; // For more granular sub-industry tagging

  /**
   * ── Global registry fields ───────────────────────────────────────────────
   */
  country_code?: string | null;   // ISO 3166-1 alpha-3  e.g. "IND"
  country_name?: string | null;   // Human label         e.g. "India"
}

export interface StartupDirectoryItem {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string | null;
  founded_year?: number | null;
  category?: string | null;
  
  /**
   * UFRN is shown on listing cards as a trust signal and cross-domain primary key.
   */
  ufrn?: UFRN | null; 
  
  /**
   * Primary industry cluster for filtering and directory organization.
   */
  industry_cluster?: IndustryCluster | null;
}
