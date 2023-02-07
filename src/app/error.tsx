'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { reportError } from '@/utils/reporting'

import { Button } from '@/components/common/Button'

interface IErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: IErrorProps) {
  const pathname = usePathname()

  React.useEffect(() => {
    reportError(error, { extra: { pathname: pathname } })
  }, [error, pathname])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button.Default size="small" theme="primary" onClick={() => reset()}>
        Try again
      </Button.Default>
    </div>
  )
}
