"use client"

import { motion, type Variants } from "motion/react"
import type { Character } from "@/lib/power5/types"
import { cn } from "@/lib/utils"

const toneBody: Record<Character["tone"], string> = {
  primary: "bg-primary",
  rose: "bg-rose-400",
  sky: "bg-sky-400",
  amber: "bg-amber-400",
  emerald: "bg-emerald-400",
  slate: "bg-slate-400 dark:bg-slate-500",
}

const toneHead: Record<Character["tone"], string> = {
  primary: "bg-amber-200",
  rose: "bg-rose-200",
  sky: "bg-sky-200",
  amber: "bg-amber-100",
  emerald: "bg-emerald-200",
  slate: "bg-slate-200",
}

const anim: Record<string, Variants> = {
  idle: { a: { y: [0, -5, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } } },
  bob: { a: { y: [0, -10, 0], transition: { duration: 1.1, repeat: Infinity, ease: "easeInOut" } } },
  fidget: { a: { rotate: [-3, 3, -3], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } } },
  lean: { a: { rotate: [0, 6, 0], transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } } },
  slump: { a: { y: [0, 3, 0], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } } },
  pulse: { a: { scale: [1, 1.06, 1], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } } },
}

function Face({ emotion }: { emotion: string }) {
  const e = emotion.toLowerCase()
  const sad = /(exhaust|drain|nervous|frustrat|hurt|anxious|overwhelm|defensive|distress|slump)/.test(e)
  const tense = /(concern|demand|focus|attentive|reflect)/.test(e)
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
      <div className="flex gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
      </div>
      <span
        className={cn(
          "block h-1.5 w-3.5 border-slate-800",
          sad
            ? "rounded-t-full border-t-2"
            : tense
              ? "h-0.5 w-3 rounded-none border-b-2"
              : "rounded-b-full border-b-2",
        )}
      />
    </div>
  )
}

export function CharacterSprite({
  character,
  speaking,
}: {
  character: Character
  speaking?: boolean
}) {
  const variant = anim[character.animation] ?? anim.idle

  return (
    <div className="flex flex-col items-center gap-2 preserve-3d">
      <motion.div
        variants={variant}
        animate="a"
        className="flex flex-col items-center"
        style={{ transformOrigin: "bottom center" }}
      >
        {/* head */}
        <div className={cn("relative h-12 w-12 rounded-full border border-black/10 shadow-md sm:h-14 sm:w-14", toneHead[character.tone])}>
          <Face emotion={character.emotion} />
        </div>
        {/* body */}
        <div
          className={cn(
            "-mt-1.5 h-16 w-20 rounded-t-[40%] rounded-b-xl border border-black/10 shadow-lg sm:h-20 sm:w-24",
            toneBody[character.tone],
          )}
        />
        {/* shadow */}
        <div className="mt-1 h-2 w-16 rounded-[100%] bg-black/20 blur-sm" />
      </motion.div>

      <span
        className={cn(
          "rounded-full px-2.5 py-0.5 text-[11px] font-semibold shadow-sm",
          speaking
            ? "bg-primary text-primary-foreground"
            : "bg-card/90 text-card-foreground",
        )}
      >
        {character.name}
        {character.isPlayer && " (You)"}
      </span>
    </div>
  )
}
