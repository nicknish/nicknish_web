'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/common/Button'

type FormData = {
  email: string
}

export const NewsletterSignupForm = () => {
  const [showSuccess, updateShowSuccess] = useState(false)
  const { register, handleSubmit, formState, setError } = useForm<FormData>()
  const { errors, isValid, isSubmitting } = formState

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    try {
      fetch('/api/subscribe', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(({ data }) => {
          if (data.code && data.code < 300) {
            return updateShowSuccess(true)
          }
          if (data.error) {
            return setError('email', { message: data.error.message })
          }
          return setError('email', { message: 'There was an unexpected issue' })
        })
    } catch (error) {
      setError('email', { message: 'There was an expected issue' })
    }
  }

  if (showSuccess) {
    return (
      <div className="f5 mt3" data-testid="NewsletterSignupForm--success">
        Thanks for signing up!
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="NewsletterSignupForm">
      <div className="mb-5">
        <input
          type="email"
          defaultValue=""
          placeholder="johnapple@gmail.com"
          {...register('email', { required: 'Email address is required' })}
          className="w-full md:w-1/2 border border-black-20 p-2 rounded text-black-100"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <div className="text-sm mt-1" data-testid="NewsletterSignupForm--error">
            <span>{errors.email.message}</span>
          </div>
        )}
      </div>
      <div>
        <Button
          theme="primary"
          size="small"
          buttonProps={{ type: 'submit', disabled: !(isValid || isSubmitting) }}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}
