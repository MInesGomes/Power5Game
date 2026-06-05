"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import type { Scenario, ThemeDef, CharacterPosition } from "@/lib/power5/types"
import { CharacterSprite } from "./character-sprite"
import { DialogueBalloon } from "./dialogue-balloon"
import { Typewriter } from "./typewriter"
import { cn } from "@/lib/utils"

const charPos: Record<CharacterPosition, string> = {
  left: "left-[6%] bottom-[20%]",
  center: "left-1/2 -translate-x-1/2 bottom-[18%]",
  right: "right-[6%] bottom-[20%]",
  foreground: "left-[16%] bottom-[8%] scale-110",
  background: "right-[10%] top-[16%] scale-75 opacity-90",
}

const balloonAlign: Record<CharacterPosition, string> = {
  left: "left-[3%] items-start",
  center: "left-1/2 -translate-x-1/2 items-center",
  right: "right-[3%] items-end",
  foreground: "left-[6%] items-start",
  background: "right-[4%] items-end",
}

export function Scene3D({ scenario, theme }: { scenario: Scenario; theme: ThemeDef }) {
  const { sceneMetadata } = scenario
  const [revealed, setRevealed] = useState(1)

  useEffect(() => {
    setRevealed(1)
    if (sceneMetadata.dialogues.length <= 1) return
    const id = setInterval(() => {
      setRevealed((r) => {
        if (r >= sceneMetadata.dialogues.length) {
          clearInterval(id)
          return r
        }
        return r + 1
      })
    }, 2600)
    return () => clearInterval(id)
  }, [scenario.id, sceneMetadata.dialogues.length])

  const getChar = (id: string) => sceneMetadata.characters.find((c) => c.id === id)

  return (
    
    <div className="relative h-[clamp(320px,46vh,460px)] w-full overflow-hidden rounded-3xl border border-border shadow-inner">

      {/* environment backdrop */}
      <div className={cn("absolute inset-0 bg-gradient-to-b", theme.sceneGradient)} />

      {/* faux-3D floor grid */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden [perspective:600px]">
        <div
          className="absolute inset-x-[-50%] bottom-[-60%] h-[200%] w-[200%] opacity-30 dark:opacity-20"
          style={{
            transform: "rotateX(62deg)",
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to top, black, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to top, black, transparent 80%)",
          }}
        />
      </div>

      {/* ambient glow layers */}
      <div className="pointer-events-none absolute -left-10 top-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      {/* environment label */}
      <div className="absolute left-4 top-4 z-20 max-w-[60%]">
        <p className="rounded-full bg-background/70 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
          {sceneMetadata.cameraAngle}
        </p>
      </div>

      {/* character layer (tilted for 3D feel) */}
      <div className="absolute inset-0 scene-tilt">
        {sceneMetadata.characters.map((c) => {
          const isSpeaking = sceneMetadata.dialogues
            .slice(0, revealed)
            .some((d) => d.speakerId === c.id && d.type !== "thought")
          return (
            <div key={c.id} className={cn("absolute z-10", charPos[c.position])}>
              <CharacterSprite character={c} speaking={isSpeaking} />
            </div>
          )
        })}
      </div>

      {/* dialogue balloon layer */}
      <div className="absolute inset-0 z-20">
        <AnimatePresence>
          {sceneMetadata.dialogues.slice(0, revealed).map((d, i) => {
            const speaker = getChar(d.speakerId)
            const pos = speaker?.position ?? "center"
            const topOffset = 8 + i * 22
            return (
              <motion.div
                key={`${scenario.id}-${i}`}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={cn("absolute flex max-w-[58%] flex-col sm:max-w-[44%]", balloonAlign[pos])}
                style={{ top: `${topOffset}%` }}
              >
                <DialogueBalloon type={d.type} speaker={speaker?.name ?? "?"}>
                  <Typewriter text={d.lines.join("\n")} />
                </DialogueBalloon>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>


    </div>
  )
}
