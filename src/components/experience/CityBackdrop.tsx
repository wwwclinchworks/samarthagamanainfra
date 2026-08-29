import { useEffect, useRef, type MutableRefObject } from "react"
import { mountEstateScene } from "../../lib/estateScene"

export function CityBackdrop({
  playRef,
}: {
  playRef: MutableRefObject<(() => void) | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handle = mountEstateScene(canvas)
    playRef.current = () => handle?.playIntro()
    return () => {
      handle?.destroy()
      playRef.current = null
    }
  }, [playRef])

  return <canvas id="scene-canvas" ref={canvasRef} />
}
