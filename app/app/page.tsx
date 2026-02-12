"use client";

import { useProgressStream } from "@/lib/hooks/use-progress-stream";
import { ConverterForm } from "@/components/converter-form";
import { ProgressDisplay } from "@/components/progress-display";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function Page() {
  const { events, isProcessing, error, startProcessing, reset } =
    useProgressStream();

  const handleSubmit = (
    blogUrl: string,
    kindleEmail: string,
    postLimit?: number,
  ) => {
    reset();
    startProcessing(blogUrl, kindleEmail, postLimit);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] relative overflow-hidden">
      <Navbar />

      {/* Ambient background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,0,0,0.08),transparent_60%)]" />
      </div>

      <main className="mx-auto max-w-4xl pt-32 pb-24 px-6 relative z-10">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif text-ink tracking-tight leading-[1.1]">
                <span className="italic">Begin your conversion.</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[17px] text-stone leading-relaxed"
            >
              Paste your blog URL below and we'll handle the formatting and
              delivery to your Kindle.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Form */}
            <ConverterForm
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
            />

            {/* Progress Display */}
            <ProgressDisplay
              events={events}
              isProcessing={isProcessing}
              error={error}
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
