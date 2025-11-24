"use client"
import Image from "next/image"

interface SkillIconProps {
  name: string
  icon: string
  color?: string
}

export function SkillIcon({ name, icon, color = "#000000" }: SkillIconProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-card hover:shadow-md transition-all duration-300 hover:scale-105">
      <div className="relative w-12 h-12">
        <Image src={icon || "/placeholder.svg"} alt={name} width={48} height={48} className="object-contain" />
      </div>
      <span className="text-xs font-medium text-center" style={{ color }}>
        {name}
      </span>
    </div>
  )
}

export function PythonIcon() {
  return <SkillIcon name="Python" icon="/placeholder.svg?text=Python&width=48&height=48&color=blue" color="#3776AB" />
}

export function JavaScriptIcon() {
  return <SkillIcon name="JavaScript" icon="/placeholder.svg?text=JS&width=48&height=48&color=yellow" color="#F7DF1E" />
}

export function ReactIcon() {
  return <SkillIcon name="React" icon="/placeholder.svg?text=React&width=48&height=48&color=blue" color="#61DAFB" />
}

export function TensorFlowIcon() {
  return <SkillIcon name="TensorFlow" icon="/placeholder.svg?text=TF&width=48&height=48&color=orange" color="#FF6F00" />
}

export function PyTorchIcon() {
  return <SkillIcon name="PyTorch" icon="/placeholder.svg?text=PyTorch&width=48&height=48&color=red" color="#EE4C2C" />
}

export function PandasIcon() {
  return <SkillIcon name="Pandas" icon="/placeholder.svg?text=Pandas&width=48&height=48&color=purple" color="#150458" />
}

export function NumPyIcon() {
  return <SkillIcon name="NumPy" icon="/placeholder.svg?text=NumPy&width=48&height=48&color=blue" color="#013243" />
}

export function ScikitLearnIcon() {
  return (
    <SkillIcon
      name="Scikit-Learn"
      icon="/placeholder.svg?text=Scikit&width=48&height=48&color=orange"
      color="#F7931E"
    />
  )
}

export function DockerIcon() {
  return <SkillIcon name="Docker" icon="/placeholder.svg?text=Docker&width=48&height=48&color=blue" color="#2496ED" />
}

export function AWSIcon() {
  return <SkillIcon name="AWS" icon="/placeholder.svg?text=AWS&width=48&height=48&color=orange" color="#FF9900" />
}

export function GitIcon() {
  return <SkillIcon name="Git" icon="/placeholder.svg?text=Git&width=48&height=48&color=red" color="#F05032" />
}

export function SQLIcon() {
  return <SkillIcon name="SQL" icon="/placeholder.svg?text=SQL&width=48&height=48&color=blue" color="#4479A1" />
}

export function MongoDBIcon() {
  return (
    <SkillIcon name="MongoDB" icon="/placeholder.svg?text=MongoDB&width=48&height=48&color=green" color="#47A248" />
  )
}

export function NodeJSIcon() {
  return <SkillIcon name="Node.js" icon="/placeholder.svg?text=Node&width=48&height=48&color=green" color="#339933" />
}

export function HTMLIcon() {
  return <SkillIcon name="HTML" icon="/placeholder.svg?text=HTML&width=48&height=48&color=orange" color="#E34F26" />
}

export function CSSIcon() {
  return <SkillIcon name="CSS" icon="/placeholder.svg?text=CSS&width=48&height=48&color=blue" color="#1572B6" />
}

export function JavaIcon() {
  return <SkillIcon name="Java" icon="/placeholder.svg?text=Java&width=48&height=48&color=red" color="#007396" />
}

export function MATLABIcon() {
  return <SkillIcon name="MATLAB" icon="/placeholder.svg?text=MATLAB&width=48&height=48&color=blue" color="#0076A8" />
}
