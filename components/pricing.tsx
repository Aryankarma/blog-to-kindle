"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For casual readers who want to try it out.",
    features: [
      "5 PDFs per day",
      "Any public blog",
      "Kindle delivery",
      "Clean formatting",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For avid readers and content collectors.",
    features: [
      "100 PDFs per day",
      "Custom domains",
      "Priority delivery",
      "Batch conversion",
      "Reading analytics",
    ],
    cta: "Get Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For teams and organizations.",
    features: [
      "Unlimited PDFs",
      "API access",
      "Priority support",
      "Custom branding",
      "SSO integration",
      "Dedicated account manager",
    ],
    cta: "Contact us",
    featured: false,
  },
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="pricing" className="border-t border-[#e8e8e8] bg-warm noise-overlay py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-[12px] font-medium tracking-widest text-stone uppercase">
            Pricing
          </span>
          <h2 className="mb-4 font-serif text-4xl italic tracking-tight text-ink sm:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="mx-auto max-w-md text-[16px] text-stone">
            Start converting for free. Upgrade when you need more power.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-ink bg-ink text-[#ffffff] shadow-[0_16px_48px_rgba(0,0,0,0.15)]"
                  : "border-[#e0e0e0] bg-[#ffffff] hover:border-[#cccccc] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ffffff] px-4 py-1 text-[11px] font-semibold tracking-wide text-ink uppercase">
                  Most popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`mb-1 text-[14px] font-semibold tracking-wide uppercase ${
                  plan.featured ? "text-[#aaaaaa]" : "text-stone"
                }`}>
                  {plan.name}
                </h3>
                <div className="mb-3 flex items-baseline gap-1">
                  <span className={`font-serif text-5xl italic ${
                    plan.featured ? "text-[#ffffff]" : "text-ink"
                  }`}>
                    {plan.price}
                  </span>
                  <span className={`text-[14px] ${
                    plan.featured ? "text-[#888888]" : "text-stone"
                  }`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-[14px] ${
                  plan.featured ? "text-[#aaaaaa]" : "text-stone"
                }`}>
                  {plan.description}
                </p>
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`h-4 w-4 flex-shrink-0 ${
                      plan.featured ? "text-[#888888]" : "text-stone"
                    }`} />
                    <span className={`text-[14px] ${
                      plan.featured ? "text-[#cccccc]" : "text-ink/70"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block rounded-full py-3 text-center text-[14px] font-medium transition-all duration-300 ${
                  plan.featured
                    ? "bg-[#ffffff] text-ink hover:bg-[#f0f0f0]"
                    : "border border-[#e0e0e0] bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-[#ffffff]"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
