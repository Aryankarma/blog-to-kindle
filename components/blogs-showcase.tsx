"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const blogs = [
  { name: "Naval Ravikant", url: "nav.al", articles: "42 articles" },
  { name: "Paul Graham", url: "paulgraham.com", articles: "200+ essays" },
  { name: "Seth Godin", url: "seths.blog", articles: "8,000+ posts" },
  { name: "Stratechery", url: "stratechery.com", articles: "Weekly analysis" },
  { name: "Wait But Why", url: "waitbutwhy.com", articles: "Long-form pieces" },
  { name: "Daring Fireball", url: "daringfireball.net", articles: "Daily links" },
]

const marqueeBlogs = [
  "nav.al",
  "paulgraham.com",
  "seths.blog",
  "stratechery.com",
  "waitbutwhy.com",
  "daringfireball.net",
  "substack.com",
  "medium.com",
  "blog.samaltman.com",
  "avc.com",
]

export function BlogsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-[12px] font-medium tracking-widest text-stone uppercase">
            Compatibility
          </span>
          <h2 className="font-serif text-4xl italic tracking-tight text-ink sm:text-5xl">
            Works with the blogs you love.
          </h2>
        </motion.div>

        {/* Blog cards grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex items-center gap-4 rounded-xl border border-[#e8e8e8] bg-[#ffffff] p-5 transition-all duration-300 hover:border-[#d0d0d0] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-cream font-serif text-lg italic text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-[#ffffff]">
                {blog.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-ink">
                  {blog.name}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-stone">
                  <span className="font-mono">{blog.url}</span>
                  <span className="text-[#d0d0d0]">|</span>
                  <span>{blog.articles}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite marquee */}
        <div className="overflow-hidden rounded-xl border border-[#e8e8e8] bg-cream/50 py-4">
          <div className="flex animate-marquee">
            {[...marqueeBlogs, ...marqueeBlogs].map((url, i) => (
              <span
                key={`${url}-${i}`}
                className="mx-4 flex-shrink-0 font-mono text-[13px] text-stone"
              >
                {url}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
