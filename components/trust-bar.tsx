"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  inView,
}: {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 1200, suffix: "+", label: "Readers this month" },
  { value: 98, suffix: "%", label: "Delivery success rate" },
  { value: 50, suffix: "+", label: "Blogs supported" },
  { value: 0, prefix: "$", suffix: "", label: "To get started" },
]

export function TrustBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative border-y border-[#e8e8e8] bg-warm noise-overlay">
      <div ref={ref} className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center"
            >
              <div className="mb-2 font-serif text-4xl tracking-tight text-ink md:text-5xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ""}
                  inView={isInView}
                />
              </div>
              <div className="text-[13px] font-medium tracking-wide text-stone uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
