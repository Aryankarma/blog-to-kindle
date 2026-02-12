"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-ink p-12 text-center md:p-20"
        >
          {/* Subtle decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-[#333333]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full border border-[#333333]" />

          <div className="relative z-10">
            <h2 className="mb-4 font-serif text-4xl italic leading-tight tracking-tight text-[#ffffff] sm:text-5xl lg:text-6xl">
              Your Kindle is waiting.
            </h2>
            <p className="mx-auto mb-10 max-w-md text-[16px] leading-relaxed text-[#888888]">
              Start converting your favorite blogs into beautiful, distraction-free reading.
              It takes 30 seconds.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="group flex items-center gap-2 rounded-full bg-[#ffffff] px-8 py-3.5 text-[14px] font-medium text-ink transition-all duration-300 hover:bg-cream hover:shadow-lg"
              >
                Start converting for free
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <span className="text-[13px] text-[#666666]">
                No credit card required
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
