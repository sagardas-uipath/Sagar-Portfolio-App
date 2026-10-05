import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** True on devices with a precise hovering pointer (mouse / trackpad) — where pointer-driven 3D makes sense. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
