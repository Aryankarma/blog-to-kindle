"use client"

const footerLinks = {
  Product: ["Features", "Pricing", "API", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Help Center", "Documentation", "Status", "GitHub"],
  Legal: ["Privacy", "Terms", "Security"],
}

export function Footer() {
  return (
    <footer className="border-t border-[#e8e8e8]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Top section */}
        <div className="grid gap-10 py-16 md:grid-cols-6">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="mb-4 flex items-center gap-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-ink">
                <span className="font-serif text-sm italic text-[#ffffff]">K</span>
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-ink">
                KindleFlow
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-stone">
              Transform the internet into your personal library. Built for readers who
              love their Kindle.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-[12px] font-semibold tracking-widest text-ink uppercase">
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-stone transition-colors duration-200 hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#e8e8e8] py-8 md:flex-row">
          <p className="text-[13px] text-stone">
            &copy; 2026 KindleFlow.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[13px] text-stone transition-colors hover:text-ink"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[13px] text-stone transition-colors hover:text-ink"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-[13px] text-stone transition-colors hover:text-ink"
            >
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
