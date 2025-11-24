"use client"

import { useEffect, useState } from "react"

interface ColorTransitionProps {
  colors: string[]
  duration?: number
}

export default function ColorTransition({ colors, duration = 10 }: ColorTransitionProps) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [colors, duration])

  return (
    <div
      className="fixed inset-0 -z-10 transition-colors duration-[3000ms] ease-in-out"
      style={{ backgroundColor: colors[currentColorIndex] }}
    />
  )
}
