import { Button } from '@/components/common/Button'

export function ContactFormSuccess() {
  return (
    <main className="px-5 mx-auto text-center">
      <h1 className="text-4xl my-5 font-bold">Thank you!</h1>
      <p className="text-lg mb-9">I will try to respond to your message within 24 hours.</p>
      <Button.InternalLink theme="primary" size="default" href="/">
        Go Home
      </Button.InternalLink>
    </main>
  )
}
