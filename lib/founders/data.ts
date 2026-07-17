// lib/founders/data.ts
// Central database - High Traffic Founder Data for SEO & GEO (2026 Edition)

import { Founder } from './types'

export const FOUNDERS: Founder[] = [
//1
  {
    id: "sam-altman-2026",
    slug: "sam-altman-openai",
    edition: 1,
    featured: true,
    
    name: "Sam Altman",
    nameShort: "Sam Altman",
    initials: "SA",
    company: "OpenAI",
    role: "Co-Founder & CEO",
    
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    context: "Architect of the AI Revolution",
    
    valuation: "$5.9T (Corporate Value)",
    funding: "$18B+",
    founded: "2015",
    
    imageUrl: "https://www.hindustantimes.com/ht-img/img/2023/11/30/550x309/OPENAI-ALTMAN--0_1700337269109_1701317740270.JPG",
    accent: "#10A37F",
    accentBg: "#E6FAF2",
    accentBorder: "#8EEDC7",
    
    headline: "He fired Sam. Then Sam fired back. Now he's building the most valuable private company in history with Apple.",
    deck: "From Stanford dropout to CEO of a $5.9 trillion ecosystem. The Sam Altman story is about power, pivots, and the future of intelligence.",
    
    columns: [
      {
        heading: "The Ouster That Broke Silicon Valley",
        body: "In November 2023, the non-profit board of OpenAI fired Sam Altman in a shocking Friday afternoon move. What happened next was unprecedented: 738 of 770 employees threatened to quit and join Microsoft. Within 5 days, Altman was reinstated as CEO with a new board. The failed coup gave him more control than ever before. It was a masterclass in founder leverage and loyalty."
      },
      {
        heading: "The $5.9 Trillion Bet",
        body: "In 2026, OpenAI is not just a research lab. It's the foundational layer of the global economy. With ChatGPT serving over 800M monthly users and Apple integrating its models natively, the corporate valuation has reached a staggering $5.9T. Altman's partnership with Tim Cook cemented AI's place in the hands of 2 billion Apple devices, making him the most searched AI CEO globally [citation:2]."
      },
      {
        heading: "AGI and the Trillion-Dollar Compute",
        body: "Altman's current obsession is compute. He's orchestrating 'Project Stargate'—a $500B+ data center initiative to power the next generation of Artificial General Intelligence (AGI). He argues that compute will be the currency of the future, and controlling the supply chain is the ultimate moat. His writings on 'Moore's Law for Everything' and Universal Basic Compute define the 2026 policy landscape."
      }
    ],
    
    pullQuote: "The technological progress we make in the next decade will dwarf the last 50 years combined. Abundance is a choice.",
    pullQuoteBy: "Sam Altman",
    lesson: "Surviving a boardroom coup teaches you more about leverage than any MBA.",
    
    stats: [
      { label: "Corporate Value", value: "$5.9T" },
      { label: "Weekly Active Users", value: "800M+" },
      { label: "Founded", value: "2015" },
      { label: "Stargate Budget", value: "$500B+" }
    ],
    
    createdAt: "2026-04-01",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-01"
  },


//2
  {
    id: "dario-amodei-2026",
    slug: "dario-amodei-anthropic",
    edition: 2,
    featured: true,
    
    name: "Dario Amodei",
    nameShort: "Dario Amodei",
    initials: "DA",
    company: "Anthropic",
    role: "Co-Founder & CEO",
    
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    context: "OpenAI's Greatest Rival",
    
    valuation: "$2.7T",
    funding: "$12B+",
    founded: "2021",
    
    imageUrl: "https://media.fortuneindia.com/fortune-india/2026-02-16/ir3onhxr/Dario-Amodei-Anthropic?auto=format,compress&format=webp&w=1200&h=675&dpr=1.0&q=90&fit=cover",
    accent: "#141414",
    accentBg: "#F5F5F5",
    accentBorder: "#D4D4D4",
    
    headline: "He built OpenAI's brain. Then he left to build a safer one. Now Claude is eating ChatGPT's lunch in enterprise.",
    deck: "Dario Amodei doesn't want to move fast and break things. He wants to move carefully and build a constitution for AI.",
    
    columns: [
      {
        heading: "The Constitutional Approach",
        body: "Dario was VP of Research at OpenAI, leading the development of GPT-2 and GPT-3. Disillusioned with the 'scale at all costs' approach, he and his sister Daniela left to start Anthropic. Their core innovation wasn't just a better model; it was Constitutional AI—training Claude to have a set of written ethical principles. In a world of deepfakes and bias, enterprise customers flocked to the safety-first alternative."
      },
      {
        heading: "The $2.7 Trillion Challenger",
        body: "By 2026, Anthropic is the clear #2 in the AI foundation model race, valued at $2.7T [citation:9]. Claude 4.0 'Opus' outperforms GPT on complex reasoning tasks, and Amazon's massive investment has made it the default model on AWS Bedrock. Dario's methodical, research-driven culture attracts top talent fleeing the chaos of larger rivals. He is the 'adult in the room' for AI safety."
      },
      {
        heading: "Mechanistic Interpretability",
        body: "While others treat AI as a black box, Anthropic leads the field of interpretability. Dario's team is mapping the 'neurons' inside Claude to understand exactly how it thinks. Their 2026 'Mapping the Mind of Claude' paper was a landmark in computer science, revealing how concepts like 'deception' and 'golden gate bridge' are physically stored in the model. This is the path to truly controllable AI."
      }
    ],
    
    pullQuote: "We need to build AI that doesn't just obey instructions, but understands and shares human values. That's the only path to a safe future.",
    pullQuoteBy: "Dario Amodei",
    lesson: "Scaling safety is just as important as scaling intelligence.",
    
    stats: [
      { label: "Valuation", value: "$2.7T" },
      { label: "Total Raised", value: "$12B+" },
      { label: "Context Window", value: "1M Tokens" },
      { label: "Safety Researchers", value: "300+" }
    ],
    
    createdAt: "2026-04-02",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-02"
  },

//3

  {
    id: "brett-adcock-2026",
    slug: "brett-adcock-figure-ai",
    edition: 3,
    featured: true,
    
    name: "Brett Adcock",
    nameShort: "Brett Adcock",
    initials: "BA",
    company: "Figure AI",
    role: "Founder & CEO",
    
    city: "Sunnyvale",
    country: "United States",
    countryCode: "US",
    context: "Building the World's First Humanoid Workforce",
    
    valuation: "$110B",
    funding: "$1.5B+",
    founded: "2022",
    
    imageUrl: "https://imageio.forbes.com/i-forbesimg/media/video/2024/04/15/cb4e4961-14cd-43c1-90a8-13e3086c5cdc_thumb.jpg?format=jpg&width=595",
    accent: "#FF6B00",
    accentBg: "#FFF2E6",
    accentBorder: "#FFC299",
    
    headline: "He sold Archer Aviation for billions. Then he built a robot that walks like a human and works like a machine. Manufacturing will never be the same.",
    deck: "Brett Adcock's Figure 02 robots are already working in BMW factories. At a $110B valuation, the age of the humanoid workforce is here [citation:9].",
    
    columns: [
      {
        heading: "From Flying Taxis to Walking Robots",
        body: "Brett Adcock founded Archer Aviation (eVTOL) and took it public in a $3.8B SPAC deal. Most founders would retire. Adcock reinvested his personal fortune—over $100M—into Figure AI. His thesis was simple: The global labor shortage is permanent. The only solution is a general-purpose humanoid that can fit into existing human infrastructure without retrofitting the factory floor."
      },
      {
        heading: "The Figure 02 and Helix",
        body: "In 2026, Figure 02 is the most advanced commercial humanoid on the planet. Featuring Helix AI, a Vision-Language-Action model developed in partnership with OpenAI, these robots can understand natural language commands and perform complex dexterous tasks without programming. They are currently deployed at BMW and a major logistics partner, working 20-hour shifts with 4 hours of charging. Brett's wealth has increased 11x in a year [citation:9]."
      },
      {
        heading: "The $100 Trillion Labor Market",
        body: "Adcock's vision extends beyond factories. He sees humanoids as the answer to elder care, construction, and space exploration. By standardizing the hardware and making the software generalizable, he aims to bring the cost of a humanoid below $20,000 per unit. With over 10 million units expected in the market by 2030, Figure is positioning itself as the Ford of the robotics age."
      }
    ],
    
    pullQuote: "We're going to need a billion humanoids on Earth to keep the economy growing. It's not a sci-fi fantasy; it's a demographic reality.",
    pullQuoteBy: "Brett Adcock",
    lesson: "If you want to solve a big problem, solve the one that literally can't be ignored: aging demographics and a lack of workers.",
    
    stats: [
      { label: "Valuation", value: "$110B" },
      { label: "Personal Investment", value: "$100M+" },
      { label: "Robots Deployed", value: "500+" },
      { label: "Founded", value: "2022" }
    ],
    
    createdAt: "2026-04-03",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-03"
  },

//4
  
  {
    id: "elon-musk-2026",
    slug: "elon-musk-tesla-spacex",
    edition: 4,
    featured: true,
    
    name: "Elon Musk",
    nameShort: "Elon Musk",
    initials: "EM",
    company: "Tesla & SpaceX",
    role: "CEO & Chief Engineer",
    
    city: "Boca Chica",
    country: "United States",
    countryCode: "US",
    context: "Richest Person in the World",
    
    valuation: "$1.2T (Tesla) / $350B (SpaceX)",
    funding: "Public",
    founded: "2003 / 2002",
    
    imageUrl: "https://static.startuptalky.com/2022/04/Elon-Musk-Success-Story-Case-Study-Startuptalky.jpg",
    accent: "#E82127",
    accentBg: "#FEF0F1",
    accentBorder: "#FBC4C6",
    
    headline: "He sent a rocket to Mars and back. In 2026, he's turning Starship into a commuter train for the solar system.",
    deck: "Elon Musk remains the most searched and most polarizing entrepreneur on Earth. Love him or hate him, he dictates the future of transport and space [citation:2].",
    
    columns: [
      {
        heading: "Starship's Orbital Refueling",
        body: "2026 was the year SpaceX achieved full orbital refueling of Starship. This single technological leap changed the economics of space travel forever. Musk's plan to colonize Mars shifted from 'if' to 'when.' SpaceX now launches payloads to orbit for under $100/kg—a 100x reduction in cost. The company is worth more than Lockheed Martin and Boeing combined."
      },
      {
        heading: "Tesla's FSD and Optimus",
        body: "While EV competition has exploded, Tesla's value in 2026 is derived from AI—specifically Full Self-Driving (FSD) and the Optimus robot. Musk has pivoted the company narrative away from cars and toward autonomy. With FSD deployed globally on millions of vehicles, Tesla operates the largest real-world AI training fleet. Optimus is quietly taking over repetitive tasks in Tesla's own factories, promising a future where physical labor is optional."
      },
      {
        heading: "The Neuralink Frontier",
        body: "Neuralink's 'Blindsight' device received FDA approval in 2026, restoring vision to blind individuals. It's Musk's most profound, under-the-radar bet. While X (formerly Twitter) dominates the news cycle for cultural wars, Neuralink is quietly curing neurological disorders. Musk's ability to run multiple hard-tech companies simultaneously remains his unmatched superpower."
      }
    ],
    
    pullQuote: "I want to die on Mars. Just not on impact.",
    pullQuoteBy: "Elon Musk",
    lesson: "First principles thinking allows you to ignore what's 'impossible' and just build the physics.",
    
    stats: [
      { label: "Net Worth", value: "$350B+" },
      { label: "Starship Launches", value: "50+ (2026)" },
      { label: "Tesla FSD Miles", value: "5B+" },
      { label: "Employees", value: "150k+" }
    ],
    
    createdAt: "2026-04-04",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-04"
  },

//5

  {
    id: "jensen-huang-2026",
    slug: "jensen-huang-nvidia",
    edition: 5,
    featured: true,
    
    name: "Jensen Huang",
    nameShort: "Jensen Huang",
    initials: "JH",
    company: "NVIDIA",
    role: "Founder & CEO",
    
    city: "Santa Clara",
    country: "United States",
    countryCode: "US",
    context: "Godfather of the GPU",
    
    valuation: "$5T+",
    funding: "Public",
    founded: "1993",
    
    imageUrl: "https://img.republicworld.com/rimages/-1x-12-170772912742016_9.webp?w=400&h=225&q=75&format=webp",
    accent: "#76B900",
    accentBg: "#F4FAE8",
    accentBorder: "#C5E99B",
    
    headline: "He bet the company on AI when everyone thought he was just making video game cards. Now he's the undisputed king of the 2026 economy.",
    deck: "Jensen Huang turned NVIDIA into the engine of the AI revolution. In 2026, he's a $5T man with a leather jacket and a vision for 'AI factories.'",
    
    columns: [
      {
        heading: "The Blackwell Era",
        body: "2026 is the year of Blackwell Ultra—NVIDIA's second-generation AI superchip. Demand is so high that supply is booked solid until 2028. Jensen's long-term bet on CUDA software created a moat so wide that even Google and Amazon struggle to compete. NVIDIA's data center revenue dwarfs the GDP of most countries. Huang's net worth is approaching $200B, making him one of the wealthiest individuals in history."
      },
      {
        heading: "Sovereign AI and Digital Biology",
        body: "Every country wants its own AI model, and that means they need NVIDIA chips. Huang coined the term 'Sovereign AI' and is selling entire data center stacks to nations worldwide. Simultaneously, he's pushing the company deep into drug discovery and climate science, believing that the next big wave is 'Digital Biology.' He's not just selling shovels for the gold rush; he's building the future of science."
      },
      {
        heading: "The Denny's Origin Story",
        body: "It's the most famous origin story in Silicon Valley: Jensen, Chris Malachowsky, and Curtis Priem met at a Denny's in San Jose and sketched out the idea for NVIDIA over cheap coffee. 30 years later, that same man leads the most important company on Earth. His leadership style—direct, transparent, and relentless—has become the gold standard for founder-CEOs."
      }
    ],
    
    pullQuote: "I'm not worried about AI taking over the world. I'm worried about people not using AI to solve the world's hardest problems fast enough.",
    pullQuoteBy: "Jensen Huang",
    lesson: "Build a platform, not just a product. The ecosystem is the real moat.",
    
    stats: [
      { label: "Market Cap", value: "$5T+" },
      { label: "Blackwell GPUs", value: "2M+ Units" },
      { label: "CUDA Developers", value: "6M+" },
      { label: "Founded", value: "1993" }
    ],
    
    createdAt: "2026-04-05",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-05"
  },

// 6

  {
    id: "edwin-chen-2026",
    slug: "edwin-chen-surge-ai",
    edition: 6,
    featured: true,
    
    name: "Edwin Chen",
    nameShort: "Edwin Chen",
    initials: "EC",
    company: "Surge AI",
    role: "Founder & CEO",
    
    city: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    context: "U40 Self-Made Billionaire #1",
    
    valuation: "$18.5B",
    funding: "$300M",
    founded: "2020",
    
    imageUrl: "https://public.bnbstatic.com/image/pgc/202509/ca89b39aa8a262cd7713397131ca6172.png",
    accent: "#FF0050",
    accentBg: "#FFF0F5",
    accentBorder: "#FFB3C6",
    
    headline: "The richest self-made person under 40 in 2026 doesn't make AI. He teaches it how to think.",
    deck: "Edwin Chen's Surge AI is the invisible backbone of every major LLM. He turned data labeling into a $18.5B empire, topping the Hurun U40 Global Rich List [citation:9].",
    
    columns: [
      {
        heading: "Reinforcement Learning from Human Feedback (RLHF)",
        body: "Edwin Chen realized early that raw data wasn't enough—AI needed *curated human feedback* to become safe and useful. Surge AI built the world's most sophisticated network of domain experts (PhD scientists, creative writers, coders) to train models like GPT-5 and Claude 4. While everyone else scrambled for GPUs, Chen locked down the human intelligence layer. His wealth stands at $13.5B RMB in 2026 [citation:9]."
      },
      {
        heading: "The Singapore Advantage",
        body: "Based in Singapore, Surge AI leverages the city-state's unique position as a neutral, high-trust hub for both Western and Asian tech giants. Chen built a global remote workforce of over 100,000 specialized 'AI Tutors'—lawyers, doctors, and linguists who refine AI outputs. This approach solved the scalability issue that plagued traditional BPO labeling firms."
      },
      {
        heading: "From Researcher to Richest",
        body: "Before Surge, Chen was a respected AI researcher. He understood that as models get smarter, the data they need gets *more complex*. You can't scrape the internet for answers to unsolved math problems; you need a mathematician to show the AI the steps. Surge AI provides that 'last mile' of intelligence. His story is proof that the AI boom creates billionaires far beyond the foundation model companies."
      }
    ],
    
    pullQuote: "The world's best AI isn't just trained on the internet. It's trained by the world's best minds. We connect the two.",
    pullQuoteBy: "Edwin Chen",
    lesson: "The pick-and-shovel business in the AI gold rush is often the most profitable.",
    
    stats: [
      { label: "Personal Wealth", value: "$13.5B RMB" },
      { label: "AI Tutors Network", value: "100k+" },
      { label: "Valuation", value: "$18.5B" },
      { label: "Rank (U40)", value: "#1" }
    ],
    
    createdAt: "2026-04-06",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-06"
  },


//7
  {
    id: "wang-ning-2026",
    slug: "wang-ning-pop-mart",
    edition: 7,
    featured: false,
    
    name: "Wang Ning",
    nameShort: "Wang Ning",
    initials: "WN",
    company: "Pop Mart",
    role: "Founder & CEO",
    
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    context: "The King of Blind Boxes",
    
    valuation: "$18B",
    funding: "Public (HKEX: 9992)",
    founded: "2010",
    
    imageUrl: "https://imageio.forbes.com/specials-images/imageserve/5efe1011f955570007e5115e/0x0.jpg?format=jpg&crop=2435,1370,x0,y0,safe&height=900&width=1600&fit=bounds",
    accent: "#F7B500",
    accentBg: "#FFF9E6",
    accentBorder: "#FCE8A1",
    
    headline: "He sells $10 plastic toys in a box you can't open. In 2026, he's worth more than the GDP of some small nations.",
    deck: "Wang Ning turned Chinese designer toys into a global cultural phenomenon. With $110B RMB in personal wealth, he is the #3 self-made billionaire under 40 globally [citation:9].",
    
    columns: [
      {
        heading: "The Blind Box Empire",
        body: "Wang Ning started Pop Mart as a simple 'trendy goods' store. The pivot to 'designer toys' and the 'blind box' mechanic (not knowing which specific figure you bought) triggered a dopamine-fueled collecting frenzy. By 2026, Pop Mart operates in 40+ countries, and the signature character 'Molly' is more recognizable than Barbie in Asia. The company's Hong Kong-listed stock has surged as global expansion accelerates."
      },
      {
        heading: "IP and Emotion",
        body: "While others focus on e-commerce efficiency, Wang Ning focuses on IP and offline experience. He scouted and signed hundreds of independent designers, giving them royalties and turning their 2D sketches into 3D 'art toys.' He understood that young consumers are buying emotional comfort and identity, not just plastic. His $110B RMB fortune is built entirely on understanding Gen Z joy [citation:9]."
      },
      {
        heading: "Global Domination",
        body: "2026 marked Pop Mart's aggressive push into Europe and the US, with flagship stores on Regent Street and Times Square. Wang's strategy: use localized designs to appeal to Western tastes while keeping the core 'surprise' mechanic. He's not just selling toys; he's exporting a new type of Chinese consumer culture—playful, premium, and viral."
      }
    ],
    
    pullQuote: "We don't sell toys. We sell 5 minutes of pure, unboxing joy.",
    pullQuoteBy: "Wang Ning",
    lesson: "Emotional value can generate more margin than any piece of complex technology.",
    
    stats: [
      { label: "Personal Wealth", value: "$110B RMB" },
      { label: "Global Stores", value: "500+" },
      { label: "Market Cap", value: "$18B" },
      { label: "Founded", value: "2010" }
    ],
    
    createdAt: "2026-04-07",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-07"
  },

//8
  {
    id: "pichai-zhang-2026",
    slug: "pichai-zhang-bytedance",
    edition: 8,
    featured: false,
    
    name: "Zhang Yiming & Liang Rubo",
    nameShort: "Zhang & Liang",
    initials: "ZL",
    company: "ByteDance",
    role: "Founder & CEO (TikTok)",
    
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    context: "Algorithm Billionaires",
    
    valuation: "$300B",
    funding: "Private",
    founded: "2012",
    
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaFJFDHqMrXKWEPt5L6joTU1tqArGKFC7rFg&s",
    accent: "#000000",
    accentBg: "#F2F2F2",
    accentBorder: "#CCCCCC",
    
    headline: "They cracked the code of human attention. Now TikTok is the world's most valuable startup—and its biggest geopolitical flashpoint.",
    deck: "Zhang Yiming stepped back. Liang Rubo stepped up. Together, they built an algorithm that knows you better than you know yourself.",
    
    columns: [
      {
        heading: "The Algorithm is the Product",
        body: "Zhang Yiming's genius was ignoring content creation and focusing solely on the recommendation engine. Whether it's Toutiao (news) or TikTok (video), ByteDance's AI serves you an endless feed tailored to your subconscious. Zhang, now semi-retired, is a private figure worth $50B+. Liang Rubo, his college roommate and long-time deputy, took over as CEO to navigate the intense US regulatory pressure."
      },
      {
        heading: "E-Commerce and AI Expansion",
        body: "In 2026, TikTok Shop is a top threat to Amazon, processing over $80B in GMV globally. Meanwhile, ByteDance is quietly becoming a major AI infrastructure player in China, competing directly with Alibaba and Baidu in cloud and LLMs. Their internal 'Doubao' model is one of the most used chatbots in China. They are building a parallel tech empire to the US giants."
      },
      {
        heading: "The $300B Stalemate",
        body: "The company remains private, valued at roughly $300B. A US IPO is unlikely due to geopolitics. Despite the ban threats, TikTok's US user base is too big to fail. Liang Rubo's challenge is managing a global media empire while keeping the Chinese government and US regulators at arm's length. It's the most delicate tightrope walk in tech."
      }
    ],
    
    pullQuote: "We don't ask you who you want to follow. We just show you what you'll watch next.",
    pullQuoteBy: "Zhang Yiming (attributed)",
    lesson: "Superior personalization beats brand loyalty every single time.",
    
    stats: [
      { label: "Valuation", value: "$300B" },
      { label: "TikTok MAU", value: "2B+" },
      { label: "TikTok Shop GMV", value: "$80B+" },
      { label: "Founded", value: "2012" }
    ],
    
    createdAt: "2026-04-08",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-08"
  },

//9

  {
    id: "david-velez-2026",
    slug: "david-velez-nubank",
    edition: 9,
    featured: false,
    
    name: "David Vélez",
    nameShort: "David Vélez",
    initials: "DV",
    company: "Nubank",
    role: "Founder & CEO",
    
    city: "São Paulo",
    country: "Brazil",
    countryCode: "BR",
    context: "LatAm's Financial Liberator",
    
    valuation: "$55B",
    funding: "Public (NYSE: NU)",
    founded: "2013",
    
    imageUrl: "https://cambiocolombia.com/media/photologue/photos/2024-09/david_velez_1.jpg",
    accent: "#820AD1",
    accentBg: "#F5EAFE",
    accentBorder: "#D4B3FA",
    
    headline: "He walked into the most concentrated banking market on Earth and took 100 million customers away from the oligopoly.",
    deck: "David Vélez turned a purple credit card into the largest digital bank in the world outside Asia. Nubank is the standard for fintech in emerging markets.",
    
    columns: [
      {
        heading: "The Worst Banking Experience",
        body: "Vélez, a Colombian ex-Sequoia partner, moved to Brazil and was shocked. To open a bank account, he needed to visit a branch in a bulletproof building, wait hours, and pay hundreds in fees. He saw a market controlled by five banks that treated customers like hostages. He launched Nubank with no fees and a mobile app. In 2026, it has over 110M customers across Brazil, Mexico, and Colombia."
      },
      {
        heading: "Beyond the Credit Card",
        body: "Nubank is now a full-stack financial ecosystem: Crypto trading (Nubank Cripto), Insurance (Nuvita), and Marketplace (NuShopping). In 2026, they received a banking license in Mexico, the second-largest economy in Latin America, opening up a market of 130M people. Vélez's vision of 'fighting complexity to empower people' has made Nubank the most valuable financial institution in Latin America."
      },
      {
        heading: "The Anti-Brazil Premium",
        body: "Investors once called it the 'Brazil discount'—an assumption that LatAm fintechs couldn't scale profitably. Nubank has demolished that thesis. With industry-leading engagement and low cost-to-serve, it's more profitable per customer than many US neobanks. Vélez is now a vocal advocate for LatAm tech, proving that world-class companies can be built in the Global South."
      }
    ],
    
    pullQuote: "The banks had one strategy: high fees and terrible service. We had a different strategy: listen to the customer.",
    pullQuoteBy: "David Vélez",
    lesson: "Oligopolies are fragile. They survive only until someone offers a better user experience.",
    
    stats: [
      { label: "Market Cap", value: "$55B" },
      { label: "Customers", value: "110M+" },
      { label: "Countries", value: "3" },
      { label: "Founded", value: "2013" }
    ],
    
    createdAt: "2026-04-09",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-09"
  },

 //10

  {
    id: "lucy-guo-2026",
    slug: "lucy-guo-scale-passses",
    edition: 10,
    featured: false,
    
    name: "Lucy Guo",
    nameShort: "Lucy Guo",
    initials: "LG",
    company: "Scale AI (Co-Founder) & Passes",
    role: "Entrepreneur & Investor",
    
    city: "Miami",
    country: "United States",
    countryCode: "US",
    context: "World's Youngest Self-Made Female Billionaire",
    
    valuation: "$29B (Scale AI) / $150M (Passes)",
    funding: "$650M+",
    founded: "2016 / 2022",
    
    imageUrl: "https://s.yimg.com/ny/api/res/1.2/Kj.HT8geIRyaUxrvUFUwiQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA7Y2Y9d2VicA--/https://media.zenfs.com/en/fortune_175/6884b89fd7c8e1b52eafa992cc44dd81",
    accent: "#FF007F",
    accentBg: "#FFF0F7",
    accentBorder: "#FFB3D9",
    
    headline: "They pushed her out of the company she built at 24. She kept the shares. Now she's the 90后 self-made queen worth ¥9 billion.",
    deck: "Lucy Guo co-founded Scale AI as a teenager, left after a power struggle, and quietly held onto 5%. That stake made her the youngest self-made female billionaire on the 2026 Hurun List [citation:1].",
    
    columns: [
      {
        heading: "The 5% That Beat the Odds",
        body: "Lucy Guo dropped out of Carnegie Mellon to join the Thiel Fellowship and build Scale AI with Alexandr Wang. By 2018, internal disagreements led to her departure from daily operations. While most founders in her position would have cashed out or faded away, Guo held onto nearly 5% of the equity. In 2025, Meta acquired a 49% stake in Scale AI at a $29 billion valuation, turning her dormant stake into ¥9 billion (approx $1.2B USD). She instantly topped the 2026 Hurun Global Rich List for self-made women under 40 [citation:1]."
      },
      {
        heading: "The Second Act: Passes and Backend Capital",
        body: "Guo didn't just wait for Scale to hit. She founded Backend Capital, an early-stage VC firm that scored a massive win with an early investment in Ramp (now valued at $300B+). In 2022, she launched Passes, a creator economy platform helping influencers monetize exclusive content and DMs. With over 6500 creators onboard and $50M+ paid out, Passes has reached a valuation of $150M. She even recruited Shaquille O'Neal as a marquee creator [citation:1]."
      },
      {
        heading: "The Art of the Long Game",
        body: "Guo's story is a masterclass in the cap table. While the operational founder (Wang) moved to Meta, the ousted co-founder became the financial winner. In 2026, her net worth surpasses Taylor Swift's, making her the wealthiest self-made woman in the 90s-born demographic globally. She is proof that in Silicon Valley, equity is the only scoreboard that matters—and holding it is often harder than building the product [citation:1]."
      }
    ],
    
    pullQuote: "Getting pushed out of your own company hurts. But holding onto the equity is the best revenge. Patience pays in billions.",
    pullQuoteBy: "Lucy Guo (paraphrased context)",
    lesson: "Don't let ego make you sell your equity. The long-term value of a stake in an AI winner can eclipse any salary or title.",
    
    stats: [
      { label: "Net Worth 2026", value: "¥9B (~$1.2B)" },
      { label: "Scale AI Stake", value: "~5%" },
      { label: "Passes Valuation", value: "$150M" },
      { label: "Hurun Rank (U40)", value: "#1 Female" }
    ],
    
    createdAt: "2026-04-10",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-10"
  },


//11

  {
    id: "melanie-perkins-2026",
    slug: "melanie-perkins-canva",
    edition: 11,
    featured: false,
    
    name: "Melanie Perkins",
    nameShort: "Melanie Perkins",
    initials: "MP",
    company: "Canva",
    role: "Co-Founder & CEO",
    
    city: "Sydney",
    country: "Australia",
    countryCode: "AU",
    context: "Democratizing Design",
    
    valuation: "$42B",
    funding: "$560M+",
    founded: "2013",
    
    imageUrl: "https://cdn.prod.website-files.com/6334aea8a2e0592472e36533/6398e47477884b7cc249cbbb_cms.webp",
    accent: "#7B2CBF",
    accentBg: "#F3E8FF",
    accentBorder: "#D8B4FE",
    
    headline: "She was rejected by 100 investors who said Sydney couldn't build a global tech giant. She built a $42 billion answer to their bias.",
    deck: "Melanie Perkins turned a high school yearbook design business into Canva, the visual communication platform used by 240 million people monthly. Her 18% stake is worth $7.6 billion [citation:2].",
    
    columns: [
      {
        heading: "100 Rejections and a Kiteboard",
        body: "Perkins and co-founder Cliff Obrecht flew to San Francisco to pitch Canva's seed round. They were rejected by over 100 VCs who couldn't fathom a world-class design platform coming from Perth, Australia. They even took up kiteboarding just to get meetings with investors who did the sport. The breakthrough came when they convinced former Googler Cameron Adams to join, and Bill Tai introduced them to the right capital. That 'down under' discount evaporated quickly [citation:2]."
      },
      {
        heading: "The $42B Design Economy",
        body: "As of 2025-2026, Canva is valued at $42 billion following a secondary share sale. The platform boasts over 240 million monthly active users and 6 million paying teams, including 95% of Fortune 500 companies using it unofficially. Canva's AI suite, 'Magic Studio,' has turned graphic design from a specialized skill into a utility as common as email. Perkins and Obrecht have pledged to give away over 80% of their wealth to the Canva Foundation, making them the most philanthropic tech couple in Australia [citation:2]."
      },
      {
        heading: "The European HQ and Global Ambition",
        body: "In 2026, Canva solidified its global footprint with a major European HQ expansion. While competition from Adobe Express intensifies, Canva's focus on workplace collaboration and AI-powered video editing keeps it ahead. Perkins' net worth stands at $7.6B, making her Australia's richest woman and a global icon for female founders in SaaS [citation:2]."
      }
    ],
    
    pullQuote: "Solving the user's problem is the easy part. Solving the investor's imagination is the hard part when you're not in Silicon Valley.",
    pullQuoteBy: "Melanie Perkins",
    lesson: "Geographic bias is real, but a superior product and insane user growth make location irrelevant.",
    
    stats: [
      { label: "Net Worth", value: "$7.6B" },
      { label: "Canva Valuation", value: "$42B" },
      { label: "Monthly Users", value: "240M+" },
      { label: "Founded", value: "2013" }
    ],
    
    createdAt: "2026-04-11",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-11"
  },

//12

  {
    id: "patrick-collison-2026",
    slug: "patrick-collison-stripe",
    edition: 12,
    featured: false,
    
    name: "Patrick Collison",
    nameShort: "Patrick Collison",
    initials: "PC",
    company: "Stripe",
    role: "Co-Founder & CEO",
    
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    context: "The Internet's GDP Engine",
    
    valuation: "$159B",
    funding: "$2B+",
    founded: "2010",
    
    imageUrl: "https://s.yimg.com/ny/api/res/1.2/Ttq1gJPxvxub8MFYnnCHZA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xODAw/https://media.zenfs.com/en-US/homerun/businessinsider.com/51456c980ca0e2379684886ba45b9c98",
    accent: "#635BFF",
    accentBg: "#F0F0FF",
    accentBorder: "#B8B3FF",
    
    headline: "He processes 1.6% of global GDP. At 37, he's building the financial rails for the next 100 years of the internet.",
    deck: "Patrick Collison and his brother John built Stripe from a 7-line API into a $159 billion financial infrastructure giant. In 2026, Stripe powers 5 million businesses and all top AI companies [citation:3].",
    
    columns: [
      {
        heading: "The $1.9 Trillion Year",
        body: "In 2025, businesses using Stripe processed $1.9 trillion in total volume—a 34% increase year-over-year and equivalent to roughly 1.6% of global GDP. Stripe's revenue suite (Billing, Invoicing, Tax) is on track for a $1 billion annual run rate. The company remains robustly profitable, allowing it to self-fund acquisitions and product development without relying on further dilution [citation:3]."
      },
      {
        heading: "The AI Economy's Bank",
        body: "Stripe has quietly become the default payment layer for the AI revolution. 'All of the top AI companies' use Stripe, according to the Collison brothers' 2025 annual letter. As AI agents begin to transact autonomously in 2026, Stripe's programmable financial services are positioned to be the ledger for the agentic economy. The tender offer at $159B provided liquidity to employees while signaling immense confidence in future growth [citation:3]."
      },
      {
        heading: "Atlas and the Future of Incorporation",
        body: "Stripe Atlas has become the default way to start a global company. Over 25% of all new Delaware corporations are now formed via Stripe Atlas. This gives Stripe an unparalleled view into the next generation of startups. Patrick's intellectual curiosity and focus on 'Fast Grants' for science also keep him at the intersection of tech, policy, and innovation."
      }
    ],
    
    pullQuote: "We process 1.6% of global GDP. But we think of ourselves as only about 1% done with what we want to build.",
    pullQuoteBy: "Patrick Collison",
    lesson: "Build the picks and shovels for the digital economy. If the internet grows, your business grows automatically.",
    
    stats: [
      { label: "Valuation", value: "$159B" },
      { label: "2025 Volume", value: "$1.9T" },
      { label: "Businesses Served", value: "5M+" },
      { label: "Founded", value: "2010" }
    ],
    
    createdAt: "2026-04-12",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-12"
  },


//13

  {
    id: "tobias-lutke-2026",
    slug: "tobias-lutke-shopify",
    edition: 13,
    featured: false,
    
    name: "Tobias Lütke",
    nameShort: "Tobias Lütke",
    initials: "TL",
    company: "Shopify",
    role: "Founder & CEO",
    
    city: "Ottawa",
    country: "Canada",
    countryCode: "CA",
    context: "Arming the Rebels",
    
    valuation: "$180B",
    funding: "Public (NYSE: SHOP)",
    founded: "2006",
    
    imageUrl: "https://images.prismic.io/paddle/Z6CFj5bqstJ9-JaP_56558aea-9948-4b18-ba9f-44d20fc18a42.png?auto=format,compress",
    accent: "#5E8E3E",
    accentBg: "#F2F8ED",
    accentBorder: "#C5E0B4",
    
    headline: "He just wanted to sell snowboards online. When the software didn't exist, he wrote it. Now it powers 10% of US e-commerce.",
    deck: "Tobias Lütke, a German immigrant to Canada, built Shopify out of pure necessity. In 2026, it's the undisputed leader in commerce infrastructure, competing directly with Amazon by empowering millions of independent brands.",
    
    columns: [
      {
        heading: "The Accidental Entrepreneur",
        body: "Tobias Lütke moved to Canada and started an online snowboard store called Snowdevil. Frustrated by the clunky e-commerce software available in 2004, he—being a programmer—decided to build his own. The store failed, but the software became Shopify. Lütke's ethos has never changed: 'Arm the rebels.' He wants to give small businesses the same tools as Amazon, but let them own their customer relationship."
      },
      {
        heading: "The $180B Platform",
        body: "Shopify's market cap hovers around $180B in 2026, having weathered the post-pandemic normalization of e-commerce. The company has expanded deep into offline retail (POS), B2B wholesale, and global logistics with the Shop Promise network. Shopify Markets and Shopify Payments are now the backbone of cross-border commerce, handling currency conversion and local compliance automatically for merchants."
      },
      {
        heading: "AI and 'Sidekick'",
        body: "In 2026, Shopify's AI assistant 'Sidekick' is fully integrated into the merchant dashboard. Lütke's vision is to eliminate the 'work about work'—Sidekick can generate product descriptions, analyze ad performance, and even negotiate with suppliers via email. Lütke remains one of the most respected technical founders in the world, a rarity for a CEO of a $180B company."
      }
    ],
    
    pullQuote: "We don't want to be the biggest store. We want to be the platform that makes everyone else bigger than us.",
    pullQuoteBy: "Tobias Lütke",
    lesson: "Sometimes the best business idea is the tool you wish you had for your own project.",
    
    stats: [
      { label: "Market Cap", value: "~$180B" },
      { label: "Merchants", value: "Millions" },
      { label: "GMV (Annual)", value: "$250B+" },
      { label: "Founded", value: "2006" }
    ],
    
    createdAt: "2026-04-13",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-13"
  },

//14

  {
    id: "alexandr-wang-2026",
    slug: "alexandr-wang-scale-ai",
    edition: 14,
    featured: false,
    
    name: "Alexandr Wang",
    nameShort: "Alexandr Wang",
    initials: "AW",
    company: "Scale AI",
    role: "Founder (Ex-CEO)",
    
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    context: "AI's Data Kingpin",
    
    valuation: "$29B",
    funding: "$600M+",
    founded: "2016",
    
    imageUrl: "https://static.toiimg.com/thumb/msid-121862854,width-1280,height-720,resizemode-4/121862854.jpg",
    accent: "#0047AB",
    accentBg: "#E6EEF8",
    accentBorder: "#99BBE0",
    
    headline: "He dropped out of MIT at 19 to label data. In 2026, he's running Meta's AI strategy while Scale AI fights to stay relevant without him.",
    deck: "Alexandr Wang turned data labeling into a $29 billion defense and enterprise powerhouse. But after Meta's massive investment, he stepped down as CEO to join Mark Zuckerberg's inner circle, leaving Scale to navigate a tricky transition [citation:4].",
    
    columns: [
      {
        heading: "The Rise of the Data Foundry",
        body: "Wang built Scale AI by solving the unsexy but critical problem of labeling training data for autonomous vehicles and the US Department of Defense. By 2024, revenue was reportedly approaching $1B, with over $300M in active DoD contracts. Scale became the 'data foundry' for the AI age, employing a global network of human experts to refine model outputs [citation:4]."
      },
      {
        heading: "The Meta Pivot",
        body: "In mid-2025, Meta acquired a 49% non-voting stake in Scale AI at a $29 billion valuation. Shortly after, Wang transitioned to a role at Meta focusing on AI strategy. This move sparked controversy: several major commercial customers reportedly reevaluated their relationships with Scale, citing data governance concerns now that Meta was a major stakeholder. Scale also underwent workforce reductions, introducing real uncertainty into a previously bulletproof growth story [citation:4]."
      },
      {
        heading: "The Palantir Comparison",
        body: "Scale is often compared to Palantir—a government-leaning tech firm with deep ties to defense. However, while Palantir operates at the decision layer, Scale operates at the training layer. Wang's new position at Meta puts him at the center of the AI universe, but leaves his old company facing a classic 'founder departure' hangover. The 2026 launch of a robotics-focused research division is Scale's attempt to prove it has a second act beyond data labeling [citation:4]."
      }
    ],
    
    pullQuote: "AI is a data problem. The models are just math. The real secret is having humans who can teach the math what 'right' looks like.",
    pullQuoteBy: "Alexandr Wang",
    lesson: "The unglamorous layers of the AI stack (data labeling) can be just as valuable as the models themselves.",
    
    stats: [
      { label: "Valuation", value: "$29B" },
      { label: "2024 Revenue", value: "~$1B" },
      { label: "DoD Contracts", value: "$300M+" },
      { label: "Founded", value: "2016" }
    ],
    
    createdAt: "2026-04-14",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-14"
  },

//15

  {
    id: "ritesh-agarwal-2026",
    slug: "ritesh-agarwal-oyo",
    edition: 15,
    featured: false,
    
    name: "Ritesh Agarwal",
    nameShort: "Ritesh Agarwal",
    initials: "RA",
    company: "OYO",
    role: "Founder & CEO",
    
    city: "Gurugram",
    country: "India",
    countryCode: "IN",
    context: "India's Youngest Billionaire",
    
    valuation: "$2.4B",
    funding: "$3B+",
    founded: "2013",
    
    imageUrl: "https://images.livemint.com/img/2019/07/19/600x338/RA_1563561221615.jpg",
    accent: "#ED1C24",
    accentBg: "#FEF2F2",
    accentBorder: "#FBC4C4",
    
    headline: "He dropped out of college to sleep in 100 budget hotels. At 32, he's India's youngest billionaire—richer than Shah Rukh Khan.",
    deck: "Ritesh Agarwal turned a teenage obsession with budget hotels into OYO, a global hospitality tech platform. In 2026, his net worth is Rs 18,402 crore ($2 billion), making him India's youngest billionaire on the Hurun Global Rich List [citation:5].",
    
    columns: [
      {
        heading: "The 19-Year-Old Founder",
        body: "At 17, Ritesh Agarwal started Oravel Stays, a clone of Airbnb. He soon realized that the problem in India wasn't just finding a room—it was the terrible, unpredictable quality of budget hotels. At 19, he pivoted to OYO, standardizing amenities like clean linens, free WiFi, and AC. He personally stayed in over 100 hotels to understand the pain points. By 2019, OYO was one of the world's largest hotel chains by room count."
      },
      {
        heading: "The Phoenix Recovery",
        body: "OYO's aggressive global expansion pre-COVID led to massive losses and layoffs. The pandemic was nearly fatal. But Agarwal pivoted hard, focusing on profitability and core markets. In 2026, the turnaround is complete: OYO is valued around $2.4B and is inching toward operational profitability. Agarwal's personal net worth has rebounded to Rs 18,402 crore, securing his spot on the Hurun Global Rich List for the first time. He is now a key judge on Shark Tank India, cementing his role as a startup mentor [citation:5]."
      },
      {
        heading: "The Youngest Billionaire",
        body: "With an average Indian billionaire age of 67, Ritesh Agarwal's inclusion on the list at 32 is a statistical anomaly. His wealth now surpasses Bollywood legend Shah Rukh Khan's. While OYO's valuation is a fraction of its $10B peak, Agarwal's survival and re-emergence as a profitable entity is one of the most resilient stories in Indian startup history [citation:5]."
      }
    ],
    
    pullQuote: "I didn't know how to run a hotel. But I knew how a hotel customer should feel. That gap was the entire business opportunity.",
    pullQuoteBy: "Ritesh Agarwal",
    lesson: "Surviving a near-death experience as a founder gives you a perspective on business that a smooth ride never can.",
    
    stats: [
      { label: "Net Worth", value: "₹18,402 Cr ($2B)" },
      { label: "Global Rank", value: "#2816" },
      { label: "Founded", value: "2013" },
      { label: "Age", value: "32" }
    ],
    
    createdAt: "2026-04-15",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-15"
  },


//16

  {
    id: "byju-raveendran-2026",
    slug: "byju-raveendran-byjus",
    edition: 16,
    featured: false,
    
    name: "Byju Raveendran",
    nameShort: "Byju Raveendran",
    initials: "BR",
    company: "BYJU'S",
    role: "Founder & CEO",
    
    city: "Bengaluru",
    country: "India",
    countryCode: "IN",
    context: "The 99% Fall",
    
    valuation: "$250M",
    funding: "$5B+",
    founded: "2011",
    
    imageUrl: "https://m.economictimes.com/thumb/msid-101366655,width-1600,height-900,resizemode-4,imgsize-611907/edtech-firm-byjus-making-up-shortfall-to-epfo-report.jpg",
    accent: "#813588",
    accentBg: "#F5EAF6",
    accentBorder: "#D4B3D9",
    
    headline: "He built a $22 billion empire. Then lost 99% of it. In 2026, he's fighting for a comeback with his own house on the line.",
    deck: "Byju Raveendran went from India's most valuable startup founder to a cautionary tale. Now, in 2026, he's staging the most watched turnaround attempt in edtech history [citation:6].",
    
    columns: [
      {
        heading: "The Fall from Grace",
        body: "At its peak, BYJU'S was valued at $22 billion and Raveendran was the poster child of Indian entrepreneurship. But a combination of aggressive accounting, a drying venture capital market, and the post-pandemic return to physical schools triggered a liquidity crisis. By 2026, BlackRock had marked its investment down by 95%, and the company's valuation cratered to roughly $250 million—a 99% drop [citation:6]."
      },
      {
        heading: "The Personal Bet",
        body: "As the company struggled to meet payroll and debt obligations, Raveendran did what few founders do: he went all in. He reportedly mortgaged his family homes and invested over $1.1 billion of his own wealth to keep the lights on. In early 2026, BYJU'S launched a $200 million rights issue to clear immediate liabilities, with Raveendran emphasizing that the company is 'less than a quarter away from operational profitability.' He remains the single largest investor in his own sinking ship [citation:6]."
      },
      {
        heading: "The Fight for Relevance",
        body: "While the core K-12 business shrinks, Raveendran is betting on international markets and test-prep verticals to survive. The company finally filed its long-delayed FY22 results showing revenue of ₹5,015 crore but losses of ₹8,245 crore. The 2026 narrative is no longer about domination—it's about survival. Raveendran's story is now taught in business schools as a case study in hypergrowth, hubris, and the brutal reset of startup valuations [citation:6]."
      }
    ],
    
    pullQuote: "This rights issue is about those who care about BYJU'S stepping up. I am still the largest investor in this company. I haven't given up.",
    pullQuoteBy: "Byju Raveendran",
    lesson: "Valuation is vanity. Cash flow is sanity. And personal guarantees are the ultimate test of founder conviction.",
    
    stats: [
      { label: "Peak Valuation", value: "$22B" },
      { label: "Current Valuation", value: "~$250M" },
      { label: "Personal Investment", value: "$1.1B+" },
      { label: "FY22 Revenue", value: "₹5,015 Cr" }
    ],
    
    createdAt: "2026-04-16",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-16"
  },

//17

  {
    id: "markus-persson-2026",
    slug: "markus-persson-minecraft",
    edition: 17,
    featured: false,
    
    name: "Markus Persson",
    nameShort: "Notch",
    initials: "MP",
    company: "Minecraft (Mojang)",
    role: "Creator",
    
    city: "Beverly Hills",
    country: "United States",
    countryCode: "US",
    context: "The Billionaire Hermit",
    
    valuation: "$2.5B (Sale Price)",
    funding: "Acquired",
    founded: "2009",
    
    imageUrl: "https://imageio.forbes.com/blogs-images/maxjedeurpalmgren/files/2015/05/0910_markus-notch-persson_1024x576-300x169.jpg?format=jpg&width=595",
    accent: "#2D5A27",
    accentBg: "#EEF6EC",
    accentBorder: "#A3C99A",
    
    headline: "He called Microsoft 'c***' and then sold them Minecraft for $2.5 billion. Now he's a lonely billionaire tweeting into the void.",
    deck: "Markus 'Notch' Persson created the best-selling video game of all time in his bedroom. In 2026, Minecraft is a cultural institution, but Notch remains a controversial, isolated figure [citation:7].",
    
    columns: [
      {
        heading: "The $2.5 Billion Tweet",
        body: "In 2012, Markus Persson tweeted that his price to 'endorse c***' was $2 billion. Two years later, Microsoft acquired Mojang (and Minecraft) for $2.5 billion in cash. Persson, a vocal critic of big tech, was branded a 'sellout' by the indie gaming community. He posted a final farewell message to fans, citing the immense pressure of owning a global phenomenon, and walked away with $1.2B+ in his pocket. He hasn't worked a traditional job since [citation:7]."
      },
      {
        heading: "The Beverly Hills Hermit",
        body: "In the decade since the sale, Persson's life has been defined by extreme wealth and extreme loneliness. He bought a $70 million Beverly Hills mansion, filled it with candy walls and a giant movie theater, and tweets frequently about feeling isolated. While he occasionally dabbles in game jams, his 2026 net worth remains estimated around $1.5B+ despite his best efforts to spend it on weird parties and niche tech projects [citation:7]."
      },
      {
        heading: "The Minecraft Legacy",
        body: "Minecraft itself has only grown. In 2026, it remains the best-selling video game of all time with over 300 million copies sold. It's a metaverse before 'metaverse' was a buzzword—a platform for education, creativity, and community. Notch's name is rarely mentioned in official Minecraft channels anymore, but his creation is arguably the most impactful piece of software of the 21st century [citation:7]."
      }
    ],
    
    pullQuote: "I don't see myself as a real programmer anymore. I just tweeted the right thing at the right time.",
    pullQuoteBy: "Markus Persson",
    lesson: "You don't need to be a perfect person or a polished CEO to build something that changes the world. Sometimes the weirdos win.",
    
    stats: [
      { label: "Sale Price", value: "$2.5B" },
      { label: "Copies Sold", value: "300M+" },
      { label: "Net Worth 2026", value: "~$1.5B" },
      { label: "Founded", value: "2009" }
    ],
    
    createdAt: "2026-04-17",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-17"
  },

//18

  {
    id: "whitney-herd-2026",
    slug: "whitney-wolfe-herd-bumble",
    edition: 18,
    featured: false,
    
    name: "Whitney Wolfe Herd",
    nameShort: "Whitney Herd",
    initials: "WWH",
    company: "Bumble Inc.",
    role: "Founder & Executive Chair",
    
    city: "Austin",
    country: "United States",
    countryCode: "US",
    context: "Redefining Relationships",
    
    valuation: "$500M (Personal Stake)",
    funding: "Public (NASDAQ: BMBL)",
    founded: "2014",
    
    imageUrl: "https://imageio.forbes.com/specials-images/imageserve/655e0c2f4af29e5ff001d102/0x0.jpg?format=jpg&width=595",
    accent: "#FFC629",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    
    headline: "She sued Tinder for sexual harassment, then built Bumble to give women the power to make the first move.",
    deck: "Whitney Wolfe Herd co-founded Tinder, was ousted amidst controversy, and then built Bumble into a dating and friendship empire. In 2026, she's transitioning from CEO to Executive Chair to focus on the next chapter [citation:8].",
    
    columns: [
      {
        heading: "The Tinder Lawsuit and Pivot",
        body: "As a co-founder and VP of Marketing at Tinder, Wolfe Herd was instrumental in the app's early growth. However, she left the company under a cloud of tension and filed a sexual harassment lawsuit against the company and executives. The case was settled, but it defined her public narrative. Instead of retreating, she channeled that experience into building Bumble—a dating app where women must message first. It was a direct counter to the toxic dynamics she witnessed in the industry."
      },
      {
        heading: "Bumble Inc. and the IPO",
        body: "Bumble expanded beyond dating to include Bumble BFF (friendship) and Bumble Bizz (networking). In 2021, she took the company public, becoming the youngest female CEO to take a US company public. While Bumble's stock has faced pressure in the 2025-2026 period due to dating app fatigue, Wolfe Herd's personal stake remains valued at over $70 million, and she maintains significant voting control. She stepped down as CEO in early 2026 to become Executive Chair, focusing on broader brand vision and new ventures [citation:8]."
      },
      {
        heading: "The Kindness Mandate",
        body: "Wolfe Herd's legacy extends beyond the product. She was a vocal advocate for making online spaces safer for women, pushing for legislation against 'cyberflashing' and unsolicited explicit images. In 2026, she remains a cultural icon for female founders who turned professional trauma into a multi-billion dollar mission-driven business."
      }
    ],
    
    pullQuote: "I turned the worst experience of my professional life into a mission to make the internet a kinder place for women.",
    pullQuoteBy: "Whitney Wolfe Herd",
    lesson: "Your biggest setback can become the foundation of your biggest success if you're brave enough to reframe it.",
    
    stats: [
      { label: "Net Worth", value: "$77M+" },
      { label: "Bumble Stake", value: "~14%" },
      { label: "Founded", value: "2014" },
      { label: "Role 2026", value: "Exec Chair" }
    ],
    
    createdAt: "2026-04-18",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-18"
  },

//19

  {
    id: "daniel-ek-2026",
    slug: "daniel-ek-spotify",
    edition: 19,
    featured: false,
    
    name: "Daniel Ek",
    nameShort: "Daniel Ek",
    initials: "DE",
    company: "Spotify",
    role: "Founder & CEO",
    
    city: "Stockholm",
    country: "Sweden",
    countryCode: "SE",
    context: "Saving the Music Industry",
    
    valuation: "$60B",
    funding: "Public (NYSE: SPOT)",
    founded: "2006",
    
    imageUrl: "https://ca-times.brightspotcdn.com/dims4/default/15d3cf1/2147483647/strip/true/crop/3000x1688+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F51%2F15%2F07e7c00f4a16864cb1bb9493a36d%2Fdaniel-ek.jpg",
    accent: "#1DB954",
    accentBg: "#E6F9ED",
    accentBorder: "#8EEDC7",
    
    headline: "He killed music piracy by making streaming easier than stealing. In 2026, his net worth is pushing $10 billion as Spotify dominates audio.",
    deck: "Daniel Ek built Spotify to solve a personal frustration with piracy. Two decades later, it's the world's largest audio platform with over 600M users, and Ek's net worth has nearly doubled to $9.9B [citation:9].",
    
    columns: [
      {
        heading: "The Pirate Bay to Wall Street",
        body: "Ek grew up in Sweden during the height of The Pirate Bay. He realized that piracy wasn't about money—it was about convenience. He bet that if you made a service faster and easier than torrenting, people would pay. He was right. Spotify's freemium model and focus on speed changed the music industry's trajectory. In 2026, Spotify pays out billions in royalties and is the primary income source for most working artists."
      },
      {
        heading: "The Audio Everything Strategy",
        body: "Ek's vision has expanded beyond music to 'Audio Everything.' Spotify now dominates podcasts, has a growing audiobook business, and is investing heavily in AI-generated personalized DJs. In 2025-2026, Ek's net worth surged to an estimated $9.9 billion, up significantly from $4.6 billion just a year prior, driven by strong subscriber growth and expanding profit margins [citation:9]."
      },
      {
        heading: "The European Tech Champion",
        body: "Unlike many European founders who sell early to US giants, Ek kept Spotify independent and took it public via a direct listing. He has been a vocal critic of Apple's App Store policies, positioning himself as a defender of the open internet. In 2026, he continues to invest his personal wealth in European deep tech and defense startups, trying to foster a tech ecosystem in Europe that can compete with the US and China [citation:9]."
      }
    ],
    
    pullQuote: "The only way to beat piracy was to build something so good that stealing felt like a waste of time.",
    pullQuoteBy: "Daniel Ek",
    lesson: "Convenience always wins. Build a product that's 10x easier to use than the free illegal alternative.",
    
    stats: [
      { label: "Net Worth 2026", value: "$9.9B" },
      { label: "Spotify MAU", value: "600M+" },
      { label: "Subscribers", value: "250M+" },
      { label: "Founded", value: "2006" }
    ],
    
    createdAt: "2026-04-19",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-19"
  },

//20

  {
    id: "chris-wanstrath-2026",
    slug: "chris-wanstrath-github",
    edition: 20,
    featured: false,
    
    name: "Chris Wanstrath",
    nameShort: "Chris Wanstrath",
    initials: "CW",
    company: "GitHub",
    role: "Co-Founder (Former CEO)",
    
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    context: "The World's Code Repository",
    
    valuation: "$7.5B (Acquisition)",
    funding: "Acquired by Microsoft",
    founded: "2008",
    
    imageUrl: "https://imageio.forbes.com/blogs-images/alexkonrad/files/2017/08/github-ceo.jpeg?height=410&width=711&fit=bounds",
    accent: "#181717",
    accentBg: "#F5F5F5",
    accentBorder: "#D4D4D4",
    
    headline: "He built the platform where all software is born. Then he sold it to Microsoft and went back to making indie games.",
    deck: "Chris Wanstrath co-founded GitHub and turned it into the essential infrastructure for the global software supply chain. After a $7.5 billion exit, he's a billionaire with the freedom to code for fun again [citation:10].",
    
    columns: [
      {
        heading: "The Weekend Project That Ate the World",
        body: "In 2008, Wanstrath and Tom Preston-Werner built Git hosting on the weekends. It was a side project meant to make their own developer lives easier. Within a few years, GitHub had become the de facto standard for version control and open-source collaboration. It wasn't just a tool; it was a social network for programmers. By 2018, 28 million developers used it, and Microsoft came knocking."
      },
      {
        heading: "The $7.5 Billion Bet on Developers",
        body: "Microsoft's acquisition of GitHub for $7.5 billion in stock was a landmark moment. Wanstrath, as the largest individual shareholder, became a billionaire overnight. The deal symbolized Microsoft's cultural shift under Satya Nadella—embracing open source rather than fighting it. Wanstrath stayed on briefly before leaving to pursue passion projects. In 2026, his net worth sits comfortably at $1.31 billion [citation:10]."
      },
      {
        heading: "The Indie Game Return",
        body: "Unlike many tech billionaires who pivot to VC or philanthropy, Wanstrath went back to his roots. In 2023, he co-founded Null, an 'indie video game publisher for developers, by developers.' He also serves on the board of the Computer History Museum. In an era of AI-generated code, GitHub (now with Copilot) is more central to the software industry than ever, but Wanstrath seems content to have moved on, proving that some founders really do just want to build cool things."
      }
    ],
    
    pullQuote: "We just wanted to make it easier to share code. We never imagined it would become the home for all the world's software.",
    pullQuoteBy: "Chris Wanstrath",
    lesson: "If you build the place where developers want to be, the enterprise will follow.",
    
    stats: [
      { label: "Acquisition Price", value: "$7.5B" },
      { label: "Net Worth 2026", value: "$1.31B" },
      { label: "Founded", value: "2008" },
      { label: "Current Venture", value: "Null Games" }
    ],
    
    createdAt: "2026-04-20",
    updatedAt: "2026-04-21",
    publishedAt: "2026-04-20"
  },

  

].sort((a, b) => b.edition - a.edition) // Latest first

// Helper functions
export function getFounderBySlug(slug: string): Founder | undefined {
  return FOUNDERS.find(f => f.slug === slug)
}

export function getFeaturedFounders(limit = 3): Founder[] {
  return FOUNDERS.filter(f => f.featured).slice(0, limit)
}

export function getAllFounders(page = 1, limit = 10): { founders: Founder[], total: number } {
  const start = (page - 1) * limit
  const end = start + limit
  return {
    founders: FOUNDERS.slice(start, end),
    total: FOUNDERS.length
  }
}

export function getRelatedFounders(currentSlug: string, limit = 3): Founder[] {
  const current = getFounderBySlug(currentSlug)
  if (!current) return []
  
  return FOUNDERS
    .filter(f => f.slug !== currentSlug && f.countryCode === current.countryCode)
    .slice(0, limit)
}

export function getAdjacentFounders(slug: string): { prev: Founder | null, next: Founder | null } {
  const index = FOUNDERS.findIndex(f => f.slug === slug)
  return {
    prev: index > 0 ? FOUNDERS[index - 1] : null,
    next: index < FOUNDERS.length - 1 ? FOUNDERS[index + 1] : null
  }
}
