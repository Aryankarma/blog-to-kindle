import type { Metadata, Viewport } from "next"
import { DM_Sans, Instrument_Serif, Geist_Mono } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "KindleFlow.ai - Blogs to Kindle, Instantly",
  description:
    "Transform any blog into beautiful, Kindle-optimized PDFs. Enter a URL, get clean articles delivered to your Kindle with one click.",
  keywords: [
    "kindle",
    "blog converter",
    "pdf",
    "reading",
    "AI",
    "ebook",
  ],
  openGraph: {
    title: "KindleFlow.ai - Blogs to Kindle, Instantly",
    description:
      "Transform any blog into beautiful, Kindle-optimized PDFs delivered to your Kindle with one click.",
    type: "website",
    siteName: "KindleFlow.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "KindleFlow.ai - Blogs to Kindle, Instantly",
    description:
      "Transform any blog into beautiful, Kindle-optimized PDFs delivered to your Kindle with one click.",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${instrumentSerif.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
