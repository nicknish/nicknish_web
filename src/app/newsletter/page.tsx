import { NewsletterSignupForm } from './NewsletterSignupForm'

export default function NewsletterPage() {
  return (
    <section className="max-w-xl mt-12 mx-auto px-4">
      <section className="mb-6">
        <h1 className="font-bold text-2xl mb-4 text-primary-500">
          Sign up for the Builders newsletter
        </h1>
        <p>
          Join a community of makers and creatives who are learning how to leverage technology to
          create new products. Or, you know, just keep up with the latest blog posts.
        </p>
      </section>
      <NewsletterSignupForm />
    </section>
  )
}
