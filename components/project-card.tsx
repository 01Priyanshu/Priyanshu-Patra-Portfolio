"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    category: string
    github: string
    demo: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="card-3d-container cursor-hover h-full"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 border-primary/10 glow-on-hover card-3d h-full flex flex-col">
        <div className="aspect-video w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>
        <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag, i) => (
              <Badge
                key={i}
                className="bg-primary/10 hover:bg-primary/20 text-foreground border-none transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="transition-all duration-300 hover:scale-105 hover:bg-primary/10 border-primary/20 liquid-button cursor-hover"
          >
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary/90 hover:to-accent/90 neon-glow cursor-hover"
          >
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
