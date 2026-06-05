"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useGame } from "@/lib/power5/game-context"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { state, dispatch } = useGame()
  const dark = state.dark

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: "TOGGLE_DARK" })}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-secondary px-1 transition-colors",
        className,
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow",
          dark ? "ml-auto" : "ml-0",
        )}
      >
        {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.span>
    </button>
  )
}
