"use client"

import { useEffect, useState } from "react"
import { animate, useMotionValue } from "motion/react"

export function ScoreCounter({ value }: { value: number }) {
  const mv = useMotionValue(value)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const controls = animate(mv, value, {
      type: "spring",
      stiffness: 120,
      damping: 18,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [value, mv])

  return <span className="tabular-nums">{display}</span>
}
