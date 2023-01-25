import { Button, ButtonSizes, ButtonThemes } from '@/components/common/Button'

export default function ContactFormSuccess() {
  return (
    <div className="container px-5 mx-auto text-center">
      <h1 className="text-4xl my-5 font-bold">Thank you!</h1>
      <p className="text-lg mb-9">I will try to respond to your message within 24 hours.</p>
      <Button theme="primary" size="small" linkProps={{ href: '/' }}>
        Go Home
      </Button>
    </div>
  )
}
