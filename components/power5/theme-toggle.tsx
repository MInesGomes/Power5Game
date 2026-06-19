"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useGame } from "@/lib/power5/game-context"
import { cn } from "@/lib/utils"
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

export function ThemeToggle({ className }: { className?: string }) {
  const { state, dispatch } = useGame()
  const dark = state.dark
  const { t } = useTranslation()

  return (
    <div className={cn('flex items-center', className)}>
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_DARK" })}
        aria-label={dark ? (t('theme_light') as string) : (t('theme_dark') as string)}
        className={cn(
          "relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-secondary px-1 transition-colors",
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

      <div className="ml-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => i18n.changeLanguage('en')}
          aria-label="Switch language to English"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-muted"
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>

        <button
          type="button"
          onClick={() => i18n.changeLanguage('pt')}
          aria-label="Switch language to Portuguese"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-muted"
        >
          <span>🇵🇹</span>
          <span>PT</span>
        </button>

        <button
          type="button"
          onClick={() => i18n.changeLanguage('nl')}
          aria-label="Switch language to Dutch"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm hover:bg-muted"
        >
          <span>🇳🇱</span>
          <span>NL</span>
        </button>
      </div>
    </div>
  )
}
