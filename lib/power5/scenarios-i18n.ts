import type { Scenario } from "./types"
import enScenarios from '../../public/locales/en/office-scenarios.json'
import ptScenarios from '../../public/locales/pt/office-scenarios.json'
import nlScenarios from '../../public/locales/nl/office-scenarios.json'
import esScenarios from '../../public/locales/es/office-scenarios.json'

const scenariosByLanguage: Record<string, typeof enScenarios> = {
  en: enScenarios,
  pt: ptScenarios,
  nl: nlScenarios,
  es: esScenarios,
}

// Static metadata structure for scenarios (characters, positions, animations, etc.)
const scenarioMetadata: Record<string, any> = {
  "office-1": {
    environment:
      "Modern open-plan office. Large project dashboard on a wall screen. Shipment warning notification flashing red.",
    cameraAngle: "Slight isometric perspective from above with slow floating movement.",
    characters: [
      {
        id: "pm",
        name: "Project Manager",
        position: "center",
        emotion: "Focused but concerned",
        animation: "idle",
        isPlayer: true,
        tone: "primary",
      },
      {
        id: "team",
        name: "Team Member",
        position: "left",
        emotion: "Nervous",
        animation: "fidget",
        tone: "rose",
      },
      {
        id: "client",
        name: "Client",
        position: "background",
        emotion: "Concerned",
        animation: "pulse",
        tone: "sky",
      },
    ],
  },
  "office-2": {
    environment: "Busy office desk. Multiple pop-up notifications floating in 3D space. Calendar showing a deadline countdown.",
    cameraAngle: "Medium desk-level perspective.",
    characters: [
      {
        id: "player",
        name: "You",
        position: "center",
        emotion: "Concentrated",
        animation: "idle",
        isPlayer: true,
        tone: "primary",
      },
      {
        id: "colleague",
        name: "Friendly Colleague",
        position: "right",
        emotion: "Relaxed and smiling",
        animation: "bob",
        tone: "amber",
      },
    ],
  },
  "office-3": {
    environment:
      "Virtual meeting room with professional minimalist aesthetic. Two webcam windows floating in 3D space. Contract document holographically displayed.",
    cameraAngle: "Wide angle perspective from behind a virtual desk.",
    characters: [
      {
        id: "you",
        name: "You",
        position: "center",
        emotion: "Thoughtful and collaborative",
        animation: "idle",
        isPlayer: true,
        tone: "primary",
      },
      {
        id: "producer",
        name: "Content Producer",
        position: "right",
        emotion: "Cautiously hopeful",
        animation: "nod",
        tone: "cyan",
      },
    ],
  },
  "office-4": {
    environment:
      "Private office space with warm lighting. Employee visibly distressed, leaning against wall. Coffee cup on desk, notes scattered.",
    cameraAngle: "Close, intimate perspective from slightly below.",
    characters: [
      {
        id: "manager",
        name: "You (Manager)",
        position: "center",
        emotion: "Calm and present",
        animation: "idle",
        isPlayer: true,
        tone: "primary",
      },
      {
        id: "employee",
        name: "Team Member",
        position: "left",
        emotion: "Overwhelmed and frustrated",
        animation: "fidget",
        tone: "red",
      },
    ],
  },
  "office-5": {
    environment:
      "Late night empty office. Dim ambient lighting. Multiple energy drink cans on desk. Calendar marked with X's leading to today. Faint laptop glow.",
    cameraAngle: "Overhead view with slight tilt, slow zoom-in on character.",
    characters: [
      {
        id: "you",
        name: "You",
        position: "center",
        emotion: "Exhausted and hollowed",
        animation: "slump",
        isPlayer: true,
        tone: "primary",
      },
    ],
  },
}

/**
 * Gets translated scenarios for a given language
 * Merges translated text content with static metadata (characters, positions, etc.)
 */
export function getTranslatedScenarios(language: string = 'en'): Scenario[] {
  const translatedData = scenariosByLanguage[language] || scenariosByLanguage['en']
  const scenarios: Scenario[] = []

  Object.entries(translatedData.scenarios).forEach(([scenarioId, scenario]) => {
    const metadata = scenarioMetadata[scenarioId]
    if (!metadata) return

    // Convert translated dialogue objects to the sceneMetadata format
    const dialogues = scenario.dialogues.map((dialogue: any) => ({
      speakerId: dialogue.speaker.toLowerCase().replace(/\s+/g, '-'),
      type: dialogue.type,
      lines: [dialogue.text],
    }))

    // Convert translated choices to the choices format
    const choices = scenario.choices.map((choice: any) => ({
      key: choice.key,
      points: choice.points,
      text: choice.text,
      feedback: choice.feedback,
    }))

    const translatedScenario: Scenario = {
      id: scenarioId,
      level: parseInt(scenarioId.replace('office-', '')) || 1,
      title: scenario.title,
      principle: scenario.principle,
      description: scenario.description,
      sceneMetadata: {
        ...metadata,
        dialogues,
      },
      choices,
    }

    scenarios.push(translatedScenario)
  })

  return scenarios
}

// Legacy export for backward compatibility - returns English scenarios by default
export const officeScenarios = getTranslatedScenarios('en')

/**
 * Gets scenarios for a specific theme and language
 * Currently only office theme supports translations
 * Other themes fall back to English office scenarios
 */
export function getScenariosForThemeAndLanguage(
  themeId: string | null,
  language: string = 'en'
): ReturnType<typeof getTranslatedScenarios> {
  // Only the "office" theme currently has translated scenarios
  if (themeId === 'office') {
    return getTranslatedScenarios(language)
  }
  
  // All other themes use office scenarios as placeholder
  // (they will be re-skinned with different environments)
  return getTranslatedScenarios(language)
}
