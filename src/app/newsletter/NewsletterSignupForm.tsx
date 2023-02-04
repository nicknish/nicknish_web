export const NewsletterSignupForm = () => {
  return (
    // See this technique in more detail here:
    // https://css-tricks.com/fluid-width-video/
    // padding-bottom: 66.66% is aspect ratio 3:2 or 2/3
    <div className="relative pb-[66.66%] h-0">
      <iframe
        src="https://nicknish.substack.com/embed"
        width="480"
        height="320"
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: 'white' }}
      />
    </div>
  )
}
