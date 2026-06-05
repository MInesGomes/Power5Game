"use client"

import {
  Building2,
  Home,
  GraduationCap,
  Snowflake,
  Crown,
  Flame,
  Mountain,
  Rocket,
  Gamepad2,
  type LucideIcon,
} from "lucide-react"

const map: Record<string, LucideIcon> = {
  Building2,
  Home,
  GraduationCap,
  Snowflake,
  Crown,
  Flame,
  Mountain,
  Rocket,
  Gamepad2,
}

export function ThemeIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = map[name] ?? Building2
  return <Icon className={className} aria-hidden />
}
