"use client"

import { GameProvider, useGame } from "@/lib/power5/game-context"
import { Dashboard } from "./dashboard"
import { GameplayScreen } from "./gameplay-screen"

function GameRouter() {
  const { state } = useGame()
  return state.screen === 1 ? <Dashboard /> : <GameplayScreen />
}

export function Power5Game() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  )
}
