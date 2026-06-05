"use client"

import { motion } from "motion/react"
import { useGame } from "@/lib/power5/game-context"
import { themes } from "@/lib/power5/themes"
import { ThemeIcon } from "./theme-icon"
import { cn } from "@/lib/utils"

export function ThemeSelectorGrid() {
  const { dispatch } = useGame()

  const choose = (id: string) => {
    dispatch({ type: "SET_THEME", themeId: id })
    dispatch({ type: "START_GAME" })
  }

  return (
    <section aria-label="Choose a theme" className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <h2 className="font-heading text-lg font-bold">Choose your world</h2>
        <p className="text-sm text-muted-foreground">5 scenarios. 5 power skills.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {themes.map((theme, i) => (
          <motion.button
            key={theme.id}
            type="button"
            onClick={() => choose(theme.id)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-2xl p-[2px] text-left",
              "bg-gradient-to-br shadow-sm",
              theme.gradient,
            )}
          >
            <span className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[14px] bg-card/95 p-3 sm:p-4">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow",
                  theme.gradient,
                )}
              >
                <ThemeIcon name={theme.icon} className="h-5 w-5" />
              </span>
              <span className="font-heading text-sm font-bold sm:text-base">{theme.label}</span>
              <span
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-15",
                  theme.gradient,
                )}
              />
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
