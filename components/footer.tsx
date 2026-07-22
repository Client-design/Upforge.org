import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-foreground mb-4">UpForge</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">India\'s independent, verified startup registry. Free to list, search, and verify.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Product</h4>
            <nav className="space-y-2">
              <Link href="/registry" className="text-sm text-muted-foreground hover:text-foreground transition">
                Global Registry
              </Link>
              <Link href="/startup" className="text-sm text-muted-foreground hover:text-foreground transition">
                Indian Startups
              </Link>
              <Link href="/founder-stories" className="text-sm text-muted-foreground hover:text-foreground transition">
                Founder Stories
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition">
                The Forge Blog
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <nav className="space-y-2">
              <Link href="/submit" className="text-sm text-muted-foreground hover:text-foreground transition">
                Submit Startup
              </Link>
              <Link href="/verify" className="text-sm text-muted-foreground hover:text-foreground transition">
                Verify UFRN
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition">
                FAQ
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
                About
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <nav className="space-y-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition">
                Terms
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            © 2026 UpForge. All rights reserved. Independent startup registry.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com/upforgeindia" className="text-muted-foreground hover:text-foreground transition">
              <Twitter size={16} />
            </a>
            <a href="https://linkedin.com/company/upforge" className="text-muted-foreground hover:text-foreground transition">
              <Linkedin size={16} />
            </a>
            <a href="https://github.com/upforge" className="text-muted-foreground hover:text-foreground transition">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}