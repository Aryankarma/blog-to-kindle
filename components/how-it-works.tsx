"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    number: "1",
    title: "Paste a URL",
    description: "Drop in any blog URL. We discover all articles automatically.",
    mono: "https://nav.al",
  },
  {
    number: "2",
    title: "Add your Kindle email",
    description: "Enter the unique email address for your Kindle device.",
    mono: "reader@kindle.com",
  },
  {
    number: "3",
    title: "Click convert",
    description: "Our AI strips ads, cleans formatting, and generates PDFs.",
    mono: "Processing 12 articles...",
  },
  {
    number: "4",
    title: "Read on Kindle",
    description: "Beautiful, ad-free articles arrive on your Kindle in minutes.",
    mono: "Delivered successfully",
  },
]

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" className="bg-ink noise-overlay py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block text-[12px] font-medium tracking-widest text-[#888888] uppercase">
            How it works
          </span>
          <h2 className="font-serif text-4xl italic leading-tight tracking-tight text-[#ffffff] sm:text-5xl">
            Four steps. Under a minute.
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#333333] bg-[#333333] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col bg-ink p-8 transition-colors duration-500 hover:bg-[#2a2a2a]"
            >
              {/* Number */}
              <span className="mb-8 font-serif text-6xl text-[#333333] transition-colors duration-500 group-hover:text-[#444444]">
                {step.number}
              </span>

              <h3 className="mb-3 text-lg font-semibold text-[#ffffff]">
                {step.title}
              </h3>
              <p className="mb-6 text-[14px] leading-relaxed text-[#888888]">
                {step.description}
              </p>

              {/* Mono detail */}
              <div className="mt-auto">
                <span className="inline-block rounded-md bg-[#333333] px-3 py-1.5 font-mono text-[11px] text-[#aaaaaa] transition-colors duration-500 group-hover:bg-[#3a3a3a] group-hover:text-[#cccccc]">
                  {step.mono}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
