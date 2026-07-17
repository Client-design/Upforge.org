// lib/sheets.ts
// Fetches and parses live data from Google Sheets public CSV export
import { unstable_cache } from "next/cache"


export interface SheetCreator {
  id: string
  timestamp: string
  fullName: string
  instagramHandle: string
  niche: string
  followerCount: number
  followerCountRaw: string
  motivationScore: number
  howHeard: string
  comments: string
  profilePicture: string
  joinedAt: Date
  email?: string
  city?: string
}

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTmF9hQQC6sUOvzsYEelSYlvTgSWwGAQI_AiHKrqj3YissSynM_i_T8sVMkwUMAvvB38aqTNxvFxcsN/pub?output=csv"

// Convert Google Drive sharing URL to direct viewable image URL
// Google Form uploads store URLs like:
//   https://drive.google.com/open?id=FILE_ID
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// We convert to: https://drive.google.com/thumbnail?id=FILE_ID&sz=w400
function convertGoogleDriveUrl(url: string): string {
  if (!url || url.trim() === "") return ""
  const raw = url.trim()

  // Already a direct/non-drive URL — use as-is
  if (!raw.includes("drive.google.com")) return raw

  let fileId = ""

  // Format 1: /file/d/FILE_ID/view
  const fileMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) fileId = fileMatch[1]

  // Format 2: ?id=FILE_ID  or  open?id=FILE_ID
  if (!fileId) {
    const idMatch = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idMatch) fileId = idMatch[1]
  }

  if (!fileId) return raw // could not parse, return as-is

  // Use thumbnail endpoint — works without login for shared files
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`
}

// Parse follower count string to number
function parseFollowerCount(raw: string): number {
  if (!raw) return 0
  const cleaned = raw.replace(/[,\s]/g, "").toLowerCase()
  const num = parseInt(cleaned, 10)
  if (!isNaN(num)) return num

  // Handle ranges like "1000-5000" → take average
  const rangeMatch = cleaned.match(/(\d+)[-–](\d+)/)
  if (rangeMatch) {
    return Math.floor((parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2)
  }

  // Handle descriptive values
  if (cleaned.includes("1k") || cleaned.includes("1,000")) return 1000
  if (cleaned.includes("5k")) return 5000
  if (cleaned.includes("10k")) return 10000
  if (cleaned.includes("50k")) return 50000
  if (cleaned.includes("100k")) return 100000
  if (cleaned.includes("500k")) return 500000
  if (cleaned.includes("1m")) return 1000000

  return 0
}

// Parse CSV line handling quoted fields with commas
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

const fetchRawCreators = unstable_cache(
  async (): Promise<SheetCreator[]> => {
    const response = await fetch(SHEET_CSV_URL, {
      headers: {
        Accept: "text/csv,text/plain,*/*",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`)
    }

    const csvText = await response.text()
    const lines = csvText.split("\n").filter((l) => l.trim())

    if (lines.length < 2) return []

    // Skip header row (index 0), parse data rows
    const creators: SheetCreator[] = []

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i])

      // Column mapping based on form:
      // 0: Timestamp
      // 1: Full Name
      // 2: Instagram Handle
      // 3: Primary Content Niche/Category
      // 4: Current Instagram Follower Count (approximate)
      // 5: Motivation Score (1-10)
      // 6: How did you hear about us
      // 7: Additional comments
      // 8: Profile Picture (URL)

      if (cols.length < 2 || !cols[1]?.trim()) continue

      const timestamp = cols[0]?.trim() || ""
      const fullName = cols[1]?.trim() || "Anonymous"
      const rawHandle = cols[2]?.trim() || ""
      // Clean handle - remove @ prefix if present
      const instagramHandle = rawHandle.startsWith("@")
        ? rawHandle.slice(1)
        : rawHandle
      const niche = cols[3]?.trim() || "Creator"
      const followerCountRaw = cols[4]?.trim() || "0"
      const followerCount = parseFollowerCount(followerCountRaw)
      const motivationScore = parseInt(cols[5]?.trim() || "0", 10) || 0
      const howHeard = cols[6]?.trim() || ""
      const comments = cols[7]?.trim() || ""
      const profilePicture = convertGoogleDriveUrl(cols[8]?.trim() || "")

      let joinedAt: Date
      try {
        joinedAt = timestamp ? new Date(timestamp) : new Date()
        if (isNaN(joinedAt.getTime())) joinedAt = new Date()
      } catch {
        joinedAt = new Date()
      }

      const email = cols[9]?.trim() || ""
      const city = cols[10]?.trim() || ""

      creators.push({
        id: `sheet-${i}`,
        timestamp,
        fullName,
        instagramHandle,
        niche,
        followerCount,
        followerCountRaw,
        motivationScore,
        howHeard,
        comments,
        profilePicture,
        joinedAt,
        email,
        city,
      })
    }

    return creators
  },
  ["google-sheets-creators"],
  { revalidate: 300, tags: ["creators"] }
)

export async function fetchCreatorsFromSheet(): Promise<SheetCreator[]> {
  try {
    return await fetchRawCreators()
  } catch (error) {
    console.error("Error fetching creators from sheet:", error)
    return []
  }
}


// Follower bucket helper
export function getFollowerBucket(count: number): string {
  if (count === 0) return "unknown"
  if (count < 1000) return "under1k"
  if (count < 10000) return "1k-10k"
  if (count < 100000) return "10k-100k"
  return "100k+"
}

export function formatFollowerCount(count: number): string {
  if (count === 0) return "N/A"
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}
