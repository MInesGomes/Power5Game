"use client"

import { Moon, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useGame } from "@/lib/power5/game-context"
import { cn } from "@/lib/utils"
import i18n from 'i18next'
import { useEffect, useRef, useState } from 'react'

const LANGS = [
  { code: 'en', label: 'EN', src: '/flags/en.svg' },
  { code: 'pt', label: 'PT', src: '/flags/pt.svg' },
  { code: 'nl', label: 'NL', src: '/flags/nl.svg' },
]

export function ThemeToggle({ className }: { className?: string }) {
  const { state, dispatch } = useGame()
  const dark = state.dark
  const currentLang = state.language ?? 'en'
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const setLang = (code: string) => {
    dispatch({ type: 'SET_LANGUAGE', lang: code })
    try {
      i18n.changeLanguage(code)
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  // use a stable aria-label to avoid SSR/client hydration mismatches
  const stableAriaLabel = 'Toggle color theme'

  return (
    <div className={cn('flex items-center relative', className)} ref={menuRef}>
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_DARK" })}
        aria-label={stableAriaLabel}
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

      <div className="ml-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm hover:bg-muted"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <img src={LANGS.find((l) => l.code === currentLang)?.src} alt={currentLang} className="h-4 w-4" />
          <span className="font-medium">{currentLang.toUpperCase()}</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-36 rounded-md border border-border bg-card p-2 shadow-lg">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-muted"
              >
                <img src={l.src} alt={l.label} className="h-4 w-4" />
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
