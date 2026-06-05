"use client"

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {})
  return ctx
}

function tone(freq: number, start: number, duration: number, type: OscillatorType, gain = 0.12) {
  const audio = getCtx()
  if (!audio) return
  const osc = audio.createOscillator()
  const g = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, audio.currentTime + start)
  g.gain.setValueAtTime(0.0001, audio.currentTime + start)
  g.gain.exponentialRampToValueAtTime(gain, audio.currentTime + start + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration)
  osc.connect(g)
  g.connect(audio.destination)
  osc.start(audio.currentTime + start)
  osc.stop(audio.currentTime + start + duration + 0.02)
}

/** Bright rising arpeggio for a correct / great answer. */
export function playSuccess() {
  tone(523.25, 0, 0.18, "triangle")
  tone(659.25, 0.09, 0.18, "triangle")
  tone(783.99, 0.18, 0.28, "triangle")
}

/** Soft neutral blip for a mediocre answer. */
export function playNeutral() {
  tone(440, 0, 0.22, "sine", 0.1)
}

/** Low descending buzz for a poor answer. */
export function playFail() {
  tone(220, 0, 0.22, "sawtooth", 0.09)
  tone(160, 0.12, 0.3, "sawtooth", 0.09)
}

export function playPointsSound(points: number) {
  if (points >= 10) playSuccess()
  else if (points > 0) playSuccess()
  else if (points === 0) playNeutral()
  else playFail()
}
