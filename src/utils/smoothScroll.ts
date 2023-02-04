export function isSmoothScrollSupported() {
  return typeof window !== 'undefined' && 'scrollBehavior' in document.documentElement.style
}
