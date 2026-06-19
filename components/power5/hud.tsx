"use client"

import { Zap, Hand } from "lucide-react"
import { motion } from "motion/react"
import { useGame } from "@/lib/power5/game-context"
import { useTranslation } from 'react-i18next'
import { getTheme } from "@/lib/power5/themes"
import { ScoreCounter } from "./score-counter"
import { ThemeToggle } from "./theme-toggle"
import { ThemeIcon } from "./theme-icon"
import { cn } from "@/lib/utils"

function Logo() {
  return (
    <div className="flex items-center gap-1.5 font-heading text-lg font-extrabold tracking-tight sm:text-xl">
      <Zap className="h-5 w-5 text-primary" fill="currentColor" />
      <span>Power</span>
      <span className="text-primary">5</span>
      <Hand className="h-5 w-5 text-primary" />
    </div>
  )
}

export function Hud({ variant }: { variant: "dashboard" | "game" }) {
  const { state } = useGame()
  const { t } = useTranslation()
  const theme = getTheme(state.themeId)
  const total = theme?.scenarios.length ?? 5

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Logo />

        {variant === "game" && (
          <div className="ml-2 hidden items-center gap-1.5 sm:flex">
            {Array.from({ length: total }).map((_, i) => {
              const done = i < state.stageIndex
              const current = i === state.stageIndex
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ scale: current ? 1.15 : 1 }}
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      done && "bg-primary text-primary-foreground",
                      current && "bg-primary text-primary-foreground ring-2 ring-primary/40 ring-offset-2 ring-offset-background",
                      !done && !current && "bg-secondary text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </motion.span>
                  {i < total - 1 && (
                    <span
                      className={cn(
                        "h-0.5 w-3 rounded-full",
                        i < state.stageIndex ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}

        {variant === "dashboard" && state.badges.length > 0 && (
          <div className="ml-2 hidden flex-wrap items-center gap-1.5 md:flex">
            {state.badges.slice(0, 4).map((b) => (
              <span
                key={b}
                className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary"
              >
                {b}
              </span>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-3">
          {variant === "game" && theme && (
            <span className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground sm:flex">
              <ThemeIcon name={theme.icon} className="h-3.5 w-3.5" />
              {theme.label}
            </span>
          )}

          <div className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 font-heading text-sm font-bold text-primary">
            <Zap className="h-4 w-4" fill="currentColor" />
            <ScoreCounter value={state.score} />
            <span className="text-primary/70">{t('pts')}</span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
