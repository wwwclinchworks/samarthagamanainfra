import { useCallback, useEffect, useState } from "react"

const KEY = "sgi-entrance-seen"

export function useEntrance() {
  const [show, setShow] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem(KEY) === "1"
    setShow(!seen)
    setReady(true)
  }, [])

  const finish = useCallback(() => {
    sessionStorage.setItem(KEY, "1")
    setShow(false)
  }, [])

  return { show: ready && show, finish, ready }
}
