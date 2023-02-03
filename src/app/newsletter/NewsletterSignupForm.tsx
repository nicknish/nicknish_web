'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/common/Button'
import { API_NEWSLETTER_PATH } from '@/constants/urls'
import { TextInput } from '@/components/common/form/TextInput'
import { Label } from '@/components/common/form/Label'
import { FormError } from '@/components/common/form/FormError'

type FormData = {
  email: string
}

export const NewsletterSignupForm = () => {
  const [showSuccess, updateShowSuccess] = React.useState(false)
  const { register, handleSubmit, formState, setError } = useForm<FormData>()
  const { errors, isValid, isSubmitting } = formState

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    try {
      fetch(API_NEWSLETTER_PATH, {
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
        <Label label="Email">
          <TextInput
            type="email"
            defaultValue=""
            placeholder="johnapple@gmail.com"
            {...register('email', { required: 'Email address is required' })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <FormError label={errors.email.message} data-testid="NewsletterSignupForm--error" />
          )}
        </Label>
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
