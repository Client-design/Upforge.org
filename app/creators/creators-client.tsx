// app/creators/page.tsx

import { Metadata } from "next"
import { CreatorsClient } from "./creators-client"
import { fetchCreatorsFromSheet } from "@/lib/sheets"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Official UpForge Creator Network — Verified Creators Directory",
    description:
      "Explore the official UpForge Verified Creator Network. Discover listed creators working with UpForge, view audience reach metrics, and apply for creator listing.",
    keywords: [
      "upforge creator network",
      "verified creators directory",
      "instagram creator network",
      "upforge brand ambassadors",
      "creator directory india",
      "verified digital creators",
    ],
    alternates: {
      canonical: "https://upforge.org/creators",
    },
    openGraph: {
      title: "Official UpForge Creator Network — Verified Creators Directory",
      description:
        "Explore listed creators working with UpForge, view audience metrics, and apply for verification.",
      type: "website",
      url: "https://upforge.org/creators",
    },
  }
}

export default async function CreatorsPage() {
  const initialCreators = await fetchCreatorsFromSheet()
  return <CreatorsClient initialCreators={initialCreators} />
}

