"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TrustBar } from "@/components/trust-bar"
import { ValueProps } from "@/components/value-props"
import { BlogsShowcase } from "@/components/blogs-showcase"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#ffffff]">
      <Navbar />
      <main>
        <HeroSection />
        <TrustBar />
        <ValueProps />
        <HowItWorks />
        <BlogsShowcase />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
