'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/common/Button'
import { FormError } from '@/components/common/form/FormError'
import { Label } from '@/components/common/form/Label'
import { TextField } from '@/components/common/form/TextField'
import { TextInput } from '@/components/common/form/TextInput'
import { API_CONTACT_PATH } from '@/constants/urls'

type FormData = {
  name: string
  email?: string
  message: string
  // This is a hack. react-hook-form has an issue where root.serverError isn't available despite the docs saying it is
  serverError?: string
}

export const ContactForm = () => {
  const [showSuccess, updateShowSuccess] = React.useState(false)
  const { register, handleSubmit, formState, setError } = useForm<FormData>()
  const { errors, isValid, isSubmitting } = formState

  const onSubmit: SubmitHandler<FormData> = (form: FormData) => {
    try {
      fetch(API_CONTACT_PATH, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(form),
      })
        .then(response => response.json())
        .then(({ data, error }) => {
          if (data && data.code < 300) {
            return updateShowSuccess(true)
          }
          if (error?.fields) {
            for (let field in error.fields) {
              if (field in form) {
                setError(field as any, { message: error.fields[field] })
              }
            }
            return
          }
          setError('serverError', { type: '400' })
        })
    } catch (error) {
      setError('serverError', { type: '400' })
    }
  }

  if (showSuccess) {
    return (
      <div className="px-5 mx-auto text-center">
        <h1 className="text-4xl my-5 font-bold">Thank you!</h1>
        <p className="text-lg mb-9">I will try to respond to your message within 24 hours.</p>
        <Button theme="primary" size="small" linkProps={{ href: '/' }}>
          Go Home
        </Button>
      </div>
    )
  }

  return (
    <>
      <header className="mt-12">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        <p className="mb-4">
          Howdy! If you{"'"}d like to reach me, simply fill out the form below and I{"'"}ll try to
          respond within 24 hours. Cheers!
        </p>
      </header>

      <div className="mt-8">
        <form onSubmit={handleSubmit(onSubmit)} data-testid="NewsletterSignupForm">
          <div className="flex flex-col gap-y-5 mb-5">
            <Label label="Name *">
              <TextInput
                defaultValue=""
                placeholder="Jamie"
                {...register('name', { required: 'Name is required' })}
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && <FormError label={errors.name.message} />}
            </Label>
            <Label label="Email">
              <TextInput
                type="email"
                defaultValue=""
                placeholder="johnapple@gmail.com"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && <FormError label={errors.email.message} />}
            </Label>
            <Label label="Message *">
              <TextField
                defaultValue=""
                placeholder=""
                {...register('message', { required: 'Message is required' })}
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message && <FormError label={errors.message.message} />}
            </Label>
          </div>

          {errors.serverError?.type === '400' && (
            <div className="my-4">
              <FormError label="There was an unexpected server error" />
            </div>
          )}

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
      </div>
    </>
  )
}
