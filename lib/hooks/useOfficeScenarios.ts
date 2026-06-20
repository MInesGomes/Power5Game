import { useTranslation } from 'react-i18next'
import { useGame } from '../power5/game-context'
import { getScenariosForThemeAndLanguage } from '../power5/scenarios-i18n'
import type { Scenario } from '../power5/types'

/**
 * Hook that returns office scenarios translated to the current language
 * Automatically updates when language changes via i18next
 */
export function useOfficeScenarios(): Scenario[] {
  const { i18n } = useTranslation()
  
  // Re-fetch scenarios whenever language changes
  const scenarios = getScenariosForThemeAndLanguage('office', i18n.language)
  
  return scenarios
}

/**
 * Hook that returns scenarios for the current game theme and language
 * Used in gameplay screen to get context-aware translated scenarios
 */
export function useCurrentThemeScenarios(): Scenario[] {
  const { i18n } = useTranslation()
  const { state } = useGame()
  
  // Get scenarios for current theme and language
  const scenarios = getScenariosForThemeAndLanguage(state.themeId, i18n.language)
  
  return scenarios
}
