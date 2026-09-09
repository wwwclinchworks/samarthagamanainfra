import { useLayoutEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { disableBrowserScrollRestoration, enforceScrollToAnchor, enforceScrollToTop } from "../lib/scrollReset"

/** Keep SPA navigation predictable without fighting the browser every frame. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()
  const prevPath = useRef(pathname)

  useLayoutEffect(() => {
    disableBrowserScrollRestoration()
  }, [])

  useLayoutEffect(() => {
    const pathChanged = prevPath.current !== pathname
    prevPath.current = pathname

    if (hash) {
      return enforceScrollToAnchor(hash)
    }

    if (pathChanged || navigationType === "PUSH" || navigationType === "REPLACE") {
      enforceScrollToTop()
    }
  }, [pathname, hash, navigationType])

  return null
}
