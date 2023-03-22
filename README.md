# nicknish.co

This portfolio is built with [NextJS](https://beta.nextjs.org) v13. In this project, we leverage JAM
Stack architecture using React for our view layer, NextJS API routes for serverless functions, and
MDX files for our content.

Using [Contentlayer](https://www.contentlayer.dev/), local MDX/Markdown files in `content/` are
processed by tools like [Remark](https://github.com/remarkjs/remark) and
[Rehype](https://github.com/rehypejs/rehype) to convert content into data.

This combination results in a powerful webapp that leverages free services and open-source
technologies to deliver meaningful performance optimizations, a CMS-like workflow, error and
performance monitoring, customer analytics, integration tests, and CI/CD automation. Excluding the
domain name, **this webapp is completely free to operate.**

Here's a non-exhaustive list of technologies and integrations this webapp contains:

### Performance Optimizations

- Optimized client JavaScript bundles and server-side rendering with React 18 Server/Client
  components (NextJS 13)
- Optimized font sizes and loading (`next/font`)
- Optimized search engine metadata for SEO (`next-sitemap`)
- Optimized image sizes and loading (`@next/image`)

### Content

- CMS workflow, converting local MDX files to data we can generate individual routes for
  (Contentlayer)
- Blog Post comments (Disqus)
- Contact form submission forwarded to my email (NextJS API Routes, Vercel, SendGrid)
- Contact form protected by captcha (HCaptcha)

### Reporting and Analytics

- Error reporting (Sentry)
- Performance Monitoring (Vercel)
- Analytics (Google Analytics)

### Automation

- Automated CI integration testes (Cypress, GitHub Actions)
- Automated CD (Vercel)

## Development

To get acquainted, check out the `package.json` first or use one of these commands:

```bash
yarn       # install dependencies
yarn dev   # run development server with React Fast Refresh
yarn build # create production build with app and netlify functions
yarn start # start server for testing build site
yarn lint  # lint codebase
```

### Environment Variables

In production, some functionality (e.g. contact form) will require secrets such as API keys.
However, in development these features should work in a "developer mode" without hitting production
endpoints and should emulate a "successful" state.

To test these features hitting production endpoints, duplicate the `.env.local.example` file and
update the values in `.env.local` with the real secrets:

```bash
cp .env.local.example .env.local
```
