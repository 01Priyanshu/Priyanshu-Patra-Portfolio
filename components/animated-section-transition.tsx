"use client"

import { useState, useEffect, type ReactNode, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface AnimatedSectionProps {
  id: string
  children: ReactNode
  isActive: boolean
}

export function AnimatedSection({ id, children, isActive }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (isActive) {
      // Reset scroll position when section becomes active
      if (sectionRef.current) {
        sectionRef.current.scrollTop = 0
        setHasScrolled(false)
      }

      // Check if section has scrollable content
      const checkScrollable = () => {
        if (sectionRef.current) {
          const hasScrollableContent = sectionRef.current.scrollHeight > sectionRef.current.clientHeight
          setShowScrollIndicator(hasScrollableContent && !hasScrolled)
        }
      }

      // Initial check
      checkScrollable()

      // Check again after content might have rendered
      const timer = setTimeout(checkScrollable, 500)

      return () => clearTimeout(timer)
    }
  }, [isActive, hasScrolled])

  const handleScroll = () => {
    if (sectionRef.current) {
      setHasScrolled(true)
      setShowScrollIndicator(false)
    }
  }

  const variants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotateY: 90,
      z: -200,
      filter: "blur(20px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: -90,
      z: -200,
      filter: "blur(20px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const childVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.section
          ref={sectionRef}
          id={id}
          className="min-h-screen w-full absolute top-0 left-0 overflow-y-auto custom-scrollbar pb-20"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          onScroll={handleScroll}
        >
          <motion.div className="pb-20" variants={childVariants}>
            {children}
          </motion.div>

          {/* Scroll indicator */}
          {showScrollIndicator && (
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm text-muted-foreground mb-2">Scroll to see more</p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                <ChevronDown className="h-6 w-6 text-primary" />
              </motion.div>
            </motion.div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  )
}

interface AnimatedSectionContainerProps {
  children: ReactNode
}

export function AnimatedSectionContainer({ children }: AnimatedSectionContainerProps) {
  return <div className="relative w-full min-h-screen overflow-hidden">{children}</div>
}

interface AnimatedNavigationProps {
  sections: string[]
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AnimatedNavigation({ sections, activeSection, setActiveSection }: AnimatedNavigationProps) {
  return (
    <nav className="hidden md:flex gap-6">
      {sections.map((section, index) => (
        <motion.button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`nav-item text-sm font-medium transition-all duration-300 ${
            activeSection === section ? "text-primary" : ""
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
          {activeSection === section && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-primary"
              layoutId="underline"
              style={{ width: "100%" }}
            />
          )}
        </motion.button>
      ))}
    </nav>
  )
}

export function useAnimatedNavigation(initialSection = "about") {
  const [activeSection, setActiveSection] = useState(initialSection)
  const sections = ["about", "education", "experience", "skills", "projects", "contact"]

  return { activeSection, setActiveSection, sections }
}

export function SectionTransitionEffect({ activeSection, previousSection }) {
  const getDirection = () => {
    const sectionOrder = ["about", "education", "experience", "skills", "projects", "contact"]
    const prevIndex = sectionOrder.indexOf(previousSection)
    const activeIndex = sectionOrder.indexOf(activeSection)

    if (prevIndex < activeIndex) return "right"
    if (prevIndex > activeIndex) return "left"
    return "right" // default
  }

  const direction = getDirection()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSection}
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-primary"
          initial={{
            scaleX: 0,
            originX: direction === "right" ? 0 : 1,
          }}
          animate={{
            scaleX: [0, 1, 0],
            originX: [direction === "right" ? 0 : 1, direction === "right" ? 0 : 1, direction === "right" ? 1 : 0],
          }}
          transition={{ duration: 1.2, times: [0, 0.5, 1], ease: "circOut" }}
          style={{ opacity: 0.2 }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,59,48,0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,59,48,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,59,48,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}

export function AnimatedParticles() {
  const particleCount = 20 // Reduced for better performance
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.2,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function ScrollToTopButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg shadow-primary/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <ChevronDown className="h-6 w-6 transform rotate-180" />
    </motion.button>
  )
}
