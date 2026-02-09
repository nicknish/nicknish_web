import * as Sentry from '@sentry/nextjs'
import { isBrowser } from './environment'

export function reportError(...params: Parameters<typeof Sentry.captureException>) {
  if (isBrowser()) {
    Sentry.captureException(...params)
  }
}

export function reportMessage(...params: Parameters<typeof Sentry.captureMessage>) {
  if (isBrowser()) {
    Sentry.captureMessage(...params)
  }
}
