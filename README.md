# nicknish.co

This portfolio version is built with NextJS, a static site generator. In this project, we use the
JAMStack architecture using React, GraphQL, and Markdown files.

To get acquainted, check out the `package.json` first or use one of these commands:

```bash
npm run dev   # run development server with React Fast Refresh
npm run build # create production build with app and netlify functions
npm run start # start server for testing build site
```

## Environment Variables

In production, some functionality (e.g. newsletter signup and contact form) will require secrets
such as API keys. However, in development these features should work in a "developer mode" without
hitting production endpoints.

To test these features hitting production endpoints, duplicate the `.env.local.example` file with
`cp .env.local.example .env.local` and update the values.

## TODO

- [x] Move Projects and Work to Contentlayer
- [x] Fix Post Series
- [x] Remove siteConfig and replace it with a constants file
- [x] Fix Popular Posts
- [x] Make Start page
- [x] Figure out images in Contentlayer
- [x] Add Comments with Disqus
- [x] Contact me page
- [x] Fix SEO for Posts, Projects, Work, etc.
- [x] Fix newsletter page signing up for Mailchimp instead of Substack
- [x] Fix sitemap
- [ ] Fix light and dark mode for website
- [ ] Fix Outbound Link tracking
- [ ] Fix Post descriptions (to show on Post Series pages and show as previews)
  - [ ] Fix Post SEO
- [ ] Fix `post.body.raw`
- [ ] Fix WorkItem drop shadows
- [ ] Update Resume link
- [ ] Fix code block highlight styling
- [ ] Add post likes "claps" with Supabase
- [ ] Move all blog post images to locally stored ones and use Next Image
- [ ] Redesign Homepage
- [ ] Cypress tests
- [ ] Sentry error reporting
- [ ] Fix Button disabled styles in dark mode
