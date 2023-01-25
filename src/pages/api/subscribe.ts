/**
 * Based on examples:
 * - https://github.com/netlify/create-react-app-lambda
 * - https://github.com/tobilg/netlify-functions-landingpage
 * - https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * EDIT THESE ENV VARIABLES IN VERCEL
 */
// TODO: Add env variables
const mailChimpAPI = process.env.MAILCHIMP_API_KEY
const mailChimpListID = process.env.MAILCHIMP_LIST_ID
const mcRegion = process.env.MAILCHIMP_REGION

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

type ResponseSuccess = {
  data: {
    code: 200 | 201
  }
}

type ResponseError = {
  error: {
    code: 400 | 500
    message?: string
  }
}

type Data = ResponseSuccess | ResponseError

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const email = req.body?.email
  const { errors } = validateParams({ email })

  if (Object.keys(errors).length) {
    console.error('Errors', JSON.stringify(errors))
    return res.status(400).json({ error: { code: 400, message: errors.email } })
  }
  if (process.env.NODE_ENV !== 'production') {
    console.log('In development: Successful newsletter signup')
    return res.status(201).json({ data: { code: 200 } })
  }

  if (!mailChimpListID) {
    console.error('Errors', 'Invalid mailChimpListID')
    return res.status(500).json({ error: { code: 500, message: 'Server error' } })
  }
  if (!mcRegion) {
    console.error('Errors', 'Invalid mcRegion')
    return res.status(500).json({ error: { code: 500, message: 'Server error' } })
  }
  if (!mailChimpAPI) {
    console.error('Errors', 'Invalid mailChimpAPI')
    return res.status(500).json({ error: { code: 500, message: 'Server error' } })
  }

  try {
    // Follows the Mailchimp schema
    const subscriber = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {},
    }

    // Here we go!
    console.log('Sending data to mailchimp', subscriber)
    // const subscribeResponse = await fetch(
    //   `https://${mcRegion}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members`,
    //   {
    //     body: JSON.stringify(subscriber),
    //     headers: {
    //       Authorization: `apikey ${mailChimpAPI}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )

    // const { error, status, data } = await subscribeResponse.json()
    // if (error) {
    //   console.error('Errors', `Mailchimp request failed with ${JSON.stringify(error)}`)
    //   return res.status(500).json({ error: { code: 500, message: 'Server error' } })
    // }

    // console.log('Mailchimp body: ' + data)
    // console.log('Status Code: ' + status)

    // if (status < 300 || data.title === 'Member Exists') {
    //   console.log('Added to list in Mailchimp subscriber list')
    //   return res.status(201).json({ data: { code: 201 } })
    // }

    // console.error('Errors', `Mailchimp returned errors ${data.detail}`)
    // return res.status(500).json({ error: { code: 500, message: 'Server error' } })
  } catch (error) {
    console.error('Errors', `try/catch failed with ${error}`)
    return res.status(500).json({ error: { code: 500, message: 'Server error' } })
  }
}

interface IValidateParams {
  email?: string
}

function validateParams(params: IValidateParams): { errors: IValidateParams } {
  const { email } = params
  return {
    errors: removeEmptyItems({
      email: !email ? 'No email supplied' : EMAIL_REGEX.test(email) ? undefined : 'Invalid email',
    }),
  }
}

function removeEmptyItems(obj: Record<string, any>): Record<string, any> {
  for (let key in obj) {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  }
  return obj
}
