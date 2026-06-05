"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Typewriter({
  text,
  speed = 22,
  className,
  caret = true,
}: {
  text: string
  speed?: number
  className?: string
  caret?: boolean
}) {
  const [shown, setShown] = useState("")

  useEffect(() => {
    setShown("")
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  const done = shown.length >= text.length

  return (
    <span className={cn("whitespace-pre-line", caret && !done && "caret-blink", className)}>
      {shown}
    </span>
  )
}
