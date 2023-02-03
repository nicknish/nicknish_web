import type { NextApiRequest, NextApiResponse } from 'next'
import SendGrid from '@sendgrid/mail'

import { removeEmptyItems, validateEmail } from '@/utils/api'

/**
 * EDIT THESE ENV VARIABLES IN VERCEL
 */
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string
const SENDGRID_MAIL_FROM = process.env.SENDGRID_MAIL_FROM as string
const SENDGRID_MAIL_TO = process.env.SENDGRID_MAIL_TO as string

SendGrid.setApiKey(SENDGRID_API_KEY)

type ResponseSuccess = {
  data: {
    code: number
  }
}

type ResponseError = {
  error: {
    code: number
    message?: string
    fields?: Partial<{
      name?: string
      email?: string
      message?: string
    }>
  }
}

type Data = ResponseSuccess | ResponseError

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const errors = validateParams(req.body)

  if (errors) {
    console.error('Contact Form Server Errors', JSON.stringify(errors))
    return res.status(400).json({ error: { code: 400, ...errors } })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('In development: Successful contact message sent')
    return res.status(201).json({ data: { code: 200 } })
  }

  // Here we go!
  const { name, email, message } = req.body
  const msg = {
    to: SENDGRID_MAIL_TO,
    from: SENDGRID_MAIL_FROM,
    subject: `Website Contact Message from ${name}`,
    text: message,
    html: `<div>
        <p>${message}</p>
        <p>From ${name} (email: ${email})</p>
      </div>`,
  }

  try {
    const [response] = await SendGrid.send(msg)

    if (response.statusCode < 300) {
      return res.status(200).json({ data: { code: 200 } })
    }

    console.error('Contact Form Server Errors (maybe)', response)
    return res
      .status(response.statusCode)
      .json({ error: { code: response.statusCode, ...response.body } })
  } catch (error) {
    return res
      .status((error as any).statusCode || 500)
      .json({ error: { code: 400, ...(error as any) } })
  }
}

function validateParams(params: any) {
  const { name, email, message } = params
  const errors = {
    fields: removeEmptyItems({
      name: !name ? 'No name provided' : null,
      email: !email ? null : validateEmail(email) ? null : 'Invalid email' || null,
      message: !message ? 'No message provided' : null,
    }),
  }

  if (Object.keys(errors.fields).length > 0) {
    return errors
  }
}
