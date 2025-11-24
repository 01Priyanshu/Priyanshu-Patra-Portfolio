"use client"

import { useEffect, useState } from "react"

interface CodeEditorProps {
  filename?: string
  code: string
  height?: string
}

export default function CodeEditor({ filename = "data_science_model.py", code, height = "400px" }: CodeEditorProps) {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    let timer: NodeJS.Timeout

    // Type out the code
    const typeCode = () => {
      if (currentIndex < code.length) {
        setText(code.slice(0, currentIndex + 1))
        currentIndex++
        timer = setTimeout(typeCode, Math.random() * 30 + 10) // Random typing speed for realism
      }
    }

    typeCode()

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearTimeout(timer)
      clearInterval(cursorInterval)
    }
  }, [code])

  return (
    <div className="w-full h-full bg-[#1e1e1e] rounded-xl shadow-lg overflow-hidden border border-primary/20">
      <div className="bg-[#333333] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white/70 text-xs ml-2">{filename}</div>
      </div>
      <div
        className="p-4 text-xs md:text-sm font-mono text-white/90 overflow-auto h-[calc(100%-2rem)]"
        style={{ height }}
      >
        <pre className="whitespace-pre">
          {text}
          {cursorVisible && <span className="text-primary animate-pulse">|</span>}
        </pre>
      </div>
    </div>
  )
}
