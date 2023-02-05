import { DynamicProseBlock } from '@/components/common/content/DynamicProseBlock'
import { PageLayout } from '@/components/layout/PageLayout'
import { NewsletterSignupForm } from './NewsletterSignupForm'

export default function NewsletterPage() {
  return (
    <PageLayout className="mt-12">
      <DynamicProseBlock className="mb-6 md:mb-12">
        <h1 className="!text-3xl text-primary-500">Sign up for the Builders newsletter</h1>
        <p>
          Join a community of makers and creatives who are learning how to leverage technology to
          create new products. Or, you know, just keep up with the latest blog posts.
        </p>
      </DynamicProseBlock>
      <div className="max-w-xl mx-auto">
        <NewsletterSignupForm />
      </div>
    </PageLayout>
  )
}
