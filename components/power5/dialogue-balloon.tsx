"use client"

import { Radio } from "lucide-react"
import { motion, type Variants } from "motion/react"
import type { BalloonType } from "@/lib/power5/types"
import { cn } from "@/lib/utils"

const float: Variants = {
  a: { y: [0, -6, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
}
const cloudPulse: Variants = {
  a: { scale: [1, 1.03, 1], transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } },
}
const shake: Variants = {
  a: {
    rotate: [-1.5, 1.5, -1.5],
    scale: [1, 1.04, 1],
    transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
  },
}
const fade: Variants = {
  a: { opacity: [0.55, 0.9, 0.55], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
}

export function DialogueBalloon({
  type,
  speaker,
  children,
  className,
}: {
  type: BalloonType
  speaker: string
  children: React.ReactNode
  className?: string
}) {
  const label = (
    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-primary">
      {speaker}
    </span>
  )

  if (type === "thought") {
    return (
      <motion.div variants={cloudPulse} animate="a" className={cn("relative", className)}>
        <div className="relative rounded-[40px] border border-border bg-card px-4 py-3 text-sm shadow-lg">
          {label}
          <div className="text-card-foreground italic">{children}</div>
        </div>
        <div className="absolute -bottom-3 left-6 h-3 w-3 rounded-full border border-border bg-card" />
        <div className="absolute -bottom-6 left-3 h-2 w-2 rounded-full border border-border bg-card" />
        <div className="absolute -bottom-8 left-1 h-1.5 w-1.5 rounded-full border border-border bg-card" />
      </motion.div>
    )
  }

  if (type === "shout") {
    return (
      <motion.div variants={shake} animate="a" className={cn("relative", className)}>
        <div className="balloon-shout bg-amber-300 px-12 py-9 text-center text-sm font-extrabold text-slate-900 shadow-xl">
          <span className="block text-[10px] font-black uppercase tracking-wide text-slate-700">
            {speaker}
          </span>
          <div className="mt-1">{children}</div>
        </div>
      </motion.div>
    )
  }

  if (type === "whisper") {
    return (
      <motion.div variants={fade} animate="a" className={cn("relative", className)}>
        <div className="rounded-2xl border-2 border-dashed border-muted-foreground/60 bg-card/70 px-4 py-3 text-sm text-muted-foreground shadow">
          {label}
          <div className="italic">{children}</div>
        </div>
        <div className="absolute -bottom-2 left-7 h-3 w-3 rotate-45 border-b-2 border-r-2 border-dashed border-muted-foreground/60 bg-card/70" />
      </motion.div>
    )
  }

  if (type === "broadcast") {
    return (
      <motion.div className={cn("relative", className)}>
        <div className="balloon-broadcast relative rounded-md border-2 border-sky-400 bg-card px-4 py-3 text-sm shadow-lg">
          <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-sky-500">
            <Radio className="h-3 w-3" />
            {speaker}
          </span>
          <div className="font-mono text-card-foreground">{children}</div>
          {/* lightning bolt tail */}
          <svg
            className="absolute -bottom-4 left-6 h-5 w-4 text-sky-400"
            viewBox="0 0 24 32"
            fill="currentColor"
            aria-hidden
          >
            <path d="M14 0 L2 18 H10 L8 32 L22 12 H13 Z" />
          </svg>
        </div>
      </motion.div>
    )
  }

  // speech (default)
  return (
    <motion.div variants={float} animate="a" className={cn("relative", className)}>
      <div className="relative rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-lg">
        {label}
        <div className="text-card-foreground">{children}</div>
      </div>
      <div className="absolute -bottom-2 left-7 h-4 w-4 rotate-45 border-b border-r border-border bg-card" />
    </motion.div>
  )
}
