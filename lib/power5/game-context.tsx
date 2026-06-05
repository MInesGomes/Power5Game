"use client"

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react"
import type { ChoiceKey } from "./types"
import { getTheme } from "./themes"

export interface GameState {
  /** 1 = dashboard, 2-6 = gameplay stages */
  screen: number
  themeId: string | null
  dark: boolean
  score: number
  /** 0-based index into the current theme's scenarios */
  stageIndex: number
  /** scenarioId -> chosen key */
  choices: Record<string, ChoiceKey>
  badges: string[]
  showFinal: boolean
}

type Action =
  | { type: "SET_THEME"; themeId: string }
  | { type: "START_GAME" }
  | { type: "MAKE_CHOICE"; scenarioId: string; choiceKey: ChoiceKey; points: number }
  | { type: "NEXT_STAGE" }
  | { type: "PREV_STAGE" }
  | { type: "TOGGLE_DARK" }
  | { type: "RESET_GAME" }
  | { type: "GO_HOME" }
  | { type: "CLOSE_FINAL" }
  | { type: "HYDRATE"; state: Partial<GameState> }

const STORAGE_KEY = "power5-state-v1"

const initialState: GameState = {
  screen: 1,
  themeId: null,
  dark: false,
  score: 0,
  stageIndex: 0,
  choices: {},
  badges: [],
  showFinal: false,
}

function computeBadges(state: GameState): string[] {
  const theme = getTheme(state.themeId)
  if (!theme) return []
  const earned: string[] = []
  for (const scenario of theme.scenarios) {
    const picked = state.choices[scenario.id]
    if (!picked) continue
    const choice = scenario.choices.find((c) => c.key === picked)
    if (choice && choice.points === 10) {
      earned.push(scenario.principle.split("—")[1]?.trim() ?? scenario.title)
    }
  }
  const total = theme.scenarios.reduce((sum, s) => {
    const picked = state.choices[s.id]
    const c = s.choices.find((ch) => ch.key === picked)
    return sum + (c?.points ?? 0)
  }, 0)
  let rank = "Rookie"
  if (total >= 45) rank = "Power Master"
  else if (total >= 30) rank = "Empath"
  else if (total >= 15) rank = "Apprentice"
  return [rank, ...earned]
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, themeId: action.themeId }
    case "START_GAME":
      return {
        ...state,
        screen: 2,
        stageIndex: 0,
        score: 0,
        choices: {},
        showFinal: false,
      }
    case "MAKE_CHOICE": {
      // ignore re-answers for the same scenario
      if (state.choices[action.scenarioId]) return state
      return {
        ...state,
        score: state.score + action.points,
        choices: { ...state.choices, [action.scenarioId]: action.choiceKey },
      }
    }
    case "NEXT_STAGE": {
      const theme = getTheme(state.themeId)
      const last = (theme?.scenarios.length ?? 5) - 1
      if (state.stageIndex >= last) {
        return { ...state, showFinal: true, badges: computeBadges(state) }
      }
      return { ...state, stageIndex: state.stageIndex + 1, screen: state.screen + 1 }
    }
    case "PREV_STAGE":
      if (state.stageIndex <= 0) return state
      return { ...state, stageIndex: state.stageIndex - 1, screen: state.screen - 1 }
    case "TOGGLE_DARK":
      return { ...state, dark: !state.dark }
    case "RESET_GAME":
      return {
        ...state,
        screen: 1,
        score: 0,
        stageIndex: 0,
        choices: {},
        showFinal: false,
      }
    case "GO_HOME":
      return { ...state, screen: 1, showFinal: false }
    case "CLOSE_FINAL":
      return { ...state, showFinal: false }
    case "HYDRATE":
      return { ...state, ...action.state }
    default:
      return state
  }
}

interface GameContextValue {
  state: GameState
  dispatch: React.Dispatch<Action>
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<GameState>
        dispatch({ type: "HYDRATE", state: parsed })
      } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        dispatch({ type: "HYDRATE", state: { dark: true } })
      }
    } catch {
      /* ignore */
    }
  }, [])

  // persist + reflect dark mode on <html>
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
    const root = document.documentElement
    root.classList.toggle("dark", state.dark)
  }, [state])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used within GameProvider")
  return ctx
}
