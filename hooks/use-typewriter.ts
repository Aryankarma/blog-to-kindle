"use client"

import { useState, useEffect } from "react"

export function useTypewriter(text: string, speed = 60, delay = 500) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText("")
    setIsComplete(false)

    const startTimeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1))
          i++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, delay])

  return { displayedText, isComplete }
}
