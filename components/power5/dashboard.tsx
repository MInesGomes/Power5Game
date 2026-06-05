"use client"

import { motion } from "motion/react"
import { Hud } from "./hud"
import { Leaderboard } from "./leaderboard"
import { ThemeSelectorGrid } from "./theme-selector-grid"

const skills = [
  { n: 1, label: "Own" },
  { n: 2, label: "Prioritize" },
  { n: 3, label: "Collaborate" },
  { n: 4, label: "Listen" },
  { n: 5, label: "Recharge" },
]

export function Dashboard() {
  return (
    <div className="min-h-dvh">
      <Hud variant="dashboard" />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-balance font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            Master the <span className="text-primary">5 Power Skills</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            An interactive visual novel. Step into real scenarios, make the call, and learn what
            true ownership, focus, and empathy look like.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {skills.map((s) => (
              <span
                key={s.n}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-sm font-semibold shadow-sm"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {s.n}
                </span>
                {s.label}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Leaderboard />
          <ThemeSelectorGrid />
        </div>
      </main>
    </div>
  )
}
