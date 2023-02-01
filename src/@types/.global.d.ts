export {}

declare global {
  interface Window {
    ga?: Function
    Sentry?: any // TODO
  }
}
