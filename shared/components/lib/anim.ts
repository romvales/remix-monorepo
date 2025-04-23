import { useState } from 'react'

type HoldActivateCallback = (animId: number) => void

export function useHoldActivate(cb: HoldActivateCallback) {
  const [animId, setAnimId] = useState<number>()

  const frame = (ts: number) => {
    if (animId) cancelAnimationFrame(animId)
    setAnimId(requestAnimationFrame(frame))
    cb(requestAnimationFrame(frame))
  }

  const onStart = () => requestAnimationFrame(frame)
  const onEnd = () => cancelAnimationFrame(animId!)

  return { onStart, onEnd }
}