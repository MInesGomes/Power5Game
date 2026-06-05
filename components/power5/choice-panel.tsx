"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check, X, Minus } from "lucide-react"
import type { Choice, Scenario } from "@/lib/power5/types"
import { useGame } from "@/lib/power5/game-context"
import { playPointsSound } from "@/lib/power5/sounds"
import { cn } from "@/lib/utils"
import { Typewriter } from "./typewriter"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pointsLabel(p: number) {
  return p > 0 ? `+${p}` : `${p}`
}

function pointsTone(p: number) {
  if (p >= 10) return "text-emerald-600 dark:text-emerald-400"
  if (p > 0) return "text-sky-600 dark:text-sky-400"
  if (p === 0) return "text-muted-foreground"
  return "text-destructive"
}

export function ChoicePanel({
  scenario,
  isLast,
  onNext,
}: {
  scenario: Scenario
  isLast: boolean
  onNext: () => void
}) {
  const { state, dispatch } = useGame()
  const answeredKey = state.choices[scenario.id]
  const ordered = useMemo(() => shuffle(scenario.choices), [scenario.id])
  const [flash, setFlash] = useState<null | "good" | "bad">(null)
  const [floatPts, setFloatPts] = useState<number | null>(null)

  const answeredChoice = answeredKey
    ? scenario.choices.find((c) => c.key === answeredKey)
    : undefined

  const handlePick = (choice: Choice) => {
    if (answeredKey) return
    dispatch({
      type: "MAKE_CHOICE",
      scenarioId: scenario.id,
      choiceKey: choice.key,
      points: choice.points,
    })
    playPointsSound(choice.points)
    setFlash(choice.points >= 10 ? "good" : "bad")
    setFloatPts(choice.points)
    setTimeout(() => setFlash(null), 650)
    setTimeout(() => setFloatPts(null), 1400)
  }

  return (
    
    <div className="relative">
      {/* full-screen flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "pointer-events-none fixed inset-0 z-50",
              flash === "good"
                ? "bg-emerald-400/20 shadow-[inset_0_0_120px_30px_rgba(16,185,129,0.55)]"
                : "bg-destructive/10 shadow-[inset_0_0_160px_60px_rgba(220,38,38,0.45)]",
            )}
          />
        )}
      </AnimatePresence>

      <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-xl backdrop-blur-md sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">

      {/* scenario description */}
      <div className="inset-x-0 top-0 z-30 bg-gradient-to-b from-background/95 via-background/80 to-transparent p-4 pb-10">
        <p className="mx-auto max-w-3xl text-pretty text-sm leading-relaxed text-foreground sm:text-base">
          <Typewriter text={scenario.description} speed={14} caret={false} />
        </p>
      </div>
          <h3 className="font-heading text-base text-center font-bold sm:text-lg">
            What do you do?
          </h3>
          {/* <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            {scenario.principle}
          </span> */}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {ordered.map((choice) => {
            const isChosen = answeredKey === choice.key
            const revealed = Boolean(answeredKey)
            const isBest = choice.points >= 10
            return (
              <div key={choice.key} className="relative flex flex-col">
                <motion.button
                  type="button"
                  disabled={revealed}
                  onClick={() => handlePick(choice)}
                  whileHover={!revealed ? { y: -2 } : undefined}
                  whileTap={!revealed ? { scale: 0.98 } : undefined}
                  className={cn(
                    "relative h-full rounded-2xl border p-4 text-left text-sm transition-colors",
                    !revealed && "border-border bg-background hover:border-primary/60 hover:bg-primary/5",
                    revealed && isChosen && isBest && "border-emerald-500 bg-emerald-500/10",
                    revealed && isChosen && !isBest && "border-destructive bg-destructive/10",
                    revealed && !isChosen && "border-border bg-background opacity-60",
                  )}
                >
                  <div className="flex items-start gap-3">
                    {revealed && (
                      <span
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-heading text-sm font-bold",
                          isBest && "bg-emerald-500 text-white",
                          isChosen && !isBest && "bg-destructive text-white",
                          !isBest && !isChosen && "bg-secondary text-secondary-foreground",
                        )}
                      >
                        {isBest ? (
                          <Check className="h-4 w-4" />
                        ) : isChosen ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Minus className="h-4 w-4" />
                        )}
                      </span>
                    )}
                    <span className="leading-snug">{choice.text}</span>
                  </div>

                  {/* points revealed after answering */}
                  <AnimatePresence>
                    {revealed && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                          "absolute right-2 top-2 rounded-full bg-card px-2 py-0.5 text-xs font-bold shadow",
                          pointsTone(choice.points),
                        )}
                      >
                        {pointsLabel(choice.points)} pts
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* floating points on the chosen button */}
                  <AnimatePresence>
                    {floatPts !== null && isChosen && (
                      <motion.span
                        initial={{ opacity: 0, y: 0, scale: 0.8 }}
                        animate={{ opacity: 1, y: -48, scale: 1.3 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className={cn(
                          "pointer-events-none absolute right-4 top-2 font-heading text-2xl font-black drop-shadow",
                          pointsTone(choice.points),
                        )}
                      >
                        {pointsLabel(choice.points)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* feedback under each flawed option */}
                <AnimatePresence>
                  {revealed && choice.feedback && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-1.5 px-1 text-xs leading-relaxed text-muted-foreground"
                    >
                      {choice.feedback}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* result banner + next */}
        <AnimatePresence>
          {answeredChoice && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p
                className={cn(
                  "text-sm font-semibold",
                  answeredChoice.points >= 10
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-foreground",
                )}
              >
                {answeredChoice.points >= 10
                  ? "Excellent. That's the power move."
                  : "Review the feedback above, then continue."}
              </p>
              <motion.button
                type="button"
                onClick={onNext}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-heading text-sm font-bold text-primary-foreground shadow-lg"
              >
                {isLast ? "See Results" : "Next Level"}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
