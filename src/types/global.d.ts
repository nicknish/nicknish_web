export {}

declare global {
  interface Window {
    // Google Analytics: Queue of events to transmit to GA-4
    dataLayer?: any[]
  }
}
