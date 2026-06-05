import type { ThemeDef } from "./types"
import { officeScenarios, homeScenarios } from "./scenarios"

/**
 * Power 5 themes. Office and Home ship with fully authored scenarios.
 * The remaining themes re-skin the universal Power 5 scenario set with a
 * distinct environment so every selector button is playable.
 */
export const themes: ThemeDef[] = [
  {
    id: "office",
    label: "Office",
    icon: "Building2",
    gradient: "from-sky-400 via-cyan-400 to-blue-500",
    sceneGradient: "from-slate-200 via-sky-100 to-slate-300 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950",
    accent: "sky",
    scenarios: officeScenarios,
  },
  {
    id: "home",
    label: "Home",
    icon: "Home",
    gradient: "from-amber-400 via-orange-400 to-rose-500",
    sceneGradient: "from-amber-100 via-orange-100 to-rose-200 dark:from-amber-950 dark:via-orange-950 dark:to-rose-950",
    accent: "amber",
    scenarios: homeScenarios,
  },
  {
    id: "school",
    label: "School",
    icon: "GraduationCap",
    gradient: "from-emerald-400 via-teal-400 to-cyan-500",
    sceneGradient: "from-emerald-100 via-teal-100 to-cyan-200 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950",
    accent: "emerald",
    scenarios: officeScenarios,
  },
  {
    id: "antarctica",
    label: "Antarctica",
    icon: "Snowflake",
    gradient: "from-cyan-300 via-sky-300 to-indigo-400",
    sceneGradient: "from-cyan-100 via-sky-100 to-indigo-200 dark:from-cyan-950 dark:via-sky-950 dark:to-indigo-950",
    accent: "cyan",
    scenarios: officeScenarios,
  },
  {
    id: "el-dorado",
    label: "El Dorado",
    icon: "Crown",
    gradient: "from-yellow-300 via-amber-400 to-orange-500",
    sceneGradient: "from-yellow-100 via-amber-100 to-orange-200 dark:from-yellow-950 dark:via-amber-950 dark:to-orange-950",
    accent: "amber",
    scenarios: officeScenarios,
  },
  {
    id: "dragons",
    label: "Dragons",
    icon: "Flame",
    gradient: "from-orange-400 via-red-500 to-rose-600",
    sceneGradient: "from-orange-100 via-red-100 to-rose-200 dark:from-orange-950 dark:via-red-950 dark:to-rose-950",
    accent: "rose",
    scenarios: homeScenarios,
  },
  {
    id: "iceland",
    label: "Iceland",
    icon: "Mountain",
    gradient: "from-teal-300 via-emerald-400 to-green-500",
    sceneGradient: "from-teal-100 via-emerald-100 to-green-200 dark:from-teal-950 dark:via-emerald-950 dark:to-green-950",
    accent: "teal",
    scenarios: officeScenarios,
  },
  {
    id: "space-land",
    label: "Space Land",
    icon: "Rocket",
    gradient: "from-indigo-400 via-blue-500 to-cyan-500",
    sceneGradient: "from-indigo-200 via-blue-200 to-slate-300 dark:from-indigo-950 dark:via-blue-950 dark:to-slate-950",
    accent: "indigo",
    scenarios: officeScenarios,
  },
  {
    id: "play-land",
    label: "Play Land",
    icon: "Gamepad2",
    gradient: "from-pink-400 via-rose-400 to-orange-400",
    sceneGradient: "from-pink-100 via-rose-100 to-orange-200 dark:from-pink-950 dark:via-rose-950 dark:to-orange-950",
    accent: "rose",
    scenarios: homeScenarios,
  },
]

export function getTheme(id: string | null): ThemeDef | undefined {
  if (!id) return undefined
  return themes.find((t) => t.id === id)
}
