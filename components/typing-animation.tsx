"use client"

import { useEffect, useState } from "react"

interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
}

export default function TypingAnimation({ text, speed = 40, delay = 500 }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    // Start typing after the specified delay
    const startTimeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(cursorInterval)
    }
  }, [delay])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    const textLength = text.length

    const typingInterval = setInterval(() => {
      if (currentIndex < textLength) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, speed)

    return () => clearInterval(typingInterval)
  }, [isTyping, text, speed])

  return (
    <div className="inline-block">
      <span className="text-muted-foreground md:text-xl">{displayText}</span>
      {cursorVisible && <span className="text-primary animate-pulse">|</span>}
    </div>
  )
}
