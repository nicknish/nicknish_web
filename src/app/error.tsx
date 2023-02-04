'use client'

import { Button } from '@/components/common/Button'
import React from 'react'

interface IErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: IErrorProps) {
  React.useEffect(() => {
    // TODO: Is there any more error data we can scope to Sentry?
    // window.Sentry.configureScope(scope => {
    //   Object.keys(errorInfo).forEach(key => {
    //     scope.setExtra(key, errorInfo[key])
    //   })
    // })
    window.Sentry.captureException(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button.Default size="small" theme="primary" onClick={() => reset()}>
        Try again
      </Button.Default>
    </div>
  )
}
