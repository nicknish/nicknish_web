'use client'

import React from 'react'
import config from '@/config'

/**
 * <SecretConsoleMessage> - Emits a secret message to the console
 */
export function SecretConsoleMessage() {
  useEmitSecretMessage()
  return null
}

const SECRET_MESSAGE_OPENING = [`%cHi there! 👋`, 'font-size:18px; font-weight: bold;']
const SECRET_MESSAGE = [
  `Thanks for checking out my website! If you're seeing this,
you are awesome! I think there's a good chance we'd could be 
friends so hit me up with a message and say hello!

🐦 Tweet me ${config.twitterUsername} saying you found the secret message!`,
]

/**
 * useEmitSecretMessage - Emits a secret message to the console
 */
export function useEmitSecretMessage() {
  React.useEffect(() => {
    console.log(...SECRET_MESSAGE_OPENING)
    console.log(...SECRET_MESSAGE)
  }, [])
}
