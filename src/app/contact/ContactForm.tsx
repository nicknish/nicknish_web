'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import HCaptcha from '@hcaptcha/react-hcaptcha'

import { Button } from '@/components/common/Button'
import { FormError } from '@/components/common/form/FormError'
import { Label } from '@/components/common/form/Label'
import { TextField } from '@/components/common/form/TextField'
import { TextInput } from '@/components/common/form/TextInput'
import { API_CONTACT_PATH } from '@/constants/urls'
import { ContactFormSuccess } from './ContactFormSuccess'

type FormData = {
  name: string
  email?: string
  message: string
  captcha: string
  // This is a hack. react-hook-form has an issue where root.serverError isn't available despite the docs saying it is
  serverError?: string
}

export const ContactForm = () => {
  const [showSuccess, updateShowSuccess] = React.useState(false)
  const captchaRef = React.useRef<HCaptcha>(null)
  const { formState, register, handleSubmit, setValue, resetField, setError } = useForm<FormData>()
  const { errors, isValid, isSubmitting } = formState

  register('captcha', { required: true })

  const onSubmit: SubmitHandler<FormData> = async (form: FormData) => {
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

    // Reset captcha
    captchaRef.current?.resetCaptcha()
  }

  if (showSuccess) {
    return <ContactFormSuccess />
  }

  return (
    <main>
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
                className="block min-h-[6rem]"
                {...register('message', { required: 'Message is required' })}
                aria-invalid={errors.message ? 'true' : 'false'}
              />
              {errors.message && <FormError label={errors.message.message} />}
            </Label>
          </div>

          <div className="mt-6 mb-5">
            <HCaptcha
              sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
              size="normal"
              onVerify={value => setValue('captcha', value, { shouldValidate: true })}
              onError={() => resetField('captcha')}
              onExpire={() => resetField('captcha')}
              onChalExpired={() => resetField('captcha')}
              theme="dark"
              ref={captchaRef}
            />
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

          <footer className="mt-4 text-xs">
            This site is protected by hCaptcha and its{' '}
            <a href="https://www.hcaptcha.com/privacy">Privacy Policy</a> and{' '}
            <a href="https://www.hcaptcha.com/terms">Terms of Service</a> apply.
          </footer>
        </form>
      </div>
    </main>
  )
}
