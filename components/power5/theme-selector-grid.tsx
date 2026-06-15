"use client"

import { motion } from "motion/react"
import { useGame } from "@/lib/power5/game-context"
import { themes } from "@/lib/power5/themes"
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
            <span
              className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[14px] p-3 sm:p-4 "
              style={{
                backgroundImage: `url(${theme.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <span className="font-heading text-white self-center font-bold sm:text-base mt-auto" >{theme.label}</span>
            </span> 
          </motion.button>
        ))}
      </div>
    </section>
  )
}
