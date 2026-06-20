"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, Home } from "lucide-react"
import { useGame } from "@/lib/power5/game-context"
import { getTheme } from "@/lib/power5/themes"
import { useCurrentThemeScenarios } from "@/lib/hooks/useOfficeScenarios"
import { Hud } from "./hud"
import { Scene3D } from "./scene-3d"
import { ChoicePanel } from "./choice-panel"
import { FinalModal } from "./final-modal"

export function GameplayScreen() {
  const { state, dispatch } = useGame()
  const theme = getTheme(state.themeId)
  const scenarios = useCurrentThemeScenarios()
  const [hoverBack, setHoverBack] = useState(false)

  if (!theme) return null
  const scenario = scenarios[state.stageIndex]
  if (!scenario) return null
  const isLast = state.stageIndex >= scenarios.length - 1

  return (
    <div className="min-h-dvh">
      <Hud variant="game" />

      <main className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-5">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-heading text-xl font-extrabold sm:text-2xl">
            <span className="text-primary">Level {scenario.level}</span> · {scenario.title}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-5"
          >
             
                  
            <Scene3D scenario={scenario} theme={theme} />
            <ChoicePanel
              scenario={scenario}
              isLast={isLast}
              onNext={() => dispatch({ type: "NEXT_STAGE" })}
            />
          </motion.div>
        </AnimatePresence>

        {/* bottom navigation bar */}
        <div className="flex items-center justify-between pb-6">
          <div className="relative">
            {state.stageIndex > 0 ? (
              <button
                type="button"
                onClick={() => dispatch({ type: "PREV_STAGE" })}
                onMouseEnter={() => setHoverBack(true)}
                onMouseLeave={() => setHoverBack(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <span />
            )}
            <AnimatePresence>
              {hoverBack && state.stageIndex > 0 && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute -top-9 left-0 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow"
                >
                  Go to level {state.stageIndex}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: "GO_HOME" })}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:bg-secondary"
          >
            <Home className="h-4 w-4" /> Home
          </button>
        </div>
      </main>

      <FinalModal />
    </div>
  )
}
