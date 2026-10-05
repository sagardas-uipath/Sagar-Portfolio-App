/** Lightweight cross-section events so sections stay decoupled (e.g. a skill opening a case study). */
const OPEN_PROJECT = 'portfolio:open-project'

export function openProject(id: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_PROJECT, { detail: id }))
}

export function onOpenProject(handler: (id: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string>).detail)
  window.addEventListener(OPEN_PROJECT, listener)
  return () => window.removeEventListener(OPEN_PROJECT, listener)
}
