# Office Scenarios i18n Integration Guide

## Overview
The office scenarios now support dynamic language switching. The game loads scenario text (titles, descriptions, dialogues, choices) from locale JSON files based on the selected language, while maintaining static visual metadata (characters, positions, animations).

## File Structure

```
/public/locales/
├── en/office-scenarios.json      # English scenarios
├── pt/office-scenarios.json      # Portuguese scenarios
├── nl/office-scenarios.json      # Dutch scenarios
└── es/office-scenarios.json      # Spanish scenarios

/lib/
├── power5/scenarios-i18n.ts      # Core translation logic
└── hooks/useOfficeScenarios.ts   # React hook for scenarios
```

## Usage

### In React Components

```tsx
import { useOfficeScenarios } from '@/lib/hooks/useOfficeScenarios'

export function GameplayScreen() {
  // Automatically updates when language changes
  const scenarios = useOfficeScenarios()
  
  const currentScenario = scenarios[currentLevel]
  
  return (
    <>
      <h1>{currentScenario.title}</h1>
      <p>{currentScenario.description}</p>
      {/* Render dialogues and choices... */}
    </>
  )
}
```

### Direct Language-Specific Access

```tsx
import { getTranslatedScenarios } from '@/lib/power5/scenarios-i18n'

// Get scenarios for a specific language
const dutchScenarios = getTranslatedScenarios('nl')
const spanishScenarios = getTranslatedScenarios('es')
```

### Language Codes

- `en` — English
- `pt` — Portuguese
- `nl` — Dutch
- `es` — Spanish

## How It Works

1. **Locale Files**: Each language has a JSON file containing scenario text (title, description, dialogues, choices, feedback)
2. **Static Metadata**: Character positions, animations, environments are defined once in `scenarios-i18n.ts`
3. **Merging**: `getTranslatedScenarios()` combines translated text with static metadata
4. **React Hook**: `useOfficeScenarios()` provides reactive updates when language changes via i18next

## When Language Changes

When a user selects a new language:
1. i18next language changes
2. `useOfficeScenarios()` hook detects the change
3. `getTranslatedScenarios()` fetches new language file
4. Component re-renders with translated scenario content
5. Character positions and visuals remain unchanged

## Adding New Languages

To add support for a new language:

1. Create `/public/locales/[lang-code]/office-scenarios.json` following the structure of existing files
2. Add the import and entry to `scenariosByLanguage` in `scenarios-i18n.ts`
3. The language will automatically be available when selected in the app

Example:
```typescript
import frScenarios from '../../public/locales/fr/office-scenarios.json'

const scenariosByLanguage: Record<string, typeof enScenarios> = {
  en: enScenarios,
  pt: ptScenarios,
  nl: nlScenarios,
  es: esScenarios,
  fr: frScenarios,  // New language
}
```

## Migration from Old System

The old `scenarios.ts` export (`officeScenarios`) is still available for backward compatibility but now returns English scenarios. Consider migrating to `useOfficeScenarios()` hook in components for dynamic language support.
