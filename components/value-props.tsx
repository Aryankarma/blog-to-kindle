"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    number: "01",
    title: "Any blog, any format",
    description:
      "nav.al, Substack, Medium, WordPress, personal blogs. If it has text, we can convert it. Our scraper handles even the messiest HTML.",
    visual: (
      <div className="flex max-w-md flex-wrap md:items-center md:justify-center gap-2">
        {[
          "nav.al",
          "substack.com",
          "medium.com",
          "paulgraham.com",
          "seths.blog",
          "ribbonfarm.com",
          "thebrowser.com",
          // "waitbutwhy.com",
        ].map((url) => (
          <span
            key={url}
            className="rounded-full border border-[#e0e0e0] bg-[#ffffff] px-3 py-1 font-mono text-[11px] text-ink"
          >
            {url}
          </span>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    title: "Kindle-perfect formatting",
    description:
      "Clean typography with proper margins. No ads, no pop-ups, no cookie banners. Just your content, beautifully typeset for e-ink.",
    visual: (
      <div className="space-y-2 rounded-lg border border-[#e0e0e0] bg-[#ffffff] p-4">
        <div className="h-2 w-3/4 rounded-full bg-ink/10" />
        <div className="h-2 w-full rounded-full bg-ink/10" />
        <div className="h-2 w-5/6 rounded-full bg-ink/10" />
        <div className="mt-3 h-2 w-2/3 rounded-full bg-ink/10" />
        <div className="h-2 w-full rounded-full bg-ink/10" />
        <div className="h-2 w-4/5 rounded-full bg-ink/10" />
      </div>
    ),
  },
  {
    number: "03",
    title: "One-click delivery",
    description:
      "Enter URL. Enter Kindle email. Click convert. Your articles arrive on your Kindle within minutes. The entire process takes under 30 seconds.",
    visual: (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-mono text-[13px] font-semibold text-[#ffffff]">
          30
        </div>
        <div className="text-[13px] text-stone">seconds, start to finish</div>
      </div>
    ),
  },
];

export function ValueProps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="mb-4 block text-[12px] font-medium tracking-widest text-stone uppercase">
            Why KindleFlow
          </span>
          <h2 className="max-w-xl font-serif text-4xl italic leading-tight tracking-tight text-ink sm:text-5xl">
            Reading shouldn&apos;t require a browser.
          </h2>
        </motion.div>

        {/* Feature cards - stacked with asymmetric layout */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text side */}
              <div className="flex-1">
                <span className="mb-4 block font-mono text-[11px] font-semibold tracking-widest text-stone uppercase">
                  {feature.number}
                </span>
                <h3 className="mb-4 text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
                  {feature.title}
                </h3>
                <p className="max-w-md text-[16px] leading-relaxed text-stone">
                  {feature.description}
                </p>
              </div>

              {/* Visual side */}
              <div className="flex flex-1 items-center justify-center rounded-2xl border border-[#e8e8e8] bg-cream/50 p-8 lg:p-12">
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
