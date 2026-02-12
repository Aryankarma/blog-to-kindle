"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

function FloatingMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-md z-50"
    >
      {/* Shadow under the card */}
      <div className="absolute -bottom-4 left-4 right-4 h-20 rounded-3xl bg-ink/5 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-[#e0e0e0] bg-[#ffffff] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.08)]">
        {/* Mini title bar */}
        <div className="mb-5 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto font-mono text-[11px] text-stone">
            kindleflow.ai
          </span>
        </div>

        {/* URL row */}
        <div className="mb-3 rounded-lg border border-[#e8e8e8] bg-cream/50 px-4 py-2.5">
          <span className="font-mono text-[13px] text-ink">https://nav.al</span>
        </div>

        {/* Email row */}
        <div className="mb-5 rounded-lg border border-[#e8e8e8] bg-cream/50 px-4 py-2.5">
          <span className="font-mono text-[13px] text-stone">
            reader@kindle.com
          </span>
        </div>

        {/* Progress section */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[12px] font-medium text-stone">
              Delivering to Kindle
            </span>
            <span className="font-mono text-[12px] font-semibold text-ink">
              8 / 12
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-cream">
            <motion.div
              className="h-full rounded-full bg-ink"
              initial={{ width: "0%" }}
              animate={{ width: "67%" }}
              transition={{
                duration: 2.5,
                delay: 1.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </div>

        {/* File list */}
        <div className="flex flex-col gap-1.5">
          {[
            "How to Get Rich.pdf",
            "Naval on Happiness.pdf",
            "Seek Wealth, Not Money.pdf",
          ].map((file, i) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 + i * 0.3, duration: 0.5 }}
              className="flex items-center gap-2.5 rounded-md px-2 py-1.5"
            >
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-ink">
                <svg
                  className="h-3 w-3 text-[#ffffff]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-mono text-[12px] text-ink/70">{file}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 1500], [1, 0]);

  const { displayedText, isComplete } = useTypewriter(
    "Your blogs deserve a better home.",
    45,
    600,
  );

  return (
    <section ref={ref} className="relative overflow-hidden pt-16">
      {/* Ambient background elements */}
      <motion.div
        style={{ opacity: opacity }}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-amber-400/20 blur-[80px] md:-top-[5%] md:left-[5%] md:h-[700px] md:w-[700px] md:bg-amber-400/30 md:blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] -right-[10%] h-[350px] w-[350px] rounded-full bg-sky-400/15 blur-[80px] md:top-[5%] md:right-[5%] md:h-[600px] md:w-[600px] md:bg-sky-400/25 md:blur-[130px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,0,0,0.12),transparent_60%)]" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8"
      >
        <div className="flex flex-col items-center pb-24 pt-20 md:pb-32 md:pt-28">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e0e0e0] bg-[#ffffff] px-4 py-1.5 text-[12px] font-medium tracking-wide text-stone uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              AI-Powered Blog Converter
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mb-6 max-w-3xl text-center font-serif text-5xl leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-[4.5rem]">
            <span className="italic">{displayedText}</span>
            {!isComplete && (
              <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-ink align-middle" />
            )}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-lg text-center text-[17px] leading-relaxed text-stone"
          >
            Paste any blog URL. Get clean, ad-free articles delivered to your
            Kindle as beautifully formatted PDFs. Takes 30 seconds.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 flex items-center gap-4"
          >
            <a
              href="#"
              className="group flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-[14px] font-medium text-[#ffffff] transition-all duration-300 hover:bg-ink/85 hover:shadow-lg"
            >
              Start converting
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="text-[14px] font-medium text-stone underline decoration-stone/30 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/30"
            >
              See how it works
            </a>
          </motion.div>

          {/* Mockup */}
          <FloatingMockup />
        </div>
      </motion.div>
    </section>
  );
}
