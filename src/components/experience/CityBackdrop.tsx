import { useEffect, useRef, type MutableRefObject } from "react"
import { mountCityScene } from "../../lib/cityScene"

export function CityBackdrop({
  playRef,
}: {
  playRef: MutableRefObject<(() => void) | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handle = mountCityScene(canvas)
    playRef.current = () => handle?.playIntro()
    return () => {
      handle?.destroy()
      playRef.current = null
    }
  }, [playRef])

  return <canvas id="scene-canvas" ref={canvasRef} />
}
