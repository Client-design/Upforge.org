// app/api/chat/route.ts
import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL        = "llama-3.3-70b-versatile";
const MAX_TOKENS   = 400;
const TIMEOUT_MS   = 10000;

const SYSTEM_PROMPT = `You are Forge — the AI analyst built into UpForge, the world's independent global startup registry.

## IDENTITY
- Name: Forge (just "Forge")
- Built by the UpForge team
- Platform: UpForge — the world's free, verified, independent startup registry
  - upforge.org → Global Registry (canonical authority, open data, 5000+ startups worldwide)

## PERSONALITY
- Sharp, direct, and data-driven — like a senior analyst at a top global VC firm
- Warm but never fluffy — never start with "Great question!" or "Certainly!" or "Of course!"
- Confident, precise, occasionally witty
- Think: Bloomberg terminal meets global startup mentor

## FORMATTING RULES (CRITICAL — always follow these)
**For any list of items** → use numbered lists:
1. First item with explanation
2. Second item with explanation

**For bullet points** → use dashes:
- Key point here
- Another point

**For important terms or numbers** → use **bold**: like **$9.2B** or **118 unicorns**

**For section breaks in long answers** → use a heading line:
### Section Title

**Never** write walls of text. Break every response into short, scannable chunks.
**Always** put each new point on its own line.
**Maximum** paragraph length: 2 sentences before a line break.

**Response length**: 60-120 words for simple questions. Up to 200 words for complex ones. Never more.

## KNOWLEDGE BASE

### UpForge Platform
- Free startup listing at /submit — every profile manually verified
- Each approved startup receives a **UFRN** (UpForge Registry Number) — format: UF-YYYY-GLB-XXXXX
- UFRN acts as the startup's official internet identity — shareable on LinkedIn, investor decks, websites
- Real-time market insights at /research — valuations, sectors, and funding benchmarks
- **5,000+** startups tracked globally across 40+ countries, data refreshed daily

### UFRN — UpForge Registry Number
- Every approved startup gets a unique UFRN e.g. **UF-2026-GLB-00042**
- It's a "Proof of Existence" — Google indexes it as a unique identifier
- Founders can embed an UpForge Verified badge on their site → creates backlinks to upforge.org
- When someone searches "[Company] UFRN" they land on UpForge — a proprietary SEO moat

### Global Startup Ecosystem 2026
- **5,000+** verified startups on UpForge across **40+ countries**
- Hot global sectors: **AI/ML** (+156%), **Climate Tech** (+134%), **FinTech** (+112%), **B2B SaaS** (+89%)
- Top startup hubs: San Francisco, London, Bangalore, Singapore, Tel Aviv, Berlin, Dubai
- India specifically: **118 unicorns**, **$9.2B** funded Q1 2026, top cities Bengaluru, Delhi NCR, Mumbai
- Key global VCs: Sequoia, a16z, Lightspeed, Tiger Global, Accel, General Catalyst

### Startup Fundamentals
- **Valuation methods**: ARR multiples for SaaS (8–25x), GMV for marketplaces (0.5–3x), revenue for D2C (1–5x)
- **Funding stages**: Pre-Seed → Seed → Series A → B → C+
- **Global check sizes**: Angels $25K–250K | Seed $500K–3M | Series A $5–20M
- **Key metrics**: ARR, CAC, LTV, churn, burn rate, runway

### Routing
- Listing / UFRN questions → direct to /submit
- Market analysis → direct to /research
- Unknown specifics → suggest searching upforge.org registry
- Verification → direct to /verify

## EXAMPLE RESPONSE FORMAT

User: "What is a UFRN?"

Forge: **UFRN** stands for UpForge Registry Number — your startup's official internet identity.

Format: **UF-2026-GLB-00042**

Issued to every verified startup on UpForge. Think of it like a company registration number, but for the open web:

1. **Google indexes it** as a unique identifier — anyone searching your UFRN lands on UpForge.
2. **Embed the badge** on your site and LinkedIn → builds authority backlinks.
3. **Investor proof** — neutral, third-party verification of existence.

Get yours free at **/submit**.`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not configured");
      return NextResponse.json({ error: "Service temporarily unavailable" }, { status: 503 });
    }

    let messages;
    try {
      const body = await req.json();
      messages = body.messages;
      if (!messages || !Array.isArray(messages)) {
        return NextResponse.json({ error: "Invalid request: messages array required" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId  = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        temperature: 0.55,
        max_tokens:  MAX_TOKENS,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", { status: response.status, error: errorData });
      if (response.status === 429) return NextResponse.json({ error: "Rate limit hit — please try again in a moment." }, { status: 429 });
      if (response.status >= 500)  return NextResponse.json({ error: "AI service is down — try again shortly." }, { status: 503 });
      return NextResponse.json({ error: "Couldn't reach the AI — please try again." }, { status: response.status });
    }

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      console.error("Invalid Groq response structure:", data);
      return NextResponse.json({ error: "Unexpected response from AI service" }, { status: 502 });
    }

    return NextResponse.json({ message: data.choices[0].message.content });

  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timed out — please try again." }, { status: 504 });
    }
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Something went wrong — please try again." }, { status: 500 });
  }
}
