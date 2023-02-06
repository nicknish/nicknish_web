export {}

declare global {
  interface Window {
    ga?: Function
    dataLayer?: any[]
    Sentry?: any // TODO
  }
}
