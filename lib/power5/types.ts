export type BalloonType =
  | "speech"
  | "thought"
  | "shout"
  | "whisper"
  | "broadcast"

export type CharacterPosition =
  | "center"
  | "left"
  | "right"
  | "background"
  | "foreground"

export interface Character {
  id: string
  name: string
  position: CharacterPosition
  emotion: string
  animation: string
  isPlayer?: boolean
  /** tailwind color token for the sprite body, e.g. "bg-chart-2" */
  tone: "primary" | "rose" | "sky" | "amber" | "emerald" | "slate"
}

export interface DialogueBalloon {
  speakerId: string
  type: BalloonType
  lines: string[]
}

export interface SceneMetadata {
  environment: string
  cameraAngle: string
  characters: Character[]
  dialogues: DialogueBalloon[]
}

export type ChoiceKey = "A" | "B" | "C" | "D"

export interface Choice {
  key: ChoiceKey
  text: string
  points: 10 | 5 | 0 | -5
  /** Why this alternative is flawed. Only present for non-optimal choices. */
  feedback?: string
}

export interface Scenario {
  id: string
  level: number
  title: string
  principle: string
  description: string
  sceneMetadata: SceneMetadata
  choices: Choice[]
}

export interface ThemeDef {
  id: string
  label: string
  /** lucide-react icon name */
  icon: string
  /** gradient for the selector button border */
  gradient: string
  /** gradient classes used for the 3D viewport backdrop */
  sceneGradient: string
  /** accent token */
  accent: string
  scenarios: Scenario[]
}
