"use client"

import { AnimatePresence, motion } from "motion/react"
import { RotateCcw, LayoutGrid, Award, Zap } from "lucide-react"
import { useGame } from "@/lib/power5/game-context"
import { getTheme } from "@/lib/power5/themes"
import { cn } from "@/lib/utils"

export function FinalModal() {
  const { state, dispatch } = useGame()
  const theme = getTheme(state.themeId)
  const max = (theme?.scenarios.length ?? 5) * 10
  const pct = Math.max(0, Math.round((state.score / max) * 100))

  let message = "Keep practicing — every choice builds the habit."
  if (pct >= 90) message = "Power Master! You lead with ownership, focus, and empathy."
  else if (pct >= 60) message = "Strong work. Your instincts are sharpening fast."
  else if (pct >= 30) message = "Solid effort. Review the feedback and run it back."

  return (
    <AnimatePresence>
      {state.showFinal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.85, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            <div className="bg-gradient-to-br from-primary/25 to-primary/5 p-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                <Zap className="h-7 w-7" fill="currentColor" />
              </div>
              <h2 className="font-heading text-2xl font-extrabold">Run Complete!</h2>
              <p className="mt-1 text-sm text-muted-foreground">{theme?.label} world</p>
            </div>

            <div className="p-6">
              <div className="flex items-end justify-center gap-2">
                <span className="font-heading text-5xl font-black text-primary tabular-nums">
                  {state.score}
                </span>
                <span className="pb-1.5 text-lg text-muted-foreground">/ {max} pts</span>
              </div>
              <p className="mt-3 text-pretty text-center text-sm leading-relaxed">{message}</p>

              {state.badges.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Award className="h-4 w-4" /> Badges earned
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {state.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: "RESET_GAME" })
                    if (state.themeId) {
                      dispatch({ type: "SET_THEME", themeId: state.themeId })
                      dispatch({ type: "START_GAME" })
                    }
                  }}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5",
                    "font-heading text-sm font-bold text-primary-foreground shadow-lg",
                  )}
                >
                  <RotateCcw className="h-4 w-4" /> Restart
                </button>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "GO_HOME" })}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 font-heading text-sm font-bold text-secondary-foreground"
                >
                  <LayoutGrid className="h-4 w-4" /> Choose Theme
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
