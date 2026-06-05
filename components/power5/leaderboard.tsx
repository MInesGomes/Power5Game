"use client"

import { Trophy, Medal, Award } from "lucide-react"
import { motion } from "motion/react"
import { useGame } from "@/lib/power5/game-context"
import { cn } from "@/lib/utils"

interface Row {
  name: string
  score: number
}

const baseRows: Row[] = [
  { name: "John", score: 1004 },
  { name: "Alex", score: 610 },
  { name: "Leo", score: 40 },
]

const rankIcon = [Trophy, Medal, Award]
const rankColor = ["text-amber-500", "text-slate-400", "text-orange-700 dark:text-orange-400"]

export function Leaderboard() {
  const { state } = useGame()

  const rows: (Row & { you?: boolean })[] = [
    ...baseRows,
    ...(state.score !== 0 ? [{ name: "You", score: state.score, you: true }] : []),
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
    <section
      aria-label="Leaderboard"
      className="rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        <h2 className="font-heading text-lg font-bold">Leaderboard</h2>
      </div>
      <ul className="flex flex-col gap-2">
        {rows.map((row, i) => {
          const Icon = rankIcon[i] ?? Award
          return (
            <motion.li
              key={row.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5",
                row.you ? "bg-primary/15 ring-1 ring-primary/40" : "bg-secondary/60",
              )}
            >
              <span className="flex w-6 justify-center">
                <Icon className={cn("h-4 w-4", rankColor[i] ?? "text-muted-foreground")} />
              </span>
              <span className="flex-1 font-medium">{row.name}</span>
              <span className="font-heading font-bold tabular-nums">{row.score.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">pts</span>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
