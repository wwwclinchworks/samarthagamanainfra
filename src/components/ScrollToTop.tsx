import { useEffect, useLayoutEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { disableBrowserScrollRestoration, enforceScrollToAnchor, enforceScrollToTop } from "../lib/scrollReset"

/**
 * Resets scroll on every client-side route change.
 * Hash navigations scroll to the target section; all other routes open at the top.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const prevPath = useRef(pathname)

  useLayoutEffect(() => {
    disableBrowserScrollRestoration()
  }, [])

  useLayoutEffect(() => {
    const pathChanged = prevPath.current !== pathname
    prevPath.current = pathname

    if (hash) {
      enforceScrollToAnchor(hash)
      return
    }

    // New page via menu / links — always start at the top.
    if (pathChanged || navigationType === "PUSH" || navigationType === "REPLACE") {
      enforceScrollToTop()
    }
  }, [pathname, hash, key, navigationType])

  useEffect(() => {
    if (hash) {
      enforceScrollToAnchor(hash)
      return
    }
    enforceScrollToTop()
  }, [pathname, hash, key])

  return null
}
