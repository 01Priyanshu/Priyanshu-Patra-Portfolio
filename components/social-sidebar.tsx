"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, Instagram } from "lucide-react"

interface SocialLink {
  icon: React.ReactNode
  label: string
  action: string
  href: string
  color: string
}

export default function SocialSidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const socialLinks: SocialLink[] = [
    {
      icon: <Github size={24} className="text-white" />,
      label: "EXPLORE",
      action: "Explore",
      href: "https://github.com/01Priyanshu",
      color: "bg-gray-900 hover:bg-gray-800",
    },
    {
      icon: <Linkedin size={24} className="text-white" />,
      label: "CONNECT",
      action: "Connect",
      href: "https://www.linkedin.com/in/priyanshu-patra-01gg",
      color: "bg-blue-700 hover:bg-blue-600",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
        </svg>
      ),
      label: "FOLLOW",
      action: "Follow",
      href: "https://x.com/priyanshu_thone",
      color: "bg-black hover:bg-gray-800",
    },
    {
      icon: <Instagram size={24} className="text-white" />,
      label: "MESSAGE",
      action: "Message",
      href: "https://www.instagram.com/the_priyanshu_patra/",
      color: "bg-pink-700 hover:bg-pink-600",
    },
  ]

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col">
      {socialLinks.map((link, index) => (
        <div
          key={index}
          className="relative flex items-center"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {activeIndex === index && (
            <div
              className={`absolute right-full mr-2 whitespace-nowrap ${link.color} px-4 py-2 text-sm font-medium text-white transition-all duration-300`}
            >
              {link.label}
            </div>
          )}
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-12 h-12 ${link.color} transition-all duration-300`}
            title={link.action}
          >
            {link.icon}
          </Link>
        </div>
      ))}
    </div>
  )
}
