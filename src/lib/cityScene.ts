type SceneHandle = {
  dispose: () => void
  camera?: unknown
  updateBuildings?: (t: number) => void
  roadMeshes?: unknown[]
  trunkMesh?: unknown
  canopyMesh?: unknown
}

type CitySceneModule = typeof import("./citySceneRuntime")

let runtimePromise: Promise<CitySceneModule> | null = null
let activeHandle: { dispose: () => void } | null = null

function loadRuntime() {
  runtimePromise ??= import("./citySceneRuntime")
  return runtimePromise
}

export function mountCityScene(canvas: HTMLCanvasElement): SceneHandle | null {
  let disposed = false
  let realHandle: { dispose: () => void } | null = null

  void loadRuntime().then((runtime) => {
    if (disposed) return
    realHandle = runtime.mountCityScene(canvas)
    activeHandle = realHandle
  })

  return {
    dispose: () => {
      disposed = true
      realHandle?.dispose()
      if (activeHandle === realHandle) activeHandle = null
    },
  }
}

export function playCityIntro() {
  void loadRuntime().then(() => {
    ;(window as unknown as { __sgiPlayCity?: () => void }).__sgiPlayCity?.()
  })
}
